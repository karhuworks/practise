import { type StateKey, loadText, getText } from "./text.js";

await loadText();

type roomnumbers =  1 | 2 | 3;
type intronumbers = 0 | 1 | 2 | 3 | 4;

type State =
  | { mode: "intro"; step: intronumbers}
  | { mode: "room"; step: roomnumbers}

let solved: boolean = false;

/* type State = {
  mode: "intro" | "room";
  step: 0 | 1 | 2 | 3 | 4;
}; */

let state: State = {
    mode: "intro",
    step: 0
};

let oldstate: State = {
    mode: "intro",
    step: 0
};

function show() { /*testifunktio*/
    const a = document.querySelector(".testitesti p");
    if (a) {
        a.textContent = state.mode + " " + state.step;
    }
    else {
        throw new Error("Element no found.")
    }
}

function changestate() {
    //hideState();
    oldstate = {...state};

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
    let currentState: State = state; 
    let stateName: string = state.mode + state.step;
    //let stateKey = state.mode + state.step as StateKey;
    unhide(currentState);

    bindZoom();

/*     switch (stateName) {
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
    } */
}

function renderIntro0(){
    const text = getText("intro0");
    const el = document.getElementById("intro0title");
    const el2 = document.getElementById("intro0subtitle");
    
    if (el) el.textContent = text.title;
    if (el2) el2.textContent = text.subtitle;
}

function renderRoomIntro(data: "intro1" | "intro2" | "intro3"){
    const text = getText(data);

    const el = document.getElementById(data + "text");

    if (el) el.textContent = text.text;
}

