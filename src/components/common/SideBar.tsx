import {useThemeStore} from "../../store/themeStore.ts";
import {Moon, Sun} from "lucide-react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faGithub} from "@fortawesome/free-brands-svg-icons";
import {useMainContentStore} from "../../store/MainContentStore.tsx";

export default function SideBar() {
    const isDarkMode = useThemeStore((state) => state.isDarkMode);
    const toggleTheme = useThemeStore((state) => state.toggleTheme);
    const {toggleIsAbout} =useMainContentStore();

    const handleLink = (link: string) => {
        window.open(link, '_blank');
    };

    return (
        <div className="z-[10005] min-w-56 max-w-xs flex flex-col items-center gap-4">
            <div className="flex-center">
                <button onClick={toggleIsAbout}>
                    김동준
                </button>
            </div>
            <div className="flex-center">
                <button type="button" onClick={() => handleLink('https://github.com/ddj82/')}>
                    <FontAwesomeIcon icon={faGithub} className="w-6 h-6" />
                </button>
            </div>
            <div className="flex-center">
                <button type="button" onClick={toggleTheme} className="">
                    {isDarkMode ? <Moon className="w-6 h-6"/> : <Sun className="w-6 h-6"/>}
                </button>
            </div>
        </div>
    );
};
