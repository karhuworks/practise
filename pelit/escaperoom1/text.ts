type GameText = {
  intro0: {
    title: string;
    subtitle: string;
    button: string;
  };
  intro1: {
    text: string;
    button: string;
  };
  intro2: {
    text: string;
    button: string;
  };
  intro3: {
    text: string;
    button: string;
  };
  intro4: {
    text: string;
    button: string;
  };
  room1: {
    hint: string;
    code: string;
  };
  room2: {
    hint: string;
    code: string;
  };
  room3: {
    hint: string;
    code: string;
  };
};

let gameText: GameText;

export async function loadText() {
  const res = await fetch("text.json");
  gameText = await res.json();
}

export function getText<K extends keyof GameText>(key: K): GameText[K] {
  return gameText[key];
}