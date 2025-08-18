import {useThemeStore} from "./store/themeStore.ts";
import {useEffect} from "react";
import MainPage from "./components/pages/MainPage.tsx";
import SideBar from "./components/common/SideBar.tsx";

function App() {
    const isDarkMode = useThemeStore((state) => state.isDarkMode);

    // ✅ App 시작 시 최초 1번만 실행되도록
    useEffect(() => {
        document.documentElement.classList.toggle("dark", isDarkMode);
    }, []);

    // ✅ 상태 변경 시도할 때도 실행
    useEffect(() => {
        const classList = document.documentElement.classList;
        if (isDarkMode) {
            classList.add("dark");
        } else {
            classList.remove("dark");
        }
    }, [isDarkMode]);

    return (
        <div className="min-h-screen transition-colors scrollbar-hidden relative flex p-20 themeMainSet">
            <SideBar/>
            <MainPage/>
        </div>
    )
}

export default App
