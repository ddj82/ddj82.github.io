import {type PostItem, posts} from '../../lib/markdown.ts';
import {useNavigate} from "react-router-dom";
import {useState} from "react";

export default function PostList() {
    const navigate = useNavigate();

    // 페이지네이션 상태
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 10; // 페이지당 게시글 수

    // 현재 페이지에 표시할 게시글 계산
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

    // 전체 페이지 수 계산
    const totalPages = Math.ceil(posts.length / postsPerPage);

    // 페이지 변경 함수
    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
        window.scrollTo({ top: 0, behavior: 'smooth' }); // 페이지 변경시 스크롤 맨 위로
    };

    const handlePostOpen = (post: PostItem) => {
        navigate(`/posts/${post.slug}`);
    };

    return (
        <div>
            <ul className="flex flex-col gap-2">
                {currentPosts.map(p => (
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

            {totalPages > 1 && (
                <div className="flex justify-center gap-2 mt-4">
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="px-3 py-1 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        이전
                    </button>

                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                        <button
                            key={page}
                            onClick={() => handlePageChange(page)}
                            className={`px-3 py-1 rounded-lg
                                ${currentPage === page && 'bg-codeBlockLight dark:bg-gray-700'}`}
                        >
                            {page}
                        </button>
                    ))}

                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="px-3 py-1 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        다음
                    </button>
                </div>
            )}
        </div>
    );
};