function changeSolved() {
    solved = !solved;
    let testsolved: string = "" + solved;

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

function hide(objeckt: State) {
    let roomElement = document.getElementById(objeckt.mode + objeckt.step);
    if (!roomElement) {
        throw new Error(roomElement + "not found");
    }
    roomElement.classList.add("hidden");
}

function unhide(objeckt: State) {
    let roomElement = document.getElementById(objeckt.mode + objeckt.step);
    if (!roomElement) {
        throw new Error(roomElement + "not found");
    }
    roomElement.classList.remove("hidden");
}

function unhidebyid(id: string) {
    let roomElement = document.getElementById(id);
    if (!roomElement) {
        throw new Error(roomElement + "not found");
    }
    roomElement.classList.remove("hidden");
}

function hidebyid(id: string) {
    let roomElement = document.getElementById(id);
    if (!roomElement) {
        throw new Error(roomElement + "not found");
    }
    roomElement.classList.remove("hidden");
}

function test(output: string){
    const a = document.querySelector(".testitesti p");
    if (a) {
        a.textContent = output;
    }
}

/* EVENT LISTENERS */

document.querySelectorAll(".continuebutton").forEach(btn => {
    btn.addEventListener("click", changeSolved);
});

//document.addEventListener("DOMContentLoaded", renderRoom);
show();
renderRoom();

document.getElementById("startbutton")?.addEventListener("click", changestate);

// ================== ZOOM ==================

const overlay = document.getElementById("zoomOverlay");
const zoomImg = document.getElementById("zoomImage") as HTMLImageElement;

/*function openZoom(src: string) {
  if (!overlay || !zoomImg) return;

  zoomImg.src = src;
  overlay.classList.remove("hidden");
}*/

function openZoom(src: string, x = 0.5, y = 0.5) {
  if (!overlay || !zoomImg) return;

  zoomImg.src = src;

  overlay.classList.remove("hidden");

  const scale = 2.5;

  const scaledWidth = zoomImg.clientWidth * scale;
  const scaledHeight = zoomImg.clientHeight * scale;

  const offsetX = (0.5 - x) * 100;
  const offsetY = (0.5 - y) * 100;

  const clamp = (v: number, min: number, max: number) =>
  Math.max(min, Math.min(max, v));

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
  document.querySelectorAll<HTMLImageElement>(".inspectable").forEach((img) => {
    img.addEventListener("click", (e: MouseEvent) => {
      const rect = (img as HTMLImageElement).getBoundingClientRect();

      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;

      openZoom((img as HTMLImageElement).src, x, y);
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


// ================== CLUES ==================

let currentClue: string;

const clues = document.querySelectorAll(".osoitin");

function openClue(e: Event) {
    e.stopPropagation();

    const target = e.currentTarget as HTMLElement; //currenttarget = elemnentti, johon event listener liitetty
    const id = target.id;
    const imgnumber = id.slice(-2);
    const imgid: string = "clue" + imgnumber;
    
    const image = document.getElementById(imgid);
    if (image) {
        currentClue = imgid;
        image.classList.remove("hidden");
        fadebackground();
        document.removeEventListener("click", closeClue); 
        document.addEventListener("click", closeClue);
    }
}

function closeClue(e: Event) {
    const image = document.getElementById(currentClue);
    
    if (image && image.contains(e.target as Node)) {
        return;
    }

    if (image) {
        currentClue = "";
        removefade();
        image.classList.add("hidden");
        document.removeEventListener("click", closeClue);
    }
}

clues.forEach(element => {
    element.addEventListener("click", openClue);
});

function fadebackground() {
    const fade = document.querySelectorAll<HTMLElement>(".backgroundfade");
    const currentfade = fade[state.step-1];

    currentfade?.classList.remove("hidden");
}

function removefade() {
    const fade = document.querySelectorAll<HTMLElement>(".backgroundfade");
    const currentfade = fade[state.step-1];

    currentfade?.classList.add("hidden");
}

// ================== HINTS ==================

const hintbuttons = document.querySelectorAll<HTMLElement>(".hintbutton");
hintbuttons.forEach(b => b.addEventListener("click", () => {
    annavihje(b);
}));

function annavihje(hintelement: HTMLElement){
    const huone = hintelement.dataset.huone;
    const hint = hintelement.dataset.id;
    const hintnumber = Number(hint);
    const datakey = "room" + huone as "room1" | "room2" | "room3"; 
    const vinkki = "hint" + hint as "hint1" | "hint2";
    const data = getText(datakey);

    const elementid = "hint" + huone + hint;
    const el = document.getElementById(elementid);

    if (!el) return;

    if (el.classList.contains("hint-clicked")) {
        el.classList.remove("hint-clicked");
        el.innerHTML = ""; // or keep content if you prefer
        return;
    }

    if (hintnumber === 1) {
        el.innerHTML = data.hint1;
    }
    else if (hintnumber === 2) {
        el.innerHTML = data.hint2;
    }
    else {
        el.innerHTML = "Error: data not found";
    }
    el.classList.add("hint-clicked");
     
}



// ================== VASTAUS ==================


function tarkistavastaus(vastauselement: HTMLElement) {
    const inputelement = vastauselement.querySelector(".vastausinput") as HTMLInputElement;
    const input = inputelement.value;
    const huone = Number(vastauselement.dataset.huone);
    let vastaus: string;

    if (!input.trim()) {
        return;
    }

    const answers = {
    1: getText("room1").code,
    2: getText("room2").code,
    3: getText("room3").code
    } as const;

    vastaus = answers[huone as 1 | 2 | 3] ?? "0";

    if (input.trim() === vastaus.trim() && vastaus.trim() !== "") {
        //changestate();
        testsolved;
    }
    else {
        flashClass(vastauselement, "wrong", 1);
    }
}

document.querySelectorAll(".vastauslaatikko").forEach(box => {
    const el = box as HTMLElement;
    const button = box.querySelector(".vastausbutton") as HTMLButtonElement;
    console.log("box", box);
    console.log("button", button);
    button.addEventListener("click", () => {
        tarkistavastaus(el);
    });
});

function flashClass(el: HTMLElement, className: string, s: number) {
    const ms = s * 1000;

    el.classList.add(className);

    setTimeout(() => {
        el.classList.remove(className);
    }, ms);
}

// ================== TEST SOLVED ==================

function testsolved(){
    const d = document.getElementById("testsolved");
    d?.classList.remove("hidden");

    const b = document.getElementById("exittest");
    b?.addEventListener("click", poistu);

}

function poistu() {
    window.location.href = "../pelit.html";
}