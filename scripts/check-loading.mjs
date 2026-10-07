import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import vm from 'node:vm';

const source=await readFile(new URL('../src/loading.js',import.meta.url),'utf8');
const flush=()=>new Promise(resolve=>setImmediate(resolve));

function browser({reducedMotion=false,saveData=false,fonts=Promise.resolve(),images=[]}={}){
  const classes=new Set(),timers=new Map();
  const motion=Object.assign(new EventTarget(),{matches:reducedMotion});
  const document=Object.assign(new EventTarget(),{
    readyState:'loading',documentElement:{classList:{add:name=>classes.add(name),remove:name=>classes.delete(name)}},
    fonts:{ready:fonts},querySelectorAll:()=>images
  });
  let nextTimer=0;
  const window=Object.assign(new EventTarget(),{
    matchMedia:()=>motion,
    setTimeout:(callback,delay)=>{const id=++nextTimer;timers.set(id,{callback,delay});return id;},
    clearTimeout:id=>timers.delete(id)
  });
  vm.runInNewContext(source,{window,document,navigator:{connection:{saveData}}});
  return {classes,timers,motion,document,window,ready:()=>document.dispatchEvent(new Event('DOMContentLoaded'))};
}

for(const preference of [{reducedMotion:true},{saveData:true}]){
  const page=browser(preference);
  assert(!page.classes.has('is-loading'),'Accessibility/data preferences should bypass the overlay');
  assert.equal(page.timers.size,0,'Bypassed loading must not add a delay');
}

const ready=browser();
assert(ready.classes.has('is-loading'));
ready.ready();await flush();
assert(!ready.classes.has('is-loading'),'Ready critical assets should dismiss immediately');
assert.equal(ready.timers.size,0,'Successful readiness must clear the deadline');

const failedImage=browser({images:[{decode:()=>Promise.reject(new Error('Unavailable image'))}]});
failedImage.ready();await flush();
assert(!failedImage.classes.has('is-loading'),'A failed image must not trap the visitor');

const stalled=browser({fonts:new Promise(()=>{})});
stalled.ready();
const deadline=[...stalled.timers.values()][0];
assert(deadline.delay<=1500,'Slow assets must have a short upper bound');
deadline.callback();
assert(!stalled.classes.has('is-loading'),'The deadline must reveal the page with stalled assets');

for(const interaction of ['pointerdown','keydown']){
  const page=browser({fonts:new Promise(()=>{})});
  page.document.dispatchEvent(new Event(interaction));
  assert(!page.classes.has('is-loading'),'Visitors must be able to dismiss loading by interacting');
}

const changedMotion=browser();
changedMotion.motion.dispatchEvent(Object.assign(new Event('change'),{matches:true}));
assert(!changedMotion.classes.has('is-loading'),'A live reduced-motion preference must dismiss loading');

const restored=browser();
restored.window.dispatchEvent(Object.assign(new Event('pageshow'),{persisted:true}));
assert(!restored.classes.has('is-loading'),'History restoration must never replay a loader');
console.log('Passed: loader readiness, asset failure/deadline, keyboard/touch dismissal, reduced motion, Save-Data and history restoration.');
