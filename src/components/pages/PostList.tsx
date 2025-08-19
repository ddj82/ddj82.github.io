import {type PostItem, posts} from '../../types/markdown';
import {useState} from "react";
import Post from "./Post.tsx";
import {useMainContentStore} from "../../store/MainContentStore.tsx";

export default function PostList() {
    const {isPost, setIsPost} =useMainContentStore();
    const [post, setPost] = useState<PostItem | null>(null);

    const handlePostOpen = (post: PostItem) => {
        setPost(post);
        setIsPost(true);
    };

    return (
        <div>
            {isPost ? (
                <div>
                    {post && (<Post post={post} onClose={() => setIsPost(false)}/>)}
                </div>
            ) : (
                <ul className="flex flex-col gap-2">
                    {posts.map(p => (
                        <li key={p.slug} className="flex flex-col gap-2">
                            <div className="w-full">
                                <button type="button" onClick={() => handlePostOpen(p)} className="w-full">
                                    <div className="flex justify-start text-lg font-semibold">
                                        {p.frontmatter.title}
                                    </div>
                                </button>
                            </div>
                            <div className="flex flex-col gap-2 md:flex-row md:gap-0 md:justify-between">
                                <div className="text-xs md:text-sm">
                                    {p.frontmatter.date}
                                </div>
                                <div className="flex gap-2">
                                    {p.frontmatter.categories?.map((value, index) => (
                                        <div key={index}
                                             className="bg-codeBlockLight dark:bg-gray-700 p-1 px-2 rounded-lg text-xs md:text-sm">
                                            {value}
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <hr/>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};
