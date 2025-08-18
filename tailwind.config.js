/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    darkMode: "class", // 다크모드 클래스 방식
    theme: {
        extend: {
            colors: {
                // 메인 컬러
                djblog: {
                    DEFAULT: "#c76b5d", // = mindlog-500
                    //밝은
                    100: "#fde8e4",
                    200: "#facfc8",
                    300: "#f3a69b",
                    400: "#e87d6d",

                    // 어두운
                    600: "#a5554c",
                    700: "#8b443e",
                    800: "#6f332f",
                    900: "#55241f",
                },

                // 코드블럭 라이트 모드 배경
                "codeBlockLight": "#f5ebdc",

                // 라이트 모드 배경
                "theme-light": "#fffaf0",
                // 다크 모드 배경
                "theme-dark": "#1b1f24",  

            },
            textColor: {
                // 라이트 모드 글자색
                'main-light': "#4B5563", // gray-700
                // 다크 모드 글자색
                'main-dark': "#F3F4F6", // gray-100
            },
            typography: ({ theme }) => ({
                DEFAULT: {
                    css: {
                        /* 코드블록(``` ... ```) 배경 */
                        pre: {
                            borderRadius: theme("borderRadius.lg"),
                            padding: `${theme("spacing.4")} ${theme("spacing.5")}`,
                        },

                        '--tw-prose-pre-bg': theme('colors.codeBlockLight'),

                        /* 코드블록 내 텍스트 색 */
                        'pre code': {
                            color: theme('colors.zinc.900'),
                        },
                    },
                },
                invert: {
                    /* 다크모드 시 코드블록 배경 */
                    css: {
                        '--tw-prose-pre-bg': theme('colors.slate.800'),

                        'pre code': {
                            color: theme('colors.zinc.100'),
                        },
                    },
                },
            }),
        },
    },
    plugins: [
        require('@tailwindcss/typography'),
        function ({ addUtilities }) {
            addUtilities({
                '.scrollbar-hidden': {
                    /* 크로스 브라우저 스크롤바 숨기기 */
                    'scrollbar-width': 'none', /* Firefox */
                    '&::-webkit-scrollbar': {
                        display: 'none', /* Chrome, Safari */
                    },
                },
                '.flex-center': {
                    display: 'flex',
                    'align-items': 'center',
                    'justify-content': 'center',
                },
                '.font-title': {
                    fontWeight: 'bold',
                    fontSize: '1.125rem',
                    lineHeight: '1.75rem',
                },
                '.text-xxs': {
                    fontSize: '0.6rem',
                    lineHeight: '1rem',
                },
                '.text-xxxs': {
                    fontSize: '0.3rem',
                    lineHeight: '0.4rem',
                },
                '.text-xxl': {
                    fontSize: '1.5rem',
                    lineHeight: '2rem',
                },
                '.text-xxxl': {
                    fontSize: '2rem',
                    lineHeight: '2.5rem',
                },
            });
        },
    ],
}
