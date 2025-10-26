import { Home, FolderOpen, Settings } from 'lucide-react'

const items = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'library', label: 'Library', icon: FolderOpen },
  { id: 'settings', label: 'Settings', icon: Settings },
]

export default function Sidebar({ active, onChange }) {
  return (
    <nav className="rounded-2xl border border-white/10 bg-white/5 p-3">
      <div className="mb-2 px-2 text-xs font-medium uppercase tracking-wider text-slate-400">Navigation</div>
      <ul className="space-y-1">
        {items.map((item) => {
          const Icon = item.icon
          const isActive = active === item.id
          return (
            <li key={item.id}>
              <button
                onClick={() => onChange?.(item.id)}
                className={`group flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm transition ${
                  isActive
                    ? 'bg-gradient-to-r from-rose-500/20 to-fuchsia-500/20 text-white ring-1 ring-inset ring-rose-500/30'
                    : 'text-slate-300 hover:bg-white/5 hover:text-white'
                }`}
              >
                <span className={`inline-flex h-8 w-8 items-center justify-center rounded-md border ${
                  isActive ? 'border-rose-400/40 bg-rose-400/10' : 'border-white/10 bg-white/5 group-hover:border-white/20'
                }`}>
                  <Icon className="h-4 w-4" />
                </span>
                <span>{item.label}</span>
              </button>
            </li>
          )
        })}
      </ul>

      <div className="mt-6 rounded-lg border border-white/10 bg-gradient-to-br from-slate-900 to-slate-800 p-3">
        <p className="text-xs text-slate-400">Tip</p>
        <p className="mt-1 text-sm text-slate-200">Search a video and then ask the AI to summarize, timestamp, or quiz you.</p>
      </div>
    </nav>
  )
}
