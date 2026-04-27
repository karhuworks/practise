let count = 0;

function increase() {
  count++;
  document.getElementById("count").textContent = count;
  checkwin();
}

function decrease() {
  count--;
  document.getElementById("count").textContent = count;
    checkwin();
}

function reset() {
  count = 0;
  document.getElementById("count").textContent = count;
  setMessage("");
  hideMessage();
}  

function divide() {
    count = count / 2;
    if (Number.isInteger(count) === false) {
        count = Math.round(count);
    }
    document.getElementById("count").textContent = count;
    checkwin();
}

function multiply() {
    count = count * 2;
    document.getElementById("count").textContent = count;
    checkwin();
}

function opposite() {
    count = count * -1;
    document.getElementById("count").textContent = count;
    checkwin();

}

function increase5() {
    count = count + 5;
    document.getElementById("count").textContent = count;
    checkwin();
}

function decrease5() {
    count = count - 5;
    document.getElementById("count").textContent = count;
    checkwin();
}   

function checkwin() {
    if (count >= 100) {
        setMessage("You win!");
    } else if (count <= -100) {
        setMessage("You lose!");
    } else {
        hideMessage();
    }
}

function setMessage(msg) {
    showMessage(msg);
}

function showMessage(msg) {
  const box = document.getElementById("messagebox");
  box.textContent = msg;
  box.classList.remove("hidden"); // ALWAYS show
  if (msg === "You win!") {
    box.classList.add("win");
    box.classList.remove("lose");
  }
    else if (msg === "You lose!") {
    box.classList.add("lose");
    box.classList.remove("win");
  }
}

function hideMessage() {
  const box = document.getElementById("messagebox");
  box.classList.add("hidden"); // ALWAYS hide
}

function toggleInstructions() {
  const instructions = document.querySelector(".counter-ohjeistus");
  instructions.classList.toggle("hidden");
}

