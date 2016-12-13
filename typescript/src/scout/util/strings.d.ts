interface Strings {
    concat(a: string, b: string): string;
}

declare module 'strings' {
    export = strings;
}

declare var strings: Strings;







