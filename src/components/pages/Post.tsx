import {type PostItem} from '../../types/markdown';
import { MarkdownHooks } from 'react-markdown';
import remarkGfm from 'remark-gfm';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimes} from "@fortawesome/free-solid-svg-icons";
import rehypePrettyCode from 'rehype-pretty-code';
import { prettyCodeOptions } from '../../lib/prettyCodeOptions';

interface PostProps {
    post: PostItem;
    onClose: () => void;
}

const Post = ({post, onClose}: PostProps) => {

    if (!post) return <div>Not found</div>;

    return (
        <div>
            <div className="flex flex-col gap-4 pb-20">
                <div className="flex items-center justify-between">
                    <div className="w-full text-lg md:text-xxl font-semibold">
                        {post.frontmatter.title}
                    </div>
                    <button
                        className="p-2 rounded-full"
                        onClick={onClose}
                    >
                        <FontAwesomeIcon icon={faTimes} className="text-lg"/>
                    </button>
                </div>
                <div className="flex justify-between pb-2 border-b border-gray-400">
                    <div className="text-xs md:text-sm">
                        {post.frontmatter.date}
                    </div>
                    <div className="flex gap-2">
                        {post.frontmatter.categories?.map((value, index) => (
                            <div key={index} className="bg-codeBlockLight dark:bg-gray-700 p-1 px-2 rounded-lg text-xs md:text-sm">
                                {value}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <article className="prose max-w-none dark:prose-invert">
                <MarkdownHooks
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[[rehypePrettyCode, prettyCodeOptions]]}
                    components={{
                        pre: (props) => (
                            <pre {...props} className="rounded-lg overflow-auto my-4" />
                        ),
                        code: (props) => <code {...props} />
                    }}
                >
                    {post.content}
                </MarkdownHooks>
            </article>
        </div>
    );
};

export default Post;
