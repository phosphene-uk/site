const GLYPHS = {"P": ["11110", "10001", "10001", "11110", "10000", "10000", "10000"], "h": ["10000", "10000", "10110", "11001", "10001", "10001", "10001"], "o": ["00000", "00000", "01110", "10001", "10001", "10001", "01110"], "s": ["00000", "00000", "01111", "10000", "01110", "00001", "11110"], "p": ["00000", "00000", "11110", "10001", "11110", "10000", "10000"], "e": ["00000", "00000", "01110", "10001", "11111", "10000", "01111"], "n": ["00000", "00000", "10110", "11001", "10001", "10001", "10001"]};

const DURATION = 1000;
const controls = document.querySelector('.controls');
const timeline = document.querySelector('#timeline');
const time = document.querySelector('#time');
const replay = document.querySelector('#replay');
const pause = document.querySelector('#pause');
const still = document.querySelector('#still');
const status = document.querySelector('#status');
const marks = [...document.querySelectorAll('.ident')];
const canvas = document.querySelector('#pixel');
const context = canvas.getContext('2d');
const motionPreference = matchMedia('(prefers-reduced-motion: reduce)');
let elapsed = DURATION;
let running = false;
let request = null;
let started = 0;
let pixelFrame = -1;

const clamp = value => Math.max(0, Math.min(1, value));
const progress = (ms, start, end) => clamp((ms - start) / (end - start));
const settle = value => 1 - (1 - value) ** 4;
const reduced = () => still.checked || motionPreference.matches;

// Integer Bresenham lines avoid anti-aliased edges in the pixel study.
function pixelLine(x0, y0, x1, y1) {
  const dx = Math.abs(x1 - x0), dy = -Math.abs(y1 - y0);
  const sx = x0 < x1 ? 1 : -1, sy = y0 < y1 ? 1 : -1;
  let error = dx + dy;
  while (true) {
    context.fillRect(x0, y0, 1, 1);
    if (x0 === x1 && y0 === y1) break;
    const twice = 2 * error;
    if (twice >= dy) { error += dy; x0 += sx; }
    if (twice <= dx) { error += dx; y0 += sy; }
  }
}

function drawPixel(ms) {
  if (!context) return;
  const frame = Math.min(11, Math.floor(ms / DURATION * 11));
  if (frame === pixelFrame) return;
  pixelFrame = frame;
  const tick = frame / 11 * DURATION;
  context.fillStyle = '#162a40';
  context.fillRect(0, 0, 320, 200);
  context.fillStyle = '#eced9f';
  if (frame > 0) {
    const radius = Math.round(16 * settle(progress(tick, 120, 640)));
    for (let ray = 0; ray < 16; ray++) {
      const angle = ray * Math.PI / 8;
      pixelLine(217, 100, 217 + Math.round(Math.cos(angle) * radius), 100 + Math.round(Math.sin(angle) * radius));
    }
  }
  const reveal = Math.round(108 * settle(progress(tick, 390, 950)));
  [...'Phosphene'].forEach((letter, index) => {
    GLYPHS[letter].forEach((row, y) => {
      [...row].forEach((bit, x) => {
        if (bit === '1' && index * 12 + x * 2 < reveal) context.fillRect(92 + index * 12 + x * 2, 94 + y * 2, 2, 2);
      });
    });
  });
}

function render(ms) {
  elapsed = Math.max(0, Math.min(DURATION, ms));
  const rays = settle(progress(elapsed, 120, 640));
  const name = settle(progress(elapsed, 390, 950));
  const seed = progress(elapsed, 20, 100) * (1 - progress(elapsed, 240, 620));
  for (const mark of marks) {
    mark.querySelector('.rays').style.strokeDasharray = '1';
    mark.querySelector('.rays').style.strokeDashoffset = String(1 - rays);
    mark.querySelector('.seed').style.opacity = String(seed);
    const lettering = mark.querySelector('.ident-name');
    lettering.style.opacity = String(progress(elapsed, 390, 650));
    lettering.style.clipPath = `inset(0 ${(1 - name) * 100}% 0 0)`;
  }
  drawPixel(elapsed);
  timeline.value = String(Math.round(elapsed));
  timeline.setAttribute('aria-valuetext', `${(elapsed / 1000).toFixed(2)} seconds`);
  time.value = `${(elapsed / 1000).toFixed(2)} s`;
}

function stop(message) {
  if (request !== null) cancelAnimationFrame(request);
  request = null;
  running = false;
  pause.textContent = 'Play';
  status.textContent = message;
}

function tick(now) {
  request = null;
  if (!running) return;
  render(now - started);
  if (elapsed >= DURATION) stop('Finished mark');
  else request = requestAnimationFrame(tick);
}

function play(fromStart = false) {
  if (reduced()) { render(DURATION); stop('Still version'); return; }
  stop('Playing');
  if (fromStart || elapsed >= DURATION) render(0);
  running = true;
  pause.textContent = 'Pause';
  started = performance.now() - elapsed;
  request = requestAnimationFrame(tick);
}

function applyMotionPreference() {
  stop(reduced() ? 'Still version' : 'Finished mark');
  render(DURATION);
  still.disabled = motionPreference.matches;
  still.checked = motionPreference.matches || still.checked;
  replay.disabled = reduced();
  pause.disabled = reduced();
  timeline.disabled = reduced();
  if (motionPreference.matches) status.textContent = 'System: reduced motion';
}

replay.addEventListener('click', () => play(true));
pause.addEventListener('click', () => running ? stop('Paused') : play());
timeline.addEventListener('input', () => {
  stop('Paused');
  render(Number(timeline.value));
});
still.addEventListener('change', applyMotionPreference);
motionPreference.addEventListener('change', applyMotionPreference);
document.addEventListener('visibilitychange', () => {
  if (document.hidden && running) stop('Paused');
});
window.addEventListener('pagehide', () => stop('Paused'));

// The static SVG remains available if canvas is unavailable or scripts fail.
if (context) {
  drawPixel(DURATION);
  canvas.hidden = false;
  document.querySelector('.pixel-fallback').setAttribute('hidden', '');
}
controls.hidden = false;
applyMotionPreference();
// Start only on request; the board stays usable while fonts load or fail.
document.fonts.ready.then(() => render(elapsed));
