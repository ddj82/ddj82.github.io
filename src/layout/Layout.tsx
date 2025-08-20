import { Outlet } from "react-router-dom";
import SideBar from "../components/common/SideBar.tsx";

const Layout = () => {
    return (
        <div
            className="
              mx-auto max-w-screen-xl
              grid grid-rows-[auto,1fr] lg:grid-rows-1
              lg:grid-cols-[auto,1fr]
              lg:p-10 xl:px-20
            "
        >
            <SideBar/>
            <main className="row-start-2 lg:row-start-1 lg:col-start-2 min-w-0 p-5 lg:p-0">
                <Outlet/>
            </main>
        </div>
    );
};

export default Layout;
