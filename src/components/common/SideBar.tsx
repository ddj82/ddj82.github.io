import {useThemeStore} from "../../store/themeStore.ts";
import {ArrowLeft, Moon, Sun} from "lucide-react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faGithub} from "@fortawesome/free-brands-svg-icons";
import {useMainContentStore} from "../../store/MainContentStore.tsx";

export default function SideBar() {
    const isDarkMode = useThemeStore((state) => state.isDarkMode);
    const toggleTheme = useThemeStore((state) => state.toggleTheme);
    const {isPost, isAbout, setIsPost, setIsAbout} =useMainContentStore();

    const handleLink = (link: string) => {
        window.open(link, '_blank');
    };

    const handleAbout = () => {
        if (isAbout) {
            setIsAbout(false);
            setIsPost(false);
        } else {
            setIsAbout(true);
            setIsPost(false);
        }
    };

    return (
        // <div className="min-w-56 lg:max-w-xs lg:mb-0">
        //     <div
        //         className="flex flex-col items-center gap-4
        //         min-w-56 lg:max-w-xs lg:mb-0
        //         fixed top-10 lg:left-5 xl:left-20"
        //     >
        //         <div
        //             className="flex-center
        //             lg:text-xl lg:mb-4
        //             xl:text-xxl xl:mb-6"
        //         >
        //             <button onClick={handleAbout}>
        //                 ddj82's blog
        //             </button>
        //         </div>
        //         <div className="flex-center">
        //             <button
        //                 type="button"
        //                 onClick={() => handleLink('https://github.com/ddj82/')}
        //             >
        //                 <FontAwesomeIcon icon={faGithub} className="w-6 h-6" />
        //             </button>
        //         </div>
        //         <div className="flex-center">
        //             <button
        //                 type="button"
        //                 onClick={toggleTheme}
        //             >
        //                 {isDarkMode ? <Moon className="w-6 h-6"/> : <Sun className="w-6 h-6"/>}
        //             </button>
        //         </div>
        //         {isPost && (
        //             <div className="flex-center post-arrowLeft-btn">
        //                 <button
        //                     type="button"
        //                     onClick={() => setIsPost(false)}
        //                 >
        //                     <ArrowLeft className="w-7 h-7"/>
        //                 </button>
        //             </div>
        //         )}
        //     </div>
        // </div>
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
            lg:static lg:top-auto lg:z-auto
            lg:bg-transparent
            lg:p-0 lg:border-none
            lg:w-56 xl:w-64
            lg:flex lg:flex-col lg:items-start lg:justify-start
            `}
        >
            {/* 타이틀 (모바일: 좌측, 데스크탑: 상단) */}
            <div
                className="font-semibold tracking-tight
                text-xl
                lg:text-xxl lg:mb-6
                "
            >
                <button onClick={handleAbout}>ddj82's blog</button>
            </div>

            {/* 아이콘 영역: 모바일은 가로, 데스크탑은 세로 정렬 */}
            <div
                className="flex items-center gap-4
                lg:flex-col lg:items-start lg:gap-3
                "
            >
                <button
                    type="button"
                    onClick={() => handleLink('https://github.com/ddj82/')}
                    className="w-7 h-7"
                >
                    <FontAwesomeIcon icon={faGithub} className="w-7 h-7" />
                </button>

                <button
                    type="button"
                    onClick={toggleTheme}
                    className="w-7 h-7"
                >
                    {isDarkMode ? <Moon className="w-7 h-7" /> : <Sun className="w-7 h-7" />}
                </button>

                {isPost && (
                    <button
                        type="button"
                        onClick={() => setIsPost(false)}
                        className="lg:self-start w-7 h-7"
                    >
                        <ArrowLeft className="w-7 h-7" />
                    </button>
                )}
            </div>
        </aside>
    );
};
