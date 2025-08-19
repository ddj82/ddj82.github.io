// Shiki v1: 브라우저 번들에 테마/언어 포함
import { createHighlighter, type HighlighterGeneric } from "shiki";

// ★ 사용 언어와 테마를 명시적으로 가져와서 번들에 포함
import dracula from "shiki/themes/dracula.mjs";
import ts from "shiki/langs/ts.mjs";
import tsx from "shiki/langs/tsx.mjs";
import js from "shiki/langs/javascript.mjs";
import json from "shiki/langs/json.mjs";
import bash from "shiki/langs/bash.mjs";
import md from "shiki/langs/markdown.mjs";
import html from "shiki/langs/html.mjs";
import css from "shiki/langs/css.mjs";

let _highlighter: HighlighterGeneric | null = null;

export async function getShikiHighlighter() {
    if (_highlighter) return _highlighter;

    _highlighter = await createHighlighter({
        themes: [dracula],
        langs: [ts, tsx, js, json, bash, md, html, css],
    });

    return _highlighter;
}
