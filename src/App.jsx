import { useState } from 'react'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import VideoSearch from './components/VideoSearch'
import Chat from './components/Chat'

export default function App() {
  const [activeNav, setActiveNav] = useState('home')
  const [searchResults, setSearchResults] = useState([])
  const [selectedVideo, setSelectedVideo] = useState(null)
  const [messages, setMessages] = useState([
    { role: 'assistant', content: "Hi! I'm your YouTube AI copilot. Search a video and ask me anything about it." },
  ])

  const handleSendMessage = async (text) => {
    if (!text.trim()) return

    const userMsg = { role: 'user', content: text.trim() }
    setMessages((prev) => [...prev, userMsg])

    // Simple simulated AI response (client-only). In a real app, call your backend/LLM here.
    const context = selectedVideo
      ? `about "${selectedVideo.title}" by ${selectedVideo.channel}`
      : 'about the video you have in mind'

    const response =
      `Here’s a helpful summary ${context}:
- Key ideas: engagement, pacing, and clarity.
- What you can ask me: explain a section, generate a study guide, create timestamps, or draft a social post.
If you select a specific video, I can tailor answers with more precision.`

    // Simulate latency for better UX
    await new Promise((r) => setTimeout(r, 500))
    setMessages((prev) => [...prev, { role: 'assistant', content: response }])
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900 text-slate-100">
      <Header />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-6 py-6">
          <aside className="lg:sticky lg:top-4 lg:h-[calc(100vh-6rem)]">
            <Sidebar active={activeNav} onChange={setActiveNav} />
          </aside>

          <main className="space-y-6">
            <VideoSearch
              results={searchResults}
              onResults={setSearchResults}
              selectedVideo={selectedVideo}
              onSelectVideo={setSelectedVideo}
            />

            <Chat
              selectedVideo={selectedVideo}
              messages={messages}
              onSendMessage={handleSendMessage}
            />
          </main>
        </div>
      </div>
    </div>
  )
}
