var i = 0;
var txt = 'INZHS4DUN5'; /* The text */
var speed = 500; /* The speed/duration of the effect in milliseconds */
function typeWriter() {
  if (i < txt.length) {
    document.getElementById("a").innerHTML += txt.charAt(i);
    i++;
    setTimeout(typeWriter, speed);
  }
}
