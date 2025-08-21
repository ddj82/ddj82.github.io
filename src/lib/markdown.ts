import YAML from 'yaml';

// 모든 md를 문자열로 불러오기
const modules = import.meta.glob('../posts/**/*.md', {
    query: '?raw',
    import: 'default',
    eager: true,
}) as Record<string, string>;

export type PostFrontmatter = {
    title: string;
    date: string; // 'YYYY-MM-DD' 문자열 유지 권장
    categories?: string[];
};

export type PostItem = {
    slug: string; // 예: '2025-04-20-my-blog-01'
    path: string; // 파일 경로
    content: string; // 프론트매터 제거된 본문
    frontmatter: PostFrontmatter;
    // 옵션) 썸네일/요약 등 확장 필드도 여기에 추가 가능
};

// ---프론트매터--- 본문 구조를 분리하는 정규식
const FM_REGEX = /^---\s*[\r\n]+([\s\S]*?)\s*---\s*[\r\n]?([\s\S]*)$/;

function parseFrontmatter(raw: string): { data: any; content: string } {
    const m = raw.match(FM_REGEX);
    if (!m) return { data: {}, content: raw };
    try {
        const data = YAML.parse(m[1]) ?? {};
        const content = m[2] ?? '';
        return { data, content };
    } catch (e) {
        console.error('YAML parse error:', e);
        return { data: {}, content: raw };
    }
}

export const posts: PostItem[] =
    Object.entries(modules).map(([path, raw]) => {
        // 프론트매터/본문 분리
        const { data, content } = parseFrontmatter(raw);

        // slug 생성: '../post/2025-04-20-my-blog-01.md' -> '2025-04-20-my-blog-01'
        const slug = path.split('/posts/')[1].replace(/\.md$/, '');

        // categories 정규화: 문자열이면 배열로
        const categories = Array.isArray(data.categories)
            ? data.categories
            : data.categories
                ? [String(data.categories)]
                : [];

        // date는 문자열 유지
        const date =
            typeof data.date === 'string'
                ? data.date
                : data.date instanceof Date
                    ? data.date.toISOString().slice(0, 10)
                    : '';

        const frontmatter: PostFrontmatter = {
            title: data.title ?? slug,
            date,
            categories,
        };

        return { slug, path, content, frontmatter };
    }).sort((a, b) => {
        const d = b.frontmatter.date.localeCompare(a.frontmatter.date); // 'YYYY-MM-DD' 문자열은 사전식=시간순
        if (d !== 0) return d;
        return b.slug.localeCompare(a.slug, undefined, { numeric: true, sensitivity: 'base' });
    });

;