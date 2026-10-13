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
  cloneNode() { return new Element(); }
}
const selectors = Object.fromEntries(['.controls','#timeline','#time','#replay','#pause','#still','#status','.pixel-fallback'].map(key => [key, new Element()]));
const simple = new Element(); simple.value = 'simple';
const optical = new Element(); optical.value = 'optical'; optical.checked = true;
const parts = Object.fromEntries(['.rays','.seed','.ident-name'].map(key => [key,new Element()]));
parts['.rays'].parentElement = new Element();
const mark = new Element(); mark.querySelector = key => parts[key]; mark.viewBox = {baseVal:{width:520}};
let pixels = [];
const canvasContext = {fillStyle:'',fillRect(...rect) { if (rect[2] === 320) pixels = []; pixels.push([this.fillStyle,...rect]); }};
selectors['#pixel'] = {getContext:()=>canvasContext};
const preference = {matches:false,addEventListener(type, callback) { this.change = callback; }};
const document = {hidden:false,handlers:{},fonts:{ready:Promise.resolve()},querySelector:key=>selectors[key],querySelectorAll:key=>key === '.ident' ? [mark] : [simple,optical],createElementNS:()=>new Element(),addEventListener(type,callback){this.handlers[type]=callback;}};
let now=0, serial=0;
const frames=new Map();
vm.runInNewContext(fs.readFileSync(path.join(__dirname,'ident.js'),'utf8'), {document,window:{addEventListener(){}},matchMedia:()=>preference,performance:{now:()=>now},requestAnimationFrame:callback=>{frames.set(++serial,callback);return serial;},cancelAnimationFrame:id=>frames.delete(id)});
const click = key => selectors[key].handlers.click();
function step(at) { now=at; const callbacks=[...frames.values()]; frames.clear(); callbacks.forEach(callback=>callback(at)); }
function choose(input) { simple.checked=false; optical.checked=false; input.checked=true; input.handlers.change(); }
function finalState() { return {pixels:JSON.stringify(pixels),name:{...parts['.ident-name'].style},rays:{...parts['.rays'].style},seed:{...parts['.seed'].style}}; }
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
console.log('PASS: variants produce the same final mark and pixels; mode switching keeps one frame loop; pause, completion, visibility and reduced motion cancel work.');
