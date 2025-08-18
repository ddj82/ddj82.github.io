import {type PostItem, posts} from '../../types/markdown';
import {useState} from "react";
import Post from "./Post.tsx";

export default function PostList() {
    const [selectedPost, setSelectedPost] = useState(false);
    const [post, setPost] = useState<PostItem | null>(null);

    const handlePostOpen = (post: PostItem) => {
        setPost(post);
        setSelectedPost(true);
    };

    return (
        <div>
            {selectedPost ? (
                <Post post={post!} onClose={() => setSelectedPost(false)}/>
            ) : (
                <ul className="flex flex-col gap-6">
                    {posts.map(p => (
                        <li key={p.slug} className="flex flex-col gap-2 pb-2 border-b border-gray-400">
                            <div className="w-full">
                                <button type="button" onClick={() => handlePostOpen(p)} className="w-full">
                                    <div className="flex text-lg font-semibold">
                                        {p.frontmatter.title}
                                    </div>
                                </button>
                            </div>
                            <div className="flex justify-between">
                                <div>
                                    {p.frontmatter.date}
                                </div>
                                <div className="flex gap-2">
                                    {p.frontmatter.categories?.map((value, index) => (
                                        <div key={index} className="bg-codeBlockLight dark:bg-gray-700 p-1 px-2 rounded-lg">
                                            {value}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};
