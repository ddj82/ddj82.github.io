import {type PostItem, posts} from '../../types/markdown';
import {useNavigate} from "react-router-dom";

export default function PostList() {
    const navigate = useNavigate();

    const handlePostOpen = (post: PostItem) => {
        navigate(`/posts/${post.slug}`);
    };

    return (
        <ul className="flex flex-col gap-2">
            {posts.map(p => (
                <li key={p.slug} className="flex flex-col gap-2">
                    <div className="w-full">
                        <button
                            type="button"
                            onClick={() => handlePostOpen(p)}
                            className="w-full"
                        >
                            <div className="text-start sm:text-lg font-semibold">
                                {p.frontmatter.title}
                            </div>
                        </button>
                    </div>
                    <div className="flex flex-col gap-2 md:flex-row md:gap-0 md:justify-between">
                        <div className="text-xs md:text-sm">
                            {p.frontmatter.date}
                        </div>
                        <div className="flex gap-1">
                            {p.frontmatter.categories?.map((value, index) => (
                                <span
                                    key={index}
                                    className="bg-codeBlockLight dark:bg-gray-700 rounded-lg
                                        p-1 px-2
                                        text-xxs sm:text-xs md:text-sm w-fit"
                                >
                                    {value}
                                </span>
                            ))}
                        </div>
                    </div>
                    <hr/>
                </li>
            ))}
        </ul>
    );
};
