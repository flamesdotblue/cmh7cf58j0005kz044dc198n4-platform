import { useMemo, useState } from 'react'
import { Search, Play } from 'lucide-react'

const SAMPLE_VIDEOS = [
  { id: 'dQw4w9WgXcQ', title: 'Never Gonna Give You Up', channel: 'Rick Astley' },
  { id: '9bZkp7q19f0', title: 'GANGNAM STYLE', channel: 'PSY' },
  { id: '3JZ_D3ELwOQ', title: 'See You Again', channel: 'Wiz Khalifa' },
  { id: 'L_jWHffIx5E', title: 'Smells Like Teen Spirit', channel: 'Nirvana' },
  { id: 'fJ9rUzIMcZQ', title: 'Bohemian Rhapsody', channel: 'Queen' },
  { id: 'kJQP7kiw5Fk', title: 'Despacito', channel: 'Luis Fonsi' },
]

export default function VideoSearch({ results, onResults, selectedVideo, onSelectVideo }) {
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return SAMPLE_VIDEOS
    return SAMPLE_VIDEOS.filter(
      (v) => v.title.toLowerCase().includes(q) || v.channel.toLowerCase().includes(q)
    )
  }, [query])

  const runSearch = (e) => {
    e?.preventDefault?.()
    const out = filtered.map((v) => ({
      ...v,
      thumbnail: `https://i.ytimg.com/vi/${v.id}/hqdefault.jpg`,
      url: `https://www.youtube.com/watch?v=${v.id}`,
    }))
    onResults?.(out)
  }

  return (
    <section className="rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-5">
      <form onSubmit={runSearch} className="flex items-center gap-3">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search YouTube videos by title or channel"
            className="w-full rounded-lg border border-white/10 bg-slate-900/60 py-2.5 pl-10 pr-3 text-sm text-slate-100 placeholder:text-slate-500 focus:border-rose-400/40 focus:outline-none focus:ring-2 focus:ring-rose-400/20"
          />
        </div>
        <button
          type="submit"
          onClick={runSearch}
          className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-rose-500 to-fuchsia-500 px-4 py-2.5 text-sm font-medium text-white shadow-lg shadow-rose-500/20 transition hover:brightness-110"
        >
          <Search className="h-4 w-4" />
          Search
        </button>
      </form>

      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {(results?.length ? results : SAMPLE_VIDEOS.map((v) => ({
          ...v,
          thumbnail: `https://i.ytimg.com/vi/${v.id}/hqdefault.jpg`,
          url: `https://www.youtube.com/watch?v=${v.id}`,
        })) ).map((v) => {
          const isActive = selectedVideo?.id === v.id
          return (
            <button
              key={v.id}
              onClick={() => onSelectVideo?.(v)}
              className={`group overflow-hidden rounded-xl border p-2 text-left transition ${
                isActive
                  ? 'border-rose-400/50 bg-rose-400/5'
                  : 'border-white/10 bg-white/5 hover:border-white/20'
              }`}
            >
              <div className="relative aspect-video overflow-hidden rounded-lg">
                <img
                  src={v.thumbnail}
                  alt={v.title}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                />
                <span className="absolute bottom-2 left-2 inline-flex items-center gap-1 rounded-md bg-black/60 px-2 py-1 text-[10px] font-medium text-white">
                  <Play className="h-3 w-3" />
                  Watch
                </span>
              </div>
              <div className="mt-3 space-y-1">
                <p className="line-clamp-2 text-sm font-medium text-slate-100">{v.title}</p>
                <p className="text-xs text-slate-400">{v.channel}</p>
              </div>
            </button>
          )
        })}
      </div>
    </section>
  )
}
