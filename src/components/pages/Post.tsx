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

    if (!post) return <div>해당 글을 찾을 수 없습니다.</div>;

    return (
        <div>
            <div className="flex flex-col gap-4 pb-10">
                <div className="flex items-center justify-between">
                    <div className="w-full sm:text-lg lg:text-xl xl:text-xxl font-semibold">
                        {post.frontmatter.title}
                    </div>
                    <button
                        className="p-2 rounded-full hidden lg:block"
                        onClick={onClose}
                    >
                        <FontAwesomeIcon icon={faTimes} className="text-xxl"/>
                    </button>
                </div>
                <div className="flex flex-col gap-2 md:flex-row md:gap-0 md:justify-between">
                    <div className="text-sm md:text-base">
                        {post.frontmatter.date}
                    </div>
                    <div className="flex gap-1">
                        {post.frontmatter.categories?.map((value, index) => (
                            <div
                                key={index}
                                className="bg-codeBlockLight dark:bg-gray-700 rounded-lg
                                p-1 px-2
                                text-xxs sm:text-xs md:text-sm w-fit"
                            >
                                {value}
                            </div>
                        ))}
                    </div>
                </div>
                <hr/>
            </div>

            <div>
                <article className="prose max-w-none dark:prose-invert">
                    <MarkdownHooks
                        remarkPlugins={[remarkGfm]}
                        rehypePlugins={[[rehypePrettyCode, prettyCodeOptions]]}
                        components={{
                            pre: (props) => (
                                <pre {...props} className="rounded-lg overflow-auto my-4" />
                            ),
                            code: (props) => <code {...props} />,
                            table: (props) => (
                                // ✅ 스크롤이 걸릴 컨테이너
                                <div className="not-prose overflow-x-auto sm:mx-0 w-full max-w-full">
                                    {/* ✅ 표는 내용에 맞춰 넓어지도록 */}
                                    <table
                                        {...props}
                                        className="w-max min-w-[48rem] table-auto border-collapse"
                                    />
                                </div>
                            ),
                            thead: (p) => <thead {...p} />,
                            th: (p) => <th {...p} className="px-3 py-2 whitespace-nowrap border-b text-left" />,
                            td: (p) => <td {...p} className="px-3 py-2 border-b align-top break-words" />,
                        }}
                    >
                        {post.content}
                    </MarkdownHooks>
                </article>
            </div>
        </div>
    );
};

export default Post;
