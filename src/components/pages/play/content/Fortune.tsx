import { useState } from "react";

const Fortune = () => {
    const [fortune, setFortune] = useState<string | null>(null);

    const pickFortune = async () => {
        try {
            const res = await fetch("/fortunes.json");
            const data = await res.json();

            // 랜덤으로 하나 뽑기
            const randomIndex = Math.floor(Math.random() * data.length);
            setFortune(data[randomIndex].fortune);
        } catch (err) {
            console.error("운세 불러오기 실패:", err);
        }
    };

    return (
        <div>
            <div className="flex flex-col items-center gap-4 p-6">
                {/*<button*/}
                {/*    onClick={pickFortune}*/}
                {/*    className="px-4 py-2 rounded-lg transition"*/}
                {/*>*/}
                {/*    오늘의 운세 뽑기*/}
                {/*</button>*/}
                {fortune ? (
                    <div className="mt-4 p-4 max-w-md text-center whitespace-pre-line">
                        {fortune}
                    </div>
                ) : (
                    <button
                        onClick={pickFortune}
                        className="px-4 py-2 rounded-lg transition"
                    >
                        오늘의 운세 뽑기
                    </button>
                )}
            </div>
        </div>
    );
};

export default Fortune;
