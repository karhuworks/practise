
let x = "--";

function tallennaviesti() {
    x = document.getElementById("inputField").value;
    document.getElementById("savedMessage").textContent = x;
    document.querySelectorAll(".kaiku").forEach(el => {
        el.textContent = x;
    });
}

function muuta(element) {
    element.classList.toggle("kaiku-clicked");
}