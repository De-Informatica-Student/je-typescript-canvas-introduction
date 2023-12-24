/** The current value of the counter. */
let value: number = 0;

/** Reference to the box element, this way; it doesn't have to be retrieved every function call */
let box: HTMLParagraphElement = null;

// Make sure the buttons are linked to the correct events
window.addEventListener('load', function() {
  box = document.getElementById('box') as HTMLParagraphElement;
  const increase: HTMLButtonElement = document.getElementById('increase') as HTMLButtonElement;
  const decrease: HTMLButtonElement = document.getElementById('decrease') as HTMLButtonElement;

  increase.addEventListener('click', increaseAndUpdate);
  decrease.addEventListener('click', decreaseAndUpdate);
});

/** Increases the value by 1 and update the box text. */
function increaseAndUpdate() {
  value = value + 1;
  updateBoxText();
}

/** Decrease the value by 1 and update the box text. */
function decreaseAndUpdate() {
  value = value - 1;
  updateBoxText();
}

/** Update the box text to match the current value. */
function updateBoxText() {
  box.innerText = value.toString();
}
