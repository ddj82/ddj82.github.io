import {useThemeStore} from "../../store/themeStore.ts";
import {Moon, Sun, User} from "lucide-react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faGithub} from "@fortawesome/free-brands-svg-icons";
import {useNavigate} from "react-router-dom";
import {faFont} from "@fortawesome/free-solid-svg-icons";
import {useEffect, useRef, useState} from "react";
import AccordionItem from "../../util/AccordionItem.tsx";
import {
    FONT_STORAGE_KEY,
    DEFAULT_FONT,
    FONT_OPTIONS,
    type FontName,
    isFontName,
    applyFont,
} from "../../lib/font.ts"

export default function SideBar() {
    const navigate = useNavigate();
    const isDarkMode = useThemeStore((state) => state.isDarkMode);
    const toggleTheme = useThemeStore((state) => state.toggleTheme);
    const [isAccordionOpen, setIsAccordionOpen] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const [currentFont, setCurrentFont] = useState<FontName>(DEFAULT_FONT);

    // 마운트 시 저장된 폰트 복원
    useEffect(() => {
        const saved = localStorage.getItem(FONT_STORAGE_KEY);
        const initial = isFontName(saved) ? (saved as FontName) : DEFAULT_FONT;
        setCurrentFont(initial);
        applyFont(initial);
    }, []);

    const handleLink = (link: string) => {
        window.open(link, '_blank');
    };

    const handleLogo = () => {
        navigate('/');
        window.location.reload();
    };

    const toggleAccordion = () => {
        setIsAccordionOpen((prev) => !prev);
    };

    const closeAccordion = () => {
        setIsAccordionOpen(false);
    };

    useEffect(() => {
        const listener = (event: MouseEvent | TouchEvent) => {
            if (!wrapperRef.current || wrapperRef.current.contains(event.target as Node)) {
                return;
            }
            closeAccordion();
        };

        document.addEventListener("mousedown", listener);
        document.addEventListener("touchstart", listener);

        return () => {
            document.removeEventListener("mousedown", listener);
            document.removeEventListener("touchstart", listener);
        };
    }, []);

    const handleFontChange = (font: FontName) => {
        setCurrentFont(font);
        applyFont(font);
        localStorage.setItem(FONT_STORAGE_KEY, font);
        setIsAccordionOpen(false);
    };

    return (
        <aside
            className={`
                /* 공통 */
                row-start-1 lg:col-start-1
                z-40 text-black dark:text-white
        
                /* 모바일/태블릿: 상단 헤더 */
                sticky top-0
                w-full
                p-5 border-b
                backdrop-blur-lg
                flex items-center justify-between gap-3
        
                /* 데스크탑(lg+): 왼쪽 사이드 */
                lg:top-10
                lg:bg-transparent
                lg:p-0 lg:border-none
                lg:w-56 xl:w-64
                lg:flex lg:flex-col lg:gap-0
                `}
        >
            <div
                className={`
                /* 모바일/태블릿: 상단 헤더 */
                w-full
                flex items-center justify-between gap-3
        
                /* 데스크탑(lg+): 왼쪽 사이드 */
                lg:sticky lg:top-10
                lg:flex lg:flex-col lg:items-start lg:justify-start lg:gap-3
                `}
            >
                {/* 타이틀 (모바일: 좌측, 데스크탑: 상단) */}
                <div
                    className="font-semibold tracking-tight
                    text-lg
                    md:text-xl
                    lg:text-xxl lg:mb-6
                    "
                >
                    <button onClick={handleLogo}>ddj82's blog</button>
                </div>

                {/* 아이콘 영역: 모바일은 가로, 데스크탑은 세로 정렬 */}
                <div
                    className="flex items-center gap-4
                    lg:flex-col lg:items-start lg:gap-3
                    "
                >
                    <button
                        type="button"
                        onClick={() => navigate('/about')}
                        className="lg:self-start w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7"
                    >
                        <User className="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7"/>
                    </button>

                    <div ref={wrapperRef} className="flex-center lg:flex-col lg:items-start lg:gap-2 relative">
                        <button
                            type="button"
                            onClick={toggleAccordion}
                            className="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7"
                        >
                            <FontAwesomeIcon icon={faFont} className="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7" />
                        </button>

                        <div className="absolute top-7 left-[-30px] lg:static z-50">
                            <AccordionItem isOpen={isAccordionOpen}>
                                <div
                                    className="
                                    flex flex-col items-start gap-2 rounded-lg py-2 px-3
                                    bg-theme-light/30 dark:bg-theme-dark/30
                                    border border-black/30 dark:border-white/30
                                    lg:p-0 lg:bg-transparent lg:border-none
                                    "
                                >
                                    {FONT_OPTIONS.map((f) => (
                                        <button
                                            key={f}
                                            type="button"
                                            onClick={() => handleFontChange(f)}
                                            aria-pressed={currentFont === f}
                                            className={currentFont === f ? "font-bold underline" : ""}
                                        >
                                            {f}
                                        </button>
                                    ))}
                                </div>
                            </AccordionItem>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={() => handleLink('https://github.com/ddj82/')}
                        className="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7"
                    >
                        <FontAwesomeIcon icon={faGithub} className="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7"/>
                    </button>

                    <button
                        type="button"
                        onClick={toggleTheme}
                        className="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7"
                    >
                        {isDarkMode ?
                            <Sun className="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7"/>
                            :
                            <Moon className="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7"/>
                        }
                    </button>
                </div>
            </div>
        </aside>
    );
};
