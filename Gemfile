source "https://rubygems.org"

gem "jekyll", "~> 4.4.1"

gem "minima", "~> 2.5"

# Jekyll 플러그인
gem "jekyll-remote-theme"  # 원격 테마 사용
gem "jekyll-sitemap"       # SEO 최적화 (사이트맵 생성)
gem "jekyll-seo-tag"       # SEO 메타 태그 추가
gem "jekyll-paginate"      # 페이지네이션 지원
gem "jekyll-archives"      # 블로그 아카이브 기능
gem "webrick"              # Windows에서 Jekyll 실행 시 필요

# jekyll-feed은 group 내에서 한 번만 선언됨 (문제 없음)
group :jekyll_plugins do
  gem "jekyll-feed", "~> 0.12"
end

# Windows 및 JRuby 관련 설정
platforms :mingw, :x64_mingw, :mswin, :jruby do
  gem "tzinfo", ">= 1", "< 3"
  gem "tzinfo-data"
end

# Windows에서 파일 감지 성능 향상
gem "wdm", "~> 0.1", :platforms => [:mingw, :x64_mingw, :mswin]

# JRuby에서 `http_parser.rb` 버전 고정
gem "http_parser.rb", "~> 0.6.0", :platforms => [:jruby]