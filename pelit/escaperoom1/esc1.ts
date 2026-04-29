let intro1 = "You were kidnapped by your friend. You are locked in his room. The door has a lock with a four-digit code. You know your friend likes to base his passwords on things around him. Look around to find the code to the lock."
let intro2 = "You sneek out of the room. The front door is locked from the outside. There are no other doors, but gou notice that the kitchen window is open. You are on the third floor but there is a tree behind the window. Try to find your way down."
let intro3 = "You reached the ground! You are almost safe, but your friend has noticed you are gone. You need to get away fast. Pick a car to drive away before your friend comes after you."


type states = "intro" | "room";
type specific = 0 | 1 | 2 | 3 | 4;

type State =
  | { mode: "intro"; step: 0 | 1 | 2 | 3 | 4}
  | { mode: "room"; step: 1 | 2 | 3 }
  | { mode: "win"; step: 0};

/* type State = {
  mode: "intro" | "room";
  step: 0 | 1 | 2 | 3 | 4;
}; */

let state: State = {
    mode: "intro",
    step: 0
};

//let state: states = "intro";
//let statespecific: specific = 0;

let room1 = "pictures/esc1_r1.jpg";
let room2 = "pictures/esc1_r2.jpg";
let room3 = "pictures/esc1_r3.jpg";

function show() {
    const a = document.querySelector(".testitesti p");
    if (a) {
        a.textContent = state.mode + " " + state.step;
    }
    else {
        throw new Error("Element no found.")
    }
}

document.addEventListener("DOMContentLoaded", show);

let button = document.getElementById("testbutton");
if (button) {
    button.addEventListener("click", changestate)
}

function changestate() {

    if (state.step === 0) {
        state.step = 1;
    }
    else if (state.step === 4) {
        return;
    }
    else if (state.mode === "intro") {
        state = {
            mode: "room",
            step: state.step
        };
    }
    else if (state.mode === "room") {
        if (state.step < 4) {
            state.step += 1;
        }
        
        state = {
            mode: "intro",
            step: state.step
        };
    }

    show();
    showcontent();
}

function showcontent() {
    if (state.mode === "room"){
        room();
    }
    else if (state.mode === "intro") {
        intro();
    }
    else {
        throw new Error("Escaped state.");
    }
}

function intro() {
    hideroom();

    const intro = document.getElementById("intro");
    if (!intro) {
        throw new Error("no intro found");
    }

    if (state.step === 1) {
        intro.textContent = intro1;
    }
    else if (state.step === 2) {
        intro.textContent = intro2;
    }
    else if (state.step === 3) {
        intro.textContent = intro3;
    }
    else if (state.step === 4) {
        win();
    }

    unhideintro();
}   

function room() {
    hideintro();

    const room = document.querySelector<HTMLImageElement>(".room img");

    if (!room) {
        throw new Error("no room found");
    }

    if (state.step === 1) {
        room.src = room1;
    }
    else if (state.step === 2) {
        room.src = room2;
    }
    else if (state.step === 3) {
        room.src = room3;
    }

    unhideroom();
}

function hideintro() {
    const intro = document.getElementById("intro");
    if (intro) {
        intro.classList.add("hidden");
    }
}

function unhideintro() {
    const intro = document.getElementById("intro");
    if (intro) {
        intro.classList.remove("hidden");
    }
}

function hideroom() {
    const room = document.querySelector(".room");
    if (room) {
        room.classList.add("hidden");
    }
}

function unhideroom() {
    const room = document.querySelector(".room");
    if (room) {
        room.classList.remove("hidden");
    }
}

function win() {
    const intro = document.getElementById("intro");
    if (intro) {
        intro.textContent = "VOITTO";    
    }
}