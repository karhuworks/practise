let roomstatus = 1;

let room1 = "pictures/esc1_r1.png";
let room2 = "pictures/esc1_profile.jpg";

function changestate() {
    if (roomstatus === 1) {
        roomstatus = 2;
    }
    else if (roomstatus === 2) {
        roomstatus = 1;
    }
    changeRoom();
}

function changeRoom() {
    const room = document.querySelector(".room img");

    if (roomstatus === 1) {
        room.src = room1;
    }
    else if (roomstatus === 2) {
        room.src = room2;
    }
}