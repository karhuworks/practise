let intro1 = "You were kidnapped by your friend. You are locked in his room. The door has a lock with a four-digit code. You know your friend likes to base his passwords on things around him. Look around to find the code to the lock."
let intro2 = "You sneek out of the room. The front door is locked from the outside. There are no other doors, but gou notice that the kitchen window is open. You are on the third floor but there is a tree behind the window. Try to find your way down."
let intro3 = "You reached the ground! You are almost safe, but your friend has noticed you are gone. You need to get away fast. Pick a car to drive away before your friend comes after you."

let roomstatus = 0;
// 0: start
// 1: room1 intro
// 2: room1
// 3: room2 intro
// 4: room2
// 5: room3 intro
// 6: room3

let room1 = "pictures/esc1_r1.png";
let room2 = "pictures/esc1_r2.jpg";
let room3 = "pictures/esc1_r3.jpg";

function show() {
    const a = document.querySelector(".testitesti p");
    a.textContent = roomstatus;
}

document.addEventListener("DOMContentLoaded", show);

function changestate() {

    if (roomstatus === 0) {
        roomstatus = 1;
    }

    else if (roomstatus === 1) {
        roomstatus = 2;
    }
    else if (roomstatus === 2) {
        roomstatus = 3;
    }
    else if (roomstatus === 3) {
        roomstatus = 4;
    }
    else if (roomstatus === 4) {
        roomstatus = 5;
    }
    else if (roomstatus === 5) {
        roomstatus = 6;
    }
    else if (roomstatus === 6) {
        roomstatus = 7;
    }
    show();
    showcontent();
}

function showcontent() {
    if (Number.isInteger(roomstatus / 2)){
        room();
    }
    else {
        intro();
    }
}

function intro() {
    hideroom();

    const intro = document.getElementById("intro");
    if (roomstatus === 1) {
        intro.textContent = intro1;
    }
    else if (roomstatus === 3) {
        intro.textContent = intro2;
    }
    else if (roomstatus === 5) {
        intro.textContent = intro3;
    }
    else if (roomstatus === 7) {
        win();
    }

    unhideintro();
}   

function room() {
    hideintro();

    const room = document.querySelector(".room img");

    if (roomstatus === 2) {
        room.src = room1;
    }
    else if (roomstatus === 4) {
        room.src = room2;
    }
    else if (roomstatus === 6) {
        room.src = room3;
    }

    unhideroom();
}

function hideintro() {
    const intro = document.getElementById("intro");
    intro.classList.add("hidden");
}

function unhideintro() {
    const intro = document.getElementById("intro");
    intro.classList.remove("hidden");    
}

function hideroom() {
    const room = document.querySelector(".room");
    room.classList.add("hidden");
}

function unhideroom() {
    const room = document.querySelector(".room");
    room.classList.remove("hidden");
}

function win() {
    const intro = document.getElementById("intro");
    intro.textContent = "VOITTO";    
}