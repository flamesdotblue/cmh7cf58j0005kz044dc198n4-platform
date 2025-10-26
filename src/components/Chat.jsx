import { useEffect, useRef, useState } from 'react'
import { Bot, Send, User } from 'lucide-react'

export default function Chat({ selectedVideo, messages, onSendMessage }) {
  const [input, setInput] = useState('')
  const endRef = useRef(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const submit = (e) => {
    e.preventDefault()
    if (!input.trim()) return
    onSendMessage?.(input)
    setInput('')
  }

  return (
    <section className="rounded-2xl border border-white/10 bg-white/5">
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
        <div>
          <p className="text-sm font-semibold text-slate-100">AI Chat</p>
          <p className="text-xs text-slate-400">
            {selectedVideo ? (
              <>
                Context: <span className="text-slate-200">{selectedVideo.title}</span> • {selectedVideo.channel}
              </>
            ) : (
              'No video selected — results are more generic until you pick one.'
            )}
          </p>
        </div>
      </div>

      <div className="max-h-[46vh] overflow-y-auto px-4 py-4 sm:px-5">
        <ul className="space-y-4">
          {messages.map((m, idx) => (
            <li key={idx} className={`flex items-start gap-3 ${m.role === 'user' ? 'justify-end' : ''}`}>
              {m.role === 'assistant' && (
                <div className="mt-0.5 inline-flex h-8 w-8 items-center justify-center rounded-md bg-gradient-to-br from-rose-500 to-fuchsia-500">
                  <Bot className="h-4 w-4 text-white" />
                </div>
              )}

              <div className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                m.role === 'user'
                  ? 'bg-rose-500/20 text-rose-50 ring-1 ring-inset ring-rose-400/30'
                  : 'bg-white/5 text-slate-100 ring-1 ring-inset ring-white/10'
              }`}>{m.content}</div>

              {m.role === 'user' && (
                <div className="mt-0.5 inline-flex h-8 w-8 items-center justify-center rounded-md border border-white/10 bg-white/5">
                  <User className="h-4 w-4 text-slate-200" />
                </div>
              )}
            </li>
          ))}
          <div ref={endRef} />
        </ul>
      </div>

      <form onSubmit={submit} className="flex items-center gap-2 border-t border-white/10 p-3">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={selectedVideo ? 'Ask about this video…' : 'Ask a question…'}
          className="flex-1 rounded-lg border border-white/10 bg-slate-900/60 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:border-rose-400/40 focus:outline-none focus:ring-2 focus:ring-rose-400/20"
        />
        <button
          type="submit"
          className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-rose-500 to-fuchsia-500 px-4 py-2 text-sm font-medium text-white shadow-lg shadow-rose-500/20 transition hover:brightness-110"
        >
          <Send className="h-4 w-4" />
          Send
        </button>
      </form>
    </section>
  )
}
