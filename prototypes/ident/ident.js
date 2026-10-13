const GLYPHS = {"P": ["11110", "10001", "10001", "11110", "10000", "10000", "10000"], "h": ["10000", "10000", "10110", "11001", "10001", "10001", "10001"], "o": ["00000", "00000", "01110", "10001", "10001", "10001", "01110"], "s": ["00000", "00000", "01111", "10000", "01110", "00001", "11110"], "p": ["00000", "00000", "11110", "10001", "11110", "10000", "10000"], "e": ["00000", "00000", "01110", "10001", "11111", "10000", "01111"], "n": ["00000", "00000", "10110", "11001", "10001", "10001", "10001"]};

let variant = 'optical';
let treatment = 'beside';
let duration = 2000;
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
const variants = [...document.querySelectorAll('input[name="variant"]')];
const treatments = [...document.querySelectorAll('input[name="treatment"]')];
const motionPreference = matchMedia('(prefers-reduced-motion: reduce)');
let elapsed = duration;
let running = false;
let request = null;
let started = 0;
let pixelFrame = -1;

const clamp = value => Math.max(0, Math.min(1, value));
const progress = (ms, start, end) => clamp((ms - start) / (end - start));
const settle = value => 1 - (1 - value) ** 4;
const reduced = () => still.checked || motionPreference.matches;
const pulse = (ms, start, peak, end) => settle(progress(ms, start, peak)) * (1 - settle(progress(ms, peak, end)));
const svgElement = (name, attributes = {}) => {
  const node = document.createElementNS('http://www.w3.org/2000/svg', name);
  for (const [key, value] of Object.entries(attributes)) node.setAttribute(key, String(value));
  return node;
};

// Optical layers are bounded to each mark, leaving the background perfectly still.
const opticalMarks = marks.map((mark, index) => {
  const rays = mark.querySelector('.rays');
  const star = rays.parentElement;
  const name = mark.querySelector('.ident-name');
  const original = { star: star.getAttribute('transform'), x: name.getAttribute('x'), y: name.getAttribute('y') };
  const before = svgElement('tspan'); before.textContent = 'Ph';
  const letter = svgElement('tspan', { class: 'letter-o' }); letter.textContent = 'o';
  const after = svgElement('tspan'); after.textContent = 'sphene';
  name.textContent = '';
  name.append(before, letter, after);
  const id = `optical-light-${index}`;
  const defs = svgElement('defs');
  const gradient = svgElement('radialGradient', { id });
  for (const [offset, color, opacity] of [[0, '#f1efce', .65], [.12, '#eced9f', .35], [.36, '#8fe8df', .10], [1, '#8fe8df', 0]]) {
    gradient.append(svgElement('stop', { offset, 'stop-color': color, 'stop-opacity': opacity }));
  }
  const revealId = `optical-reveal-${index}`;
  const revealGradient = svgElement('linearGradient', { id: `${revealId}-light`, gradientUnits: 'userSpaceOnUse', x1: 0, x2: 60 });
  revealGradient.append(svgElement('stop', { offset: 0, 'stop-color': '#000' }), svgElement('stop', { offset: 1, 'stop-color': '#fff' }));
  const revealMask = svgElement('mask', { id: revealId, maskUnits: 'userSpaceOnUse', x: -50, y: -50, width: 620, height: 360 });
  const revealRect = svgElement('rect', { x: -50, y: -50, width: 620, height: 360, fill: `url(#${revealId}-light)` });
  revealMask.append(revealRect);
  const burst = svgElement('radialGradient', { id: `${revealId}-burst`, gradientUnits: 'userSpaceOnUse', r: 1 });
  burst.append(svgElement('stop', { offset: 0, 'stop-color': '#fff' }), svgElement('stop', { offset: .72, 'stop-color': '#fff' }), svgElement('stop', { offset: 1, 'stop-color': '#000' }));
  defs.append(gradient, revealGradient, burst, revealMask);
  mark.prepend(defs);
  const field = svgElement('circle', { r: 54, fill: `url(#${id})`, class: 'optical-layer' });
  star.prepend(field);
  const echoes = ['#8fe8df', '#c6a5ee'].map(color => {
    const ring = svgElement('ellipse', { rx: 34, ry: 24, fill: 'none', stroke: color, 'stroke-width': .65, class: 'optical-layer' });
    star.insertBefore(ring, rays);
    return ring;
  });
  const ghostRays = ['#8fe8df', '#c6a5ee'].map(color => {
    const ghost = rays.cloneNode(true);
    ghost.setAttribute('class', 'optical-layer');
    ghost.setAttribute('fill', 'none');
    ghost.setAttribute('stroke', color);
    ghost.setAttribute('stroke-width', '.8');
    star.insertBefore(ghost, rays);
    return ghost;
  });
  const ghostNames = ['#8fe8df', '#c6a5ee'].map(color => {
    const ghost = name.cloneNode(true);
    ghost.setAttribute('class', 'optical-layer');
    ghost.style.fill = color;
    mark.insertBefore(ghost, name);
    return ghost;
  });
  return { star, original, letter, burst, revealRect, revealId, revealGradient, viewWidth: mark.viewBox.baseVal.width, rays, name, seed: mark.querySelector('.seed'), field, echoes, ghostRays, ghostNames };
});

