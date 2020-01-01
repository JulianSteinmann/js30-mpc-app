//= require jquery
//= require jquery_ujs

let playing = false;
const mpcKeys = document.querySelectorAll(".mpc-key");
const keys = ['q','w','e','r','t','y']
const drumPad = document.getElementById("drum-pad");
// let baseFreq = 100;

const tones = {
  'C': 262.63,
  'D':293.66,
  'E': 329.63,
  'F': 349.23,
  'G': 392,
  'A': 440,
  'B': 493.88
}
let buttonCount = 0;
class DrumPad {
  constructor(key, pitch) {
       this.key = key;
       this.pitch = pitch;
       this.oscillator = this.initOscillator();
       this.addButton();
       this.addClickTrigger();
       this.addKeyboardTrigger();
   }

   startBeep() { this.oscillator.amp(0.5, 0.15); }

   stopBeep() { setTimeout(() => { this.oscillator.amp(0, 0.15); },    50); }

   initOscillator() {
     const newOsc = new p5.Oscillator();
     newOsc.setType('sine');
     newOsc.start();
     newOsc.amp(0);
     newOsc.freq(this.pitch);
     return newOsc
   }

   addKeyboardTrigger() {
     document.addEventListener("keydown", event => { if (event.key === this.key) {
       this.startBeep();
       this.addActiveClass();
     } });
     document.addEventListener("keyup", event => { if (event.key === this.key) {
       this.stopBeep();
       this.addRemoveClass();
     } });
   }

   addClickTrigger() {
     this.drumPadButton.addEventListener('mousedown', e => { this.startBeep(); this.addActiveClass(); });
     this.drumPadButton.addEventListener('mouseup',   e => { this.stopBeep();  this.addRemoveClass(); });
   }

   addButton() {
     drumPad.insertAdjacentHTML("beforeend", '<button class="mpc-key mpc-key-' + buttonCount + '">' + this.key + '</button>');
     this.drumPadButton = document.querySelector(".mpc-key-" + buttonCount)
     buttonCount++;
   }

   addActiveClass() {
     this.drumPadButton.classList.add("active");
   }
   addRemoveClass() {
     this.drumPadButton.classList.remove("active");
   }

}

// Create DrumPad Instanes
for (let i=0; i < keys.length; i++) {
  drumpads = new DrumPad(keys[i], tones[Object.keys(tones)[i]])
}

// function setup() {
//   // Slider
//   // backgroundColor = color(255,0,255);
//   // createCanvas(710, 400);
//   // freqSlider = createSlider(1, 10, 1);
// }
//
// function draw() {
//   // baseFreq = freqSlider.value() * 130.82;
// }




// REFACTOR PLANS
// [x] OOP
// [x] Generate html via js
// [ ] Use full keyboard:
//     arr [ [1234567890], [qwertyuiop[]], [asdfghjkl;], [zxcvbnm,.] ] => new DrumPad object
// [ ] calculate music notes
//     https://codepen.io/enxaneta/post/frequencies-of-musical-notes
// [ ] Version with audio
// [ ] Upload audio (cloudinary?)
