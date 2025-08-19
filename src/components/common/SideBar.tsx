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
        <div className="min-w-56 lg:max-w-xs flex flex-col items-center gap-4 mb-8 lg:mb-0">
            <div className="flex-center">
                <button onClick={handleAbout}>
                    ddj82's blog
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
            {isPost && (
                <div className="flex-center">
                    <button type="button" onClick={() => setIsPost(false)}>
                        <ArrowLeft className="w-7 h-7"/>
                    </button>
                </div>
            )}
        </div>
    );
};
