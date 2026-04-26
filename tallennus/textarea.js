// haetaan elementti
  const textArea = document.getElementById("text");


// 1. lataa tallennettu teksti sivun käynnistyessä
window.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("inputField");

  const saved = localStorage.getItem("myText");
  if (saved) {
    textArea.value = saved;
  }
});

// 2. tallenna aina kun käyttäjä kirjoittaa
textArea.addEventListener("input", () => {
  localStorage.setItem("myText", textArea.value);
});