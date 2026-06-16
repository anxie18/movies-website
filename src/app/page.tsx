"use client"

import { useState, useMemo, useRef, useEffect } from "react"
import Link from "next/link"
import { searchMovies } from "@/lib/movies"
import type { Movie } from "@/types/movie"
import {
  Search,
  Star,
  Clock,
  ChevronRight,
  Menu,
  X,
  Film,
} from "lucide-react"

const today = new Date()
const dateStr = today.toLocaleDateString("en-US", {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
})

const tickerItems = [
  "🎬 本周经典：《肖申克的救赎》以 9.7 分稳居榜首",
  "⭐ 诺兰新作《奥德赛》即将上映",
  "📽️ 宫崎骏经典《千与千寻》重映票房破亿",
  "🏆 《霸王别姬》入选世界影史百大",
  "🎞️ 经典重映季：每周五晚七点放映一部时代杰作",
]

function StarRating({ rating }: { rating: number }) {
  const full = Math.round(rating / 2)
  return (
    <span className="inline-flex gap-0.5" aria-label={`${rating} out of 10`}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          size={14}
          className={i < full ? "text-ink" : "text-gray-300"}
          fill={i < full ? "currentColor" : "none"}
        />
      ))}
    </span>
  )
}

function MovieCard({ movie, index }: { movie: Movie; index: number }) {
  return (
    <Link
      href={`/movies/${encodeURIComponent(movie.title)}`}
      className="group block border-r border-b border-ink p-4 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[4px_4px_0_0_#111111] bg-paper"
    >
      <div className="flex items-start justify-between gap-2">
        <h2 className="font-[family-name:var(--font-heading)] text-lg font-bold text-ink leading-tight group-hover:text-red transition-colors duration-200">
          {movie.title}
        </h2>
        <span className="shrink-0 font-mono text-sm font-bold text-red">
          {movie.rating}
        </span>
      </div>
      <div className="mt-1.5 flex items-center gap-2 text-xs text-gray-500 font-[family-name:var(--font-ui)] tracking-wider uppercase">
        <span>{movie.year}</span>
        <span className="w-px h-3 bg-gray-300" />
        <span>{movie.director.name}</span>
        <span className="w-px h-3 bg-gray-300" />
        <span>{movie.duration}min</span>
      </div>
      <div className="mt-2">
        <StarRating rating={movie.rating} />
      </div>
      <div className="mt-2.5 flex flex-wrap gap-1">
        {movie.genre.map((g) => (
          <span
            key={g}
            className="px-1.5 py-0.5 text-[10px] font-[family-name:var(--font-ui)] tracking-widest uppercase border border-ink text-ink bg-paper"
          >
            {g}
          </span>
        ))}
      </div>
    </Link>
  )
}

