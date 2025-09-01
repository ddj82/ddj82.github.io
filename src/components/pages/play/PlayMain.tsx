import PlayContentCard from "./PlayContentCard.tsx";

const playList = [
    {
        link: "fortune",
        thumbnail: "/thumbnail/fortune.png",
        title: "오늘의 운세",
        summary: "오늘의 운세를 뽑아보자!",
    },

    // {
    //     link: "blocks",
    //     thumbnail: "/thumbnail/blocks2.png",
    //     title: "블록 스택",
    //     summary: "떨어지는 블록 쌓기",
    // },
    {
        link: "coming",
        thumbnail: "/thumbnail/coming.png",
        title: "준비 중",
        summary: "준비 중",
    },
];

const PlayMain = () => {
    return (
        <div className="">
            <header className="text-xxl font-bold mb-4">
                오락실
            </header>
            <div className="lg:p-2">
                <div className="grid gap-4 lg:grid-cols-2">
                    {playList.map(item => (
                        <PlayContentCard key={item.link} {...item} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PlayMain;
