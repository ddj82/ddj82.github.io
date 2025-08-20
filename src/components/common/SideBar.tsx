import {useThemeStore} from "../../store/themeStore.ts";
import {Moon, Sun, User} from "lucide-react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faGithub} from "@fortawesome/free-brands-svg-icons";
import {useNavigate} from "react-router-dom";

export default function SideBar() {
    const navigate = useNavigate();
    const isDarkMode = useThemeStore((state) => state.isDarkMode);
    const toggleTheme = useThemeStore((state) => state.toggleTheme);

    const handleLink = (link: string) => {
        window.open(link, '_blank');
    };

    const handleLogo = () => {
        navigate('/');
        window.location.reload();
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
                bg-[rgb(var(--bg-opacity,255)_/_var(--tw-bg-opacity,1))]/80
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
                        {isDarkMode ? <Moon className="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7"/> :
                            <Sun className="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7"/>}
                    </button>
                </div>
            </div>
        </aside>
    );
};
