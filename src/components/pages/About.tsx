import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimes} from "@fortawesome/free-solid-svg-icons";
import {useMainContentStore} from "../../store/MainContentStore.tsx";

const About = () => {
    const {toggleIsAbout} =useMainContentStore();

    return (
        <div>
            <div className="flex flex-col gap-4 pb-20">
                <div className="flex items-center justify-end">
                    <button
                        className="p-2 rounded-full"
                        onClick={toggleIsAbout}
                    >
                        <FontAwesomeIcon icon={faTimes} className="text-lg"/>
                    </button>
                </div>
            </div>
            <div>
                안녕하세요 김동준입니다.
            </div>
        </div>
    );
};

export default About;
