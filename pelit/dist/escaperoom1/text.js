let gameText;
export async function loadText() {
    const res = await fetch("text.json");
    gameText = await res.json();
}
export function getText(key) {
    return gameText[key];
}
//# sourceMappingURL=text.js.map