function positionMarks() {
  const integrated = treatment === 'letter';
  for (const part of opticalMarks) {
    const width = part.viewWidth;
    const y = integrated && width === 320 ? 151 : Number(part.original.y);
    for (const name of [part.name, ...part.ghostNames]) {
      name.setAttribute('x', integrated ? width / 2 : part.original.x);
      name.setAttribute('y', y);
      name.querySelector('.letter-o').style.opacity = integrated ? '0' : '1';
    }
    // Actual loaded-font advance; Lilita's o outline is x=26..487, y=-10..510 / 1000 em.
    const fontSize = Number(part.name.getAttribute('font-size'));
    const start = part.name.getStartPositionOfChar(2);
    part.letterX = start.x + .2565 * fontSize;
    part.letterY = y - .25 * fontSize;
    part.star.setAttribute('transform', integrated ? `translate(${part.letterX} ${part.letterY}) scale(${fontSize * .48 / 32})` : part.original.star);
    part.rays.style.strokeWidth = integrated ? '1.15' : '.8';
    part.burst.setAttribute('cx', part.letterX);
    part.burst.setAttribute('cy', part.letterY);
    part.revealRect.setAttribute('fill', `url(#${part.revealId}-${integrated ? 'burst' : 'light'})`);
  }
}

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
  const frame = Math.min(11, Math.floor(ms / duration * 11));
  if (frame === pixelFrame) return;
  pixelFrame = frame;
  const tick = frame / 11 * duration;
  const optical = variant === 'optical';
  context.fillStyle = '#162a40';
  context.fillRect(0, 0, 320, 200);
  const rayProgress = optical ? progress(tick, 650, 1250) : progress(tick, 120, 640);
  const integrated = treatment === 'letter';
  const starX = integrated ? 137 : 217;
  const starY = integrated ? 102 : 100;
  const originX = integrated ? 109 : 92;
  const radius = Math.round((integrated ? 4 : 16) * settle(rayProgress));
  const separation = optical ? Math.round(3 * (1 - settle(progress(tick, 700, 1500)))) : 0;
  if (optical && tick > 0 && tick < 1000) {
    const ring = Math.round((integrated ? 11 : 25) * (1 - settle(progress(tick, 150, 1050))) + 2);
    for (const [offset, color] of [[-separation, '#8fe8df'], [separation, '#c6a5ee']]) {
      context.fillStyle = color;
      for (let i = 0; i < 32; i++) {
        const a = i * Math.PI / 16;
        context.fillRect(starX + offset + Math.round(Math.cos(a) * ring), starY + Math.round(Math.sin(a) * ring * .7), 1, 1);
      }
    }
  }
  if (frame > 0 && (!optical || tick > 600)) {
    const passes = separation ? [[-separation, '#8fe8df'], [separation, '#c6a5ee'], [0, '#eced9f']] : [[0, '#eced9f']];
    for (const [offset, color] of passes) {
      context.fillStyle = color;
      for (let ray = 0; ray < (integrated ? 8 : 16); ray++) {
        const angle = ray * Math.PI / (integrated ? 4 : 8);
        pixelLine(starX + offset, starY, starX + offset + Math.round(Math.cos(angle) * radius), starY + Math.round(Math.sin(angle) * radius));
      }
    }
  }
  context.fillStyle = '#eced9f';
  const reveal = Math.round(108 * settle(optical ? progress(tick, 1080, 1850) : progress(tick, 390, 950)));
  [...'Phosphene'].forEach((letter, index) => {
    if (integrated && letter === 'o') return;
    GLYPHS[letter].forEach((row, y) => {
      [...row].forEach((bit, x) => {
        const column = index * 12 + x * 2;
        const visible = integrated ? Math.abs(column - 28) <= reveal : (optical ? column >= 108 - reveal : column < reveal);
        if (bit === '1' && visible) context.fillRect(originX + column, 94 + y * 2, 2, 2);
      });
    });
  });
}

