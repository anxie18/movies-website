import Link from "next/link"
import { notFound } from "next/navigation"
import { getMovieByTitle } from "@/lib/movies"
import type { Metadata } from "next"
import {
  ArrowLeft,
  Star,
  Clock,
  Calendar,
  MapPin,
  User,
} from "lucide-react"

interface Props {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const movie = getMovieByTitle(decodeURIComponent(id))
  if (!movie) return { title: "未找到电影 — 经典电影时报" }
  return {
    title: `${movie.title} — 经典电影时报`,
    description: movie.summary,
  }
}

function StarRating({ rating }: { rating: number }) {
  const full = Math.round(rating / 2)
  return (
    <span className="inline-flex gap-0.5" aria-label={`${rating} out of 10`}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          size={18}
          className={i < full ? "text-ink" : "text-gray-300"}
          fill={i < full ? "currentColor" : "none"}
        />
      ))}
    </span>
  )
}

export default async function MovieDetailPage({ params }: Props) {
  const { id } = await params
  const movie = getMovieByTitle(decodeURIComponent(id))

  if (!movie) notFound()

  return (
    <div className="min-h-screen flex flex-col paper-texture">
      {/* Breaking News Ticker */}
      <div className="bg-ink text-paper overflow-hidden py-1.5 border-b-2 border-ink">
        <div className="flex items-center gap-3 max-w-[1280px] mx-auto px-3">
          <span className="shrink-0 font-[family-name:var(--font-ui)] text-xs font-bold tracking-widest uppercase text-red">
            ● Breaking
          </span>
          <div className="overflow-hidden flex-1 relative">
            <div className="ticker-anim whitespace-nowrap font-[family-name:var(--font-ui)] text-xs tracking-wide">
              正在阅读：{movie.title} · {movie.director.name} 导演作品 · {movie.rating}/10
            </div>
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="border-b border-ink">
        <div className="max-w-[1280px] mx-auto px-4 py-3 flex items-center gap-3">
          <Link
            href="/"
            className="flex items-center gap-1.5 font-[family-name:var(--font-ui)] text-xs tracking-wider uppercase text-gray-500 hover:text-red transition-colors duration-200 border border-ink px-3 py-1.5 hover:bg-ink hover:text-paper"
            aria-label="返回首页"
          >
            <ArrowLeft size={14} />
            <span>返回</span>
          </Link>
          <span className="font-[family-name:var(--font-ui)] text-[10px] tracking-[0.25em] uppercase text-gray-400 truncate">
            专题报道 · FEATURE
          </span>
        </div>
      </header>

      <main className="flex-1 max-w-[1280px] mx-auto w-full px-4 py-8">
        {/* Two-column layout */}
        <div className="flex flex-col lg:flex-row lg:gap-0">
          {/* Left column — Main content */}
          <div className="flex-1 lg:pr-8 lg:border-r border-ink">
            {/* Section label */}
            <div className="mb-4">
              <span className="font-[family-name:var(--font-ui)] text-[10px] tracking-[0.3em] uppercase text-gray-500">
                封面故事 · COVER STORY
              </span>
            </div>

            {/* Title */}
            <h1 className="font-[family-name:var(--font-heading)] text-3xl md:text-4xl lg:text-5xl font-black text-ink leading-tight">
              {movie.title}
            </h1>

            {/* Director & metadata */}
            <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 font-[family-name:var(--font-ui)] text-xs tracking-wider uppercase text-gray-500">
              <span className="flex items-center gap-1">
                <User size={12} />
                {movie.director.name}
              </span>
              <span className="w-px h-3 bg-gray-300" />
              <span className="flex items-center gap-1">
                <Calendar size={12} />
                {movie.year}
              </span>
              <span className="w-px h-3 bg-gray-300" />
              <span className="flex items-center gap-1">
                <Clock size={12} />
                {movie.duration} 分钟
              </span>
              <span className="w-px h-3 bg-gray-300" />
              <span className="flex items-center gap-1">
                <MapPin size={12} />
                {movie.region.join(" / ")}
              </span>
            </div>

            {/* Rating */}
            <div className="mt-4 flex items-center gap-3">
              <div className="flex items-center gap-1">
                <StarRating rating={movie.rating} />
              </div>
              <span className="font-mono text-lg font-bold text-red">
                {movie.rating}
              </span>
              <span className="font-[family-name:var(--font-ui)] text-[10px] tracking-wider uppercase text-gray-400">
                / 10
              </span>
            </div>

            {/* Genre tags */}
            <div className="mt-4 flex flex-wrap gap-1.5">
              {movie.genre.map((g) => (
                <span
                  key={g}
                  className="px-2 py-1 text-[10px] font-[family-name:var(--font-ui)] tracking-[0.2em] uppercase border border-ink text-ink"
                >
                  {g}
                </span>
              ))}
            </div>

            {/* Divider ornament */}
            <div className="divider-ornament my-8" />

            {/* Summary with drop cap */}
            <div className="text-base md:text-lg leading-relaxed text-ink dropcap text-justify font-[family-name:var(--font-body)]">
              {movie.summary}
            </div>


          </div>

          {/* Right column — Sidebar */}
          <aside className="lg:w-80 lg:pl-8 mt-8 lg:mt-0">
            <div className="border-2 border-ink p-5">
              <span className="font-[family-name:var(--font-ui)] text-[10px] tracking-[0.25em] uppercase text-gray-500">
                影片档案 · FILE
              </span>

              <div className="mt-4 space-y-4">
                {/* Rating detail */}
                <div>
                  <span className="font-[family-name:var(--font-ui)] text-[10px] tracking-widest uppercase text-gray-400">
                    评分
                  </span>
                  <div className="mt-1 flex items-center gap-2">
                    <span className="font-mono text-3xl font-bold text-ink">
                      {movie.rating}
                    </span>
                    <div className="flex flex-col">
                      <StarRating rating={movie.rating} />
                      <span className="font-mono text-[10px] text-gray-400 mt-0.5">
                        基于 {Math.floor(movie.rating * 1000)} 条评价
                      </span>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <span className="font-[family-name:var(--font-ui)] text-[10px] tracking-widest uppercase text-gray-400">
                    导演
                  </span>
                  <p className="mt-1 font-[family-name:var(--font-heading)] text-base font-bold text-ink">
                    {movie.director.name}
                  </p>
                  <p className="font-[family-name:var(--font-ui)] text-[10px] tracking-wider uppercase text-gray-500">
                    {movie.director.region}
                  </p>
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <span className="font-[family-name:var(--font-ui)] text-[10px] tracking-widest uppercase text-gray-400">
                    年份
                  </span>
                  <p className="mt-1 font-mono text-xl font-bold text-ink">
                    {movie.year}
                  </p>
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <span className="font-[family-name:var(--font-ui)] text-[10px] tracking-widest uppercase text-gray-400">
                    片长
                  </span>
                  <p className="mt-1 font-mono text-xl font-bold text-ink">
                    {movie.duration}
                    <span className="font-[family-name:var(--font-ui)] text-xs font-normal text-gray-500 ml-1">
                      分钟
                    </span>
                  </p>
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <span className="font-[family-name:var(--font-ui)] text-[10px] tracking-widest uppercase text-gray-400">
                    地区
                  </span>
                  <div className="mt-1 flex flex-wrap gap-1">
                    {movie.region.map((r) => (
                      <span
                        key={r}
                        className="font-[family-name:var(--font-ui)] text-xs tracking-wider text-ink"
                      >
                        {r}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <span className="font-[family-name:var(--font-ui)] text-[10px] tracking-widest uppercase text-gray-400">
                    类型
                  </span>
                  <div className="mt-1 flex flex-wrap gap-1.5">
                    {movie.genre.map((g) => (
                      <span
                        key={g}
                        className="px-2 py-0.5 text-[10px] font-[family-name:var(--font-ui)] tracking-[0.15em] uppercase border border-ink text-ink"
                      >
                        {g}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Back button */}
            <div className="mt-6">
              <Link
                href="/"
                className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-ink text-paper font-[family-name:var(--font-ui)] text-xs tracking-widest uppercase hover:bg-gray-800 transition-colors duration-200"
              >
                <ArrowLeft size={14} />
                <span>返回电影列表</span>
              </Link>
            </div>
          </aside>
        </div>

        {/* Bottom ornament */}
        <div className="divider-ornament mt-12" />
      </main>

      {/* Footer */}
      <footer className="border-t-2 border-ink mt-auto">
        <div className="max-w-[1280px] mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <div>
              <p className="font-[family-name:var(--font-heading)] text-lg font-bold text-ink">
                Classic Movie Times
              </p>
              <p className="font-[family-name:var(--font-ui)] text-[10px] tracking-[0.2em] uppercase text-gray-500 mt-0.5">
                经典电影时报 · 创刊于2024年
              </p>
            </div>
            <div className="font-[family-name:var(--font-ui)] text-[10px] tracking-wider uppercase text-gray-500 leading-relaxed">
              <p>Vol. XLII No. 42</p>
              <p>© {new Date().getFullYear()} Classic Movie Times.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
