//= require jquery
//= require jquery_ujs

$(document).ready(function() {

console.log("louded");
const mpcKeys = document.querySelectorAll(".mpc-key");
console.log( mpcKeys );
console.log( mpcKeys.length );

for (let key of mpcKeys) {
  key.addEventListener("click", function(){
   alert("yay");
  });
}

function setup() {
  createCanvas(640, 480);

}

function draw() {

}

});