export default function HomePage() {
  const [query, setQuery] = useState("")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const results = useMemo(() => searchMovies(query), [query])

  const midIndex = Math.ceil(results.length / 2)
  const topHalf = results.slice(0, midIndex)
  const bottomHalf = results.slice(midIndex)

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault()
        inputRef.current?.focus()
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

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
              {tickerItems.join("   ✦   ")}   ✦   欢迎阅读经典电影时报
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Hamburger */}
      <div className="md:hidden border-b border-ink">
        <div className="flex items-center justify-between px-3 py-2">
          <span className="font-[family-name:var(--font-heading)] text-sm font-bold tracking-wider">
            CLASSIC MOVIE TIMES
          </span>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 border border-ink hover:bg-ink hover:text-paper transition-colors duration-200"
            aria-label={mobileMenuOpen ? "关闭菜单" : "打开菜单"}
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Masthead */}
      <header className="border-b-2 border-ink">
        <div className="max-w-[1280px] mx-auto px-4 py-5 md:py-7 text-center">
          <div className="flex items-center justify-center gap-2 md:gap-3 mb-2">
            <span className="hidden sm:block w-12 h-px bg-gray-300" />
            <span className="font-[family-name:var(--font-ui)] text-[10px] md:text-xs tracking-[0.3em] uppercase text-gray-500">
              经典电影时报
            </span>
            <span className="hidden sm:block w-12 h-px bg-gray-300" />
          </div>
          <h1 className="font-[family-name:var(--font-heading)] text-3xl md:text-5xl lg:text-6xl font-black text-ink leading-none tracking-tight">
            Classic Movie Times
          </h1>
          <div className="flex items-center justify-center gap-2 md:gap-4 mt-3 font-[family-name:var(--font-ui)] text-[10px] md:text-xs tracking-wider uppercase text-gray-500">
            <span>No. 42</span>
            <span className="w-px h-3 bg-gray-300" />
            <span>{dateStr}</span>
            <span className="w-px h-3 bg-gray-300" />
            <span>Free Edition</span>
          </div>
        </div>
      </header>

      {/* Search Section */}
      <section className="border-b border-ink">
        <div className="max-w-[1280px] mx-auto px-4 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <span className="font-[family-name:var(--font-ui)] text-[10px] tracking-[0.25em] uppercase text-gray-500 shrink-0">
              分类检索 · CLASSIFIEDS
            </span>
            <div className="relative flex-1 max-w-md">
              <Search
                size={16}
                className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="搜索片名、导演、类型…"
                className="w-full pl-6 pr-2 py-2 bg-transparent border-b border-ink text-ink font-[family-name:var(--font-ui)] text-sm placeholder:text-gray-400 focus:outline-none focus:border-red transition-colors duration-200"
                aria-label="搜索电影"
              />
            </div>
            <span className="font-mono text-xs text-gray-400">
              {results.length} films
            </span>
          </div>
        </div>
      </section>

      {/* Movie Listing */}
      <main className="flex-1 max-w-[1280px] mx-auto w-full">
        {results.length > 0 ? (
          <>
            {/* Top Half — 3 columns on desktop, 2 on tablet, 1 on mobile */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 border-t border-ink">
              {topHalf.map((movie, i) => (
                <MovieCard key={movie.title} movie={movie} index={i} />
              ))}
              {/* Remove right border on last column */}
              {Array.from({ length: 3 - (topHalf.length % 3 || 3) }).map(
                (_, i) => (
                  <div key={`spacer-${i}`} className="hidden lg:block border-r border-ink" />
                )
              )}
            </div>

            {/* Black Inverted Section */}
            <section className="bg-ink text-paper border-y-2 border-ink">
              <div className="max-w-[1280px] mx-auto px-4 py-6 md:py-8">
                <div className="flex items-center gap-2 mb-3">
                  <Film size={16} className="text-red" />
                  <span className="font-[family-name:var(--font-ui)] text-[10px] tracking-[0.25em] uppercase text-red">
                    编辑推荐 · EDITOR&apos;S PICK
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0 border-t border-gray-700">
                  {results.slice(0, 3).map((movie) => (
                    <Link
                      key={movie.title}
                      href={`/movies/${encodeURIComponent(movie.title)}`}
                      className="block border-r-0 sm:border-r border-b sm:border-b-0 border-gray-700 p-4 transition-all duration-200 hover:bg-gray-800"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-[family-name:var(--font-heading)] text-base font-bold text-paper leading-tight hover:text-red transition-colors duration-200">
                          {movie.title}
                        </h3>
                        <span className="shrink-0 font-mono text-sm text-red font-bold">
                          {movie.rating}
                        </span>
                      </div>
                      <div className="mt-1.5 font-[family-name:var(--font-ui)] text-[11px] tracking-wider uppercase text-gray-400">
                        {movie.year} · {movie.director.name}
                      </div>
                      <div className="mt-2 font-[family-name:var(--font-body)] text-xs text-gray-300 leading-relaxed line-clamp-2">
                        {movie.summary}
                      </div>
                      <div className="mt-2 flex items-center gap-1 text-xs text-red font-[family-name:var(--font-ui)] tracking-wider">
                        <span>阅读全文</span>
                        <ChevronRight size={12} />
                      </div>
                    </Link>
                  ))}
                  {/* Remove right border on last */}
                  {Array.from({ length: 3 - (Math.min(3, results.length) % 3 || 3) }).map(
                    (_, i) => (
                      <div key={`black-spacer-${i}`} className="hidden lg:block border-r border-gray-700" />
                    )
                  )}
                </div>
              </div>
            </section>

            {/* Bottom Half */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {/* Section label spanning full width */}
              <div className="col-span-full border-b border-ink px-4 py-2">
                <span className="font-[family-name:var(--font-ui)] text-[10px] tracking-[0.25em] uppercase text-gray-500">
                  更多推荐 · MORE REVIEWS
                </span>
              </div>
              {bottomHalf.map((movie, i) => (
                <MovieCard key={movie.title} movie={movie} index={i + midIndex} />
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-24 border-t border-ink">
            <Search size={32} className="mx-auto text-gray-300 mb-4" />
            <p className="font-[family-name:var(--font-body)] text-lg text-gray-500">
              未找到匹配 &ldquo;{query}&rdquo; 的电影
            </p>
            <button
              onClick={() => setQuery("")}
              className="mt-4 px-4 py-2 bg-ink text-paper font-[family-name:var(--font-ui)] text-xs tracking-widest uppercase hover:bg-gray-800 transition-colors duration-200"
            >
              清除搜索
            </button>
          </div>
        )}
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
              <p>© {today.getFullYear()} Classic Movie Times. All Rights Reserved.</p>
              <p>Printed on recycled paper — please read and share</p>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-200 text-center font-[family-name:var(--font-ui)] text-[9px] tracking-widest uppercase text-gray-400">
            <span className="divider-ornament" />
            <p>数据来源：经典电影数据库 · 本站点仅供学习交流使用</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
