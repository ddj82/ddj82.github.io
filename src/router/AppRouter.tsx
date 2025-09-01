import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import About from "../components/pages/About.tsx";
import Layout from "../layout/Layout.tsx";
import PostList from "../components/pages/PostList.tsx";
import Post from "../components/pages/Post.tsx";
import PlayMain from "../components/pages/play/PlayMain.tsx";
import PlayContent from "../components/pages/play/PlayContent.tsx";


const AppRouter = () => {
    return (
        <Router>
            <Routes>
                <Route element={<Layout />}>
                    <Route path="/" element={<PostList/>} />
                    <Route path="/posts/:slug" element={<Post/>} />
                    <Route path="/about" element={<About/>} />
                    <Route path="/play" element={<PlayMain/>} />
                    <Route path="/play/:content" element={<PlayContent/>} />
                </Route>
            </Routes>
        </Router>
    );
};

export default AppRouter;
