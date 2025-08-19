import type { Options } from "rehype-pretty-code";
import {getShikiHighlighter} from "./shikiHighlighter.ts";

export const prettyCodeOptions: Options = {
    // 라이트/다크 모두 드라큘라로 고정
    theme: { light: "dracula", dark: "dracula" },
    keepBackground: true,           // 테마 배경색 사용
    defaultLang: "plaintext",       // 언어 없을 때 기본
    // 필요시: tokensMap(커스텀 토큰 스타일링) 등 추가 가능

    // ★ 핵심: 브라우저에서 사용할 Shiki 인스턴스 주입
    getHighlighter: getShikiHighlighter,
};
