// Controller invariants; visual output is checked separately in Chrome.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

class Element {
  constructor() { this.style = {}; this.attributes = {}; this.children = []; this.handlers = {}; this.checked = false; this.value = '2000'; }
  setAttribute(key, value) { this.attributes[key] = String(value); }
  addEventListener(type, callback) { this.handlers[type] = callback; }
  append(...children) { this.children.push(...children); }
  prepend(child) { this.children.unshift(child); }
  insertBefore(child) { this.children.push(child); }
  getAttribute(key) { return this.attributes[key]; }
  querySelector(selector) { return this.children.find(child => child.attributes.class === selector.slice(1)); }
  getStartPositionOfChar() { return {x:Number(this.attributes.x)-88,y:Number(this.attributes.y)}; }
  cloneNode() { const clone=new Element(); clone.attributes={...this.attributes}; clone.children=this.children.map(child=>child.cloneNode()); return clone; }
}
const selectors = Object.fromEntries(['.controls','#timeline','#time','#replay','#pause','#still','#status','.pixel-fallback'].map(key => [key, new Element()]));
const simple = new Element(); simple.value = 'simple';
const optical = new Element(); optical.value = 'optical'; optical.checked = true;
const beside=new Element(); beside.value='beside'; beside.checked=true;
const letter=new Element(); letter.value='letter';
const parts = Object.fromEntries(['.rays','.seed','.ident-name'].map(key => [key,new Element()]));
parts['.rays'].parentElement = new Element();
parts['.rays'].parentElement.setAttribute('transform','translate(449 94) scale(2.1)');
parts['.ident-name'].setAttribute('x',204); parts['.ident-name'].setAttribute('y',124); parts['.ident-name'].setAttribute('font-size',88);
const mark = new Element(); mark.querySelector = key => parts[key]; mark.viewBox = {baseVal:{width:520}};
let pixels = [];
const canvasContext = {fillStyle:'',fillRect(...rect) { if (rect[2] === 320) pixels = []; pixels.push([this.fillStyle,...rect]); }};
selectors['#pixel'] = {getContext:()=>canvasContext};
const preference = {matches:false,addEventListener(type, callback) { this.change = callback; }};
const document = {hidden:false,handlers:{},fonts:{ready:Promise.resolve()},querySelector:key=>selectors[key],querySelectorAll:key=>key === '.ident' ? [mark] : key.includes('treatment') ? [beside,letter] : [simple,optical],createElementNS:()=>new Element(),addEventListener(type,callback){this.handlers[type]=callback;}};
let now=0, serial=0;
const frames=new Map();
vm.runInNewContext(fs.readFileSync(path.join(__dirname,'ident.js'),'utf8'), {document,window:{addEventListener(){}},matchMedia:()=>preference,performance:{now:()=>now},requestAnimationFrame:callback=>{frames.set(++serial,callback);return serial;},cancelAnimationFrame:id=>frames.delete(id)});
const click = key => selectors[key].handlers.click();
function step(at) { now=at; const callbacks=[...frames.values()]; frames.clear(); callbacks.forEach(callback=>callback(at)); }
function choose(input) { simple.checked=false; optical.checked=false; input.checked=true; input.handlers.change(); }
function finalState() { return {star:parts['.rays'].parentElement.getAttribute('transform'),letter:parts['.ident-name'].querySelector('.letter-o').style.opacity,x:parts['.ident-name'].getAttribute('x'),y:parts['.ident-name'].getAttribute('y'),pixels:JSON.stringify(pixels),name:{...parts['.ident-name'].style},rays:{...parts['.rays'].style},seed:{...parts['.seed'].style}}; }
const opticalFinal=finalState();
assert.equal(frames.size,0);
click('#replay'); assert.equal(frames.size,1); step(320);
assert.notEqual(JSON.stringify(pixels),opticalFinal.pixels);
click('#pause'); assert.equal(frames.size,0);
click('#pause'); step(2500); assert.equal(frames.size,0); assert.deepEqual(finalState(),opticalFinal);
choose(simple); assert.equal(frames.size,1); step(3600); assert.equal(frames.size,0);
const simpleFinal=finalState();
// Both routes must agree on what the viewer receives at handover.
assert.deepEqual(simpleFinal,opticalFinal);
choose(optical); assert.equal(frames.size,1); choose(simple); assert.equal(frames.size,1);
document.hidden=true; document.handlers.visibilitychange(); assert.equal(frames.size,0);
document.hidden=false; choose(optical); preference.matches=true; preference.change();
assert.equal(frames.size,0); assert.deepEqual(finalState(),opticalFinal); assert.equal(selectors['#timeline'].disabled,true);
choose(simple); assert.equal(frames.size,0); assert.deepEqual(finalState(),simpleFinal);
preference.matches=false; preference.change(); selectors['#still'].checked=false; selectors['#still'].handlers.change();
click('#replay'); assert.equal(frames.size,1); selectors['#still'].checked=true; selectors['#still'].handlers.change(); assert.equal(frames.size,0);
letter.checked=true; beside.checked=false; letter.handlers.change();
const integratedSimple=finalState();
assert.notEqual(integratedSimple.star,simpleFinal.star);
assert.equal(integratedSimple.letter,'0');
assert.notEqual(integratedSimple.pixels,simpleFinal.pixels);
// Compare rendered glyph pixels across treatments, independent of their drawing code.
function region(draws, left, top, width, height) {
  const lit = new Set();
  for (const [color,x,y,w,h] of draws) {
    for (let py=Math.max(top,y);py<Math.min(top+height,y+h);py++) {
      for (let px=Math.max(left,x);px<Math.min(left+width,x+w);px++) {
        const key=`${px-left},${py-top}`;
        if (color === '#162a40') lit.delete(key); else lit.add(key);
      }
    }
  }
  return [...lit].sort();
}
const normalO = region(JSON.parse(simpleFinal.pixels),116,98,10,10);
const settledO = region(JSON.parse(integratedSimple.pixels),133,98,10,10);
assert.deepEqual(settledO,normalO);
assert.ok(settledO.length > 0);
assert.equal(settledO.includes('4,4'),false,'The finished o has a hollow centre');
choose(optical); assert.deepEqual(finalState(),integratedSimple);
beside.checked=true; letter.checked=false; beside.handlers.change();
assert.deepEqual(finalState(),opticalFinal);
console.log('PASS: the pixel star settles into the normal hollow o; final states agree across animation variants; mode switching keeps one frame loop; pause, completion, visibility and reduced motion cancel work.');
