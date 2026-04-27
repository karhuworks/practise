
let x = "--";

function tallennaviesti() {
    x = document.getElementById("inputField").value;
    kaiku(x);
}

function muuta(element) {
    element.classList.toggle("kaiku-clicked");
}

function kaiku(x) {
    document.querySelectorAll(".kaiku").forEach(el => {
        el.textContent = x;
    });
    localStorage.setItem("savedText", x);
}



// 1. lataa tallennettu teksti sivun käynnistyessä
window.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("inputField");

  const teksti = localStorage.getItem("savedText");
  if (teksti) {
    input.value = teksti;
  }

  kaiku(teksti);   
});