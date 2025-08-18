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
        <div className="mx-20 w-full">
            {renderContent()}
        </div>
    );
};

export default MainPage;
