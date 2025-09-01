interface PlayContentCardProps {
    link: string;
    thumbnail: string;
    title: string;
    summary: string;
}

const PlayContentCard = ({ link, thumbnail, title, summary }: PlayContentCardProps) => {
    return (
        <div>
            <a
                href={`/play/${link}`}
                className="flex flex-col gap-2 rounded-xl border p-3 hover:shadow-md transition"
            >
                <header className="w-full h-52 overflow-hidden rounded-md">
                    <img
                        src={thumbnail}
                        alt={title}
                        className="w-full h-full object-cover"
                    />
                </header>
                <h3 className="text-lg font-semibold">{title}</h3>
                <p className="text-xs">{summary}</p>
            </a>
        </div>
    );
};

export default PlayContentCard;