function render(ms) {
  elapsed = Math.max(0, Math.min(duration, ms));
  const optical = variant === 'optical';
  const rays = settle(optical ? progress(elapsed, 650, 1250) : progress(elapsed, 120, 640));
  const name = settle(optical ? progress(elapsed, 1080, 1850) : progress(elapsed, 390, 950));
  const nameOpacity = optical ? progress(elapsed, 1080, 1650) : progress(elapsed, 390, 650);
  const seed = optical ? pulse(elapsed, 380, 680, 1250) : progress(elapsed, 20, 100) * (1 - progress(elapsed, 240, 620));
  const focus = settle(progress(elapsed, 160, 1100));
  const afterimage = optical ? pulse(elapsed, 30, 320, 1150) : 0;
  const fringe = optical ? pulse(elapsed, 560, 850, 1510) : 0;
  const separation = 3.8 * (1 - settle(progress(elapsed, 600, 1480)));
  const mask = optical ? `inset(0 0 0 ${(1 - name) * 100}%)` : `inset(0 ${(1 - name) * 100}% 0 0)`;
  for (const part of opticalMarks) {
    part.rays.style.strokeDasharray = '1';
    part.rays.style.strokeDashoffset = String(1 - rays);
    part.seed.style.opacity = String(seed);
    part.name.style.opacity = String(nameOpacity);
    const edge = (part.viewWidth + 100) * (1 - name) - 100;
    part.revealGradient.setAttribute('x1', edge);
    part.revealGradient.setAttribute('x2', edge + 60);
    part.burst.setAttribute('r', Math.max(.01, name * part.viewWidth * 1.2));
    const opticalMask = (optical || treatment === 'letter') && name < 1 ? `url(#${part.revealId})` : 'none';
    part.name.style.mask = opticalMask;
    part.name.style.clipPath = optical || treatment === 'letter' || name === 1 ? 'none' : mask;
    part.name.style.filter = optical && elapsed < 1850 ? `blur(${2.2 * (1 - settle(progress(elapsed, 1100, 1850)))}px)` : 'none';
    part.field.style.opacity = String(optical ? pulse(elapsed, 80, 580, 1600) * .8 : 0);
    part.field.setAttribute('transform', `scale(${1.15 - focus * .72} ${.8 - focus * .37})`);
    part.echoes.forEach((ring, index) => {
      const sign = index ? 1 : -1;
      ring.style.opacity = String(afterimage * .55);
      ring.style.filter = `blur(${1.8 - focus * 1.2}px)`;
      ring.setAttribute('transform', `translate(${sign * (5 - focus * 4)} ${sign * 1.5}) scale(${1.1 - focus * .84})`);
    });
    part.ghostRays.forEach((ghost, index) => {
      ghost.style.opacity = String(fringe * .65);
      ghost.style.strokeDasharray = '1';
      ghost.style.strokeDashoffset = String(1 - rays);
      ghost.style.filter = `blur(${(1 - rays) * 1.3}px)`;
      ghost.setAttribute('transform', `translate(${(index ? 1 : -1) * separation} 0)`);
    });
    part.ghostNames.forEach((ghost, index) => {
      const strength = optical ? pulse(elapsed, 1080, 1290, 1780) * .45 : 0;
      ghost.style.opacity = String(strength);
      ghost.style.mask = opticalMask;
      ghost.style.clipPath = 'none';
      ghost.style.filter = 'blur(.5px)';
      ghost.setAttribute('transform', `translate(${(index ? 1 : -1) * 4 * (1 - settle(progress(elapsed, 1120, 1780)))} 0)`);
    });
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
  if (elapsed >= duration) stop('Finished mark');
  else request = requestAnimationFrame(tick);
}

function play(fromStart = false) {
  if (reduced()) { render(duration); stop('Still version'); return; }
  stop('Playing');
  if (fromStart || elapsed >= duration) render(0);
  running = true;
  pause.textContent = 'Pause';
  started = performance.now() - elapsed;
  request = requestAnimationFrame(tick);
}

function applyMotionPreference() {
  stop(reduced() ? 'Still version' : 'Finished mark');
  render(duration);
  still.disabled = motionPreference.matches;
  still.checked = motionPreference.matches || still.checked;
  replay.disabled = reduced();
  pause.disabled = reduced();
  timeline.disabled = reduced();
  if (motionPreference.matches) status.textContent = 'System: reduced motion';
}

variants.forEach(input => input.addEventListener('change', () => {
  if (!input.checked) return;
  stop('Finished mark');
  variant = input.value;
  duration = variant === 'optical' ? 2000 : 1000;
  timeline.max = String(duration);
  pixelFrame = -1;
  if (reduced()) applyMotionPreference();
  else play(true);
}));

treatments.forEach(input => input.addEventListener('change', () => {
  if (!input.checked) return;
  stop('Finished mark');
  treatment = input.value;
  positionMarks();
  pixelFrame = -1;
  if (reduced()) applyMotionPreference();
  else play(true);
}));

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
  drawPixel(duration);
  canvas.hidden = false;
  document.querySelector('.pixel-fallback').setAttribute('hidden', '');
}
positionMarks();
controls.hidden = false;
applyMotionPreference();
// Start only on request; the board stays usable while fonts load or fail.
document.fonts.ready.then(() => { positionMarks(); render(elapsed); });
