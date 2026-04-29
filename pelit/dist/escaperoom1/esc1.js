let solved = false;
/* type State = {
  mode: "intro" | "room";
  step: 0 | 1 | 2 | 3 | 4;
}; */
let state = {
    mode: "intro",
    step: 0
};
function show() {
    const a = document.querySelector(".testitesti p");
    if (a) {
        a.textContent = state.mode + " " + state.step;
    }
    else {
        throw new Error("Element no found.");
    }
}
function changestate() {
    if (state.step === 0) {
        state.step = 1;
        document.getElementById("testbutton")?.classList.add("hidden");
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
    renderRoom();
}
function renderRoom() {
    unhideState();
    //room solved
    let button = document.getElementById("testsolve" + state.mode + state.step);
    if (button) {
        button.addEventListener("click", changeSolved);
    }
}
function changeSolved() {
    solved = !solved;
    let testsolved = "" + solved;
    test(testsolved);
    if (solved) {
        hideState();
        solved = false;
        changestate();
    }
}
function test(output) {
    const a = document.querySelector(".testitesti p");
    if (a) {
        a.textContent = output;
    }
}
function hideState() {
    let roomElement = document.getElementById(state.mode + state.step);
    if (!roomElement) {
        throw new Error(roomElement + "not found");
    }
    roomElement.classList.add("hidden");
}
function unhideState() {
    let roomElement = document.getElementById(state.mode + state.step);
    if (!roomElement) {
        throw new Error(roomElement + "not found");
    }
    roomElement.classList.remove("hidden");
}
/* EVENT LISTENERS */
document.querySelectorAll(".testsolve").forEach(btn => {
    btn.addEventListener("click", changeSolved);
});
document.addEventListener("DOMContentLoaded", show);
document.getElementById("testbutton")?.addEventListener("click", changestate);
export {};
//# sourceMappingURL=esc1.js.map