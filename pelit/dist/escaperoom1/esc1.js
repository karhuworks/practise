import { loadText, getText } from "./text.js";
await loadText();
let solved = false;
/* type State = {
  mode: "intro" | "room";
  step: 0 | 1 | 2 | 3 | 4;
}; */
let state = {
    mode: "intro",
    step: 0
};
let oldstate = {
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
    //hideState();
    oldstate = { ...state };
    if (state.step === 0) {
        state.step = 1;
        //document.getElementById("testbutton")?.classList.add("hidden");
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
    renderRoom();
}
function renderRoom() {
    show();
    hide(oldstate);
    let currentState = state;
    let stateName = state.mode + state.step;
    //let stateKey = state.mode + state.step as StateKey;
    unhide(currentState);
    bindZoom();
    switch (stateName) {
        case "intro0":
            renderIntro0();
            break;
        case "intro1":
            renderRoomIntro("intro1");
            break;
        case "intro2":
            renderRoomIntro("intro2");
            break;
        case "intro3":
            renderRoomIntro("intro3");
            break;
    }
}
function renderIntro0() {
    const text = getText("intro0");
    const el = document.getElementById("intro0title");
    const el2 = document.getElementById("intro0subtitle");
    if (el)
        el.textContent = text.title;
    if (el2)
        el2.textContent = text.subtitle;
}
function renderRoomIntro(data) {
    const text = getText(data);
    const el = document.getElementById(data + "text");
    if (el)
        el.textContent = text.text;
}
function changeSolved() {
    solved = !solved;
    let testsolved = "" + solved;
    if (solved) {
        solved = false;
        changestate();
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
function hide(objeckt) {
    let roomElement = document.getElementById(objeckt.mode + objeckt.step);
    if (!roomElement) {
        throw new Error(roomElement + "not found");
    }
    roomElement.classList.add("hidden");
}
function unhide(objeckt) {
    let roomElement = document.getElementById(objeckt.mode + objeckt.step);
    if (!roomElement) {
        throw new Error(roomElement + "not found");
    }
    roomElement.classList.remove("hidden");
}
function test(output) {
    const a = document.querySelector(".testitesti p");
    if (a) {
        a.textContent = output;
    }
}
/* EVENT LISTENERS */
document.querySelectorAll(".testsolve").forEach(btn => {
    btn.addEventListener("click", changeSolved);
});
//document.addEventListener("DOMContentLoaded", renderRoom);
show();
renderRoom();
document.getElementById("testbutton")?.addEventListener("click", changestate);
// ================== ZOOM ==================
const overlay = document.getElementById("zoomOverlay");
const zoomImg = document.getElementById("zoomImage");
/*function openZoom(src: string) {
  if (!overlay || !zoomImg) return;

  zoomImg.src = src;
  overlay.classList.remove("hidden");
}*/
function openZoom(src, x = 0.5, y = 0.5) {
    if (!overlay || !zoomImg)
        return;
    zoomImg.src = src;
    overlay.classList.remove("hidden");
    const scale = 2.5;
    const scaledWidth = zoomImg.clientWidth * scale;
    const scaledHeight = zoomImg.clientHeight * scale;
    const offsetX = (0.5 - x) * 100;
    const offsetY = (0.5 - y) * 100;
    const clamp = (v, min, max) => Math.max(min, Math.min(max, v));
    const maxX = (scaledWidth - window.innerWidth) / 2;
    const maxY = (scaledHeight - window.innerHeight) / 2;
    const clampedX = clamp(offsetX, -maxX, maxX);
    const clampedY = clamp(offsetY, -maxY, maxY);
    zoomImg.style.transform = `translate(${offsetX}%, ${offsetY}%) scale(${scale})`;
}
function closeZoom() {
    overlay?.classList.add("hidden");
}
/*function bindZoom() {
  document.querySelectorAll(".inspectable").forEach((img) => {
    img.addEventListener("mouseover", () => {
      openZoom((img as HTMLImageElement).src);
    });
  });
}*/
function bindZoom() {
    document.querySelectorAll(".inspectable").forEach((img) => {
        img.addEventListener("click", (e) => {
            const rect = img.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width;
            const y = (e.clientY - rect.top) / rect.height;
            openZoom(img.src, x, y);
        });
    });
}
overlay?.addEventListener("click", closeZoom);
/*document.addEventListener("click", (e) => {
  const target = e.target as HTMLElement;

  if (target.classList.contains("inspectable")) {
    openZoom((target as HTMLImageElement).src);
  }
});*/
// ================== Clicable ==================
const clues = document.querySelectorAll(".osoitin");
function openClue(e) {
    const target = e.currentTarget;
    target.classList.add("osoitin-clicked");
}
clues.forEach(element => {
    element.addEventListener("click", openClue);
});
//# sourceMappingURL=esc1.js.map