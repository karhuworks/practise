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
export type StateKey = keyof GameText;
export declare function loadText(): Promise<void>;
export declare function getText<K extends keyof GameText>(key: K): GameText[K];
export {};
//# sourceMappingURL=text.d.ts.map