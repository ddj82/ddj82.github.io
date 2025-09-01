import {useParams} from "react-router-dom";
import Fortune from "./content/Fortune";
import Blocks from "./content/Blocks.tsx";

const PlayContent = () => {
    const { content } = useParams<{ content: string }>();

    if (!content) {
        return <div>해당 게임을 찾을 수 없습니다.</div>;
    }

    const renderContent = () => {
        if (content === "fortune") {
            return <Fortune/>;
        } else if (content === "blocks") {
            return <Blocks/>;
        } else {
            return <p>개발 준비 중입니다!</p>;
        }
    };

    return (
        <div>
            {renderContent()}
        </div>
    );
};

export default PlayContent;
