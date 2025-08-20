import PostList from "./PostList.tsx";
import {useMainContentStore} from "../../store/MainContentStore.tsx";
import About from "./About.tsx";

const MainPage = () => {
    const {isAbout} =useMainContentStore();

    const renderContent = () => {
        if (isAbout) {
            return <About/>;
        }

        return <PostList/>;
    };

    return (
        <main className="row-start-2 lg:row-start-1 lg:col-start-2 min-w-0 p-5 lg:p-0">
            {renderContent()}
        </main>
    );
};

export default MainPage;
