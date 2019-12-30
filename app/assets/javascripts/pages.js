//= require jquery
//= require jquery_ujs

let oscs = [];
let playing = false;
const mpcKeys = document.querySelectorAll(".mpc-key");
const keys = ['q','w','e','r','t','y']
// let baseFreq = 100;

const tones = {
  'C': 261.63,
  'C#': 277.18,
  'D':293.66,
  'D#':311.13,
  'E': 329.63,
  'F': 349.23,
  'F#': 369.99,
  'G': 392,
  'G#': 415.3,
  'A': 440,
  'A#': 466.16,
  'B': 493.88
}

function initOscillator() {
  let newOsc = new p5.Oscillator();
  newOsc.setType('sine');
  newOsc.freq(240);
  newOsc.amp(0);
  newOsc.start();
  return newOsc
}

function setup() {
  backgroundColor = color(255,0,255);
  textAlign(CENTER);
  createCanvas(710, 400);
  for (let i=0; i < mpcKeys.length; i++) {
    oscs.push(initOscillator())
  }
  // freqSlider = createSlider(0, 255, 100);

}



function draw() {
  // baseFreq = freqSlider.value();
}

function startBeep(frec, i) {
  oscs[i].freq(frec)
  oscs[i].amp(0.5, 0.15);
}
function stopBeep(frec, i) {

  setTimeout(() => { oscs[i].amp(0, 0.15); },    50);
}



for (const [i, key]  of mpcKeys.entries()) {
  console.log(  tones[Object.keys(tones)[i]] );
  const keyFreq = tones[Object.keys(tones)[i]] ;
  const keyIndex = Number(key.dataset.keyIndex)
  key.addEventListener('mousedown', e => {
   startBeep(keyFreq, keyIndex );
  });
  key.addEventListener('mouseup', e => {
   stopBeep(keyFreq, keyIndex );
  });

  addKeyboardTrigger(keys[i], keyFreq, keyIndex);
}

function addKeyboardTrigger(trigger, keyFreq, keyIndex){
  document.addEventListener("keydown", event => {
    if (event.key === trigger) {
      startBeep(keyFreq, keyIndex );
    }
  });
  document.addEventListener("keyup", event => {
    if (event.key === trigger) {
      stopBeep(keyFreq, keyIndex );
    }
  });
}
