export const FONT_STORAGE_KEY = "app-font" as const;
export const DEFAULT_FONT = "GowunDodum" as const;

export const FONT_OPTIONS = [
    "GowunDodum",
    "MaruBuri",
    "OmyuPretty",
    "LeeSeoyoon",
] as const;

export type FontName = typeof FONT_OPTIONS[number];

export function isFontName(v: unknown): v is FontName {
    return typeof v === "string" && (FONT_OPTIONS as readonly string[]).includes(v);
}

export function applyFont(font: FontName) {
    if (font === DEFAULT_FONT) {
        document.documentElement.removeAttribute("data-font");
    } else {
        document.documentElement.setAttribute("data-font", font);
    }
    localStorage.setItem("app-font", font)
}
