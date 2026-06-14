import { useState, useRef, useEffect } from 'react'
import { sendGeminiMessage, isGeminiConfigured } from '../lib/gemini'

export default function AIAssistant({ contextData = '' }) {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Hey! I'm your AI assistant powered by Gemini 🤖. I can help you:\n\n• Write project descriptions\n• Draft professional bio text\n• Suggest portfolio improvements\n• Generate content for your portfolio\n\nWhat would you like help with?",
    }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef(null)
  const textareaRef = useRef(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSend = async () => {
    if (!input.trim() || loading) return
    if (!isGeminiConfigured) {
      setMessages(prev => [...prev, {
        role: 'user', content: input
      }, {
        role: 'assistant',
        content: '⚠️ Gemini API key not configured. Please add VITE_GEMINI_API_KEY to your .env file and restart the dev server.'
      }])
      setInput('')
      return
    }

    const userMessage = input.trim()
    setInput('')
    setMessages(prev => [...prev, { role: 'user', content: userMessage }])
    setLoading(true)

    try {
      const history = messages
        .filter(m => m.role !== 'system')
        .map(m => ({ role: m.role === 'assistant' ? 'model' : 'user', content: m.content }))

      const response = await sendGeminiMessage(userMessage, history, contextData)
      setMessages(prev => [...prev, { role: 'assistant', content: response }])
    } catch (err) {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: `❌ Error: ${err.message}`
      }])
    } finally {
      setLoading(false)
    }
  }

  const handleKeyDown = e => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const quickActions = [
    'Write a project description for TalkZone chat app',
    'Suggest improvements for my portfolio bio',
    'Generate a professional about me section',
    'What skills should I add to my portfolio?',
  ]

  return (
    <div className="flex flex-col h-[500px] glass-card rounded-2xl overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 border-b border-outline-variant bg-surface-container flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
          <span className="material-symbols-outlined text-primary text-base">smart_toy</span>
        </div>
        <div>
          <p className="font-geist font-semibold text-sm text-on-background">AI Assistant</p>
          <p className="font-mono text-[10px] text-outline">
            {isGeminiConfigured ? '● Gemini 1.5 Flash' : '○ API key not configured'}
          </p>
        </div>
        <div className="ml-auto">
          <span className={`w-2 h-2 rounded-full inline-block ${isGeminiConfigured ? 'bg-green-400 animate-pulse' : 'bg-error'}`} />
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide">
        {messages.map((msg, i) => (
          <div key={i} className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            {msg.role === 'assistant' && (
              <div className="w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-1">
                <span className="material-symbols-outlined text-primary text-sm">smart_toy</span>
              </div>
            )}
            <div className={`max-w-[80%] ${msg.role === 'user' ? 'chat-bubble-user' : 'chat-bubble-ai'}`}>
              <p className="font-inter text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
            </div>
            {msg.role === 'user' && (
              <div className="w-7 h-7 rounded-full bg-primary-container flex items-center justify-center flex-shrink-0 mt-1">
                <span className="font-geist text-xs font-bold text-on-primary-container">A</span>
              </div>
            )}
          </div>
        ))}

        {loading && (
          <div className="flex gap-3 justify-start">
            <div className="w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-1">
              <span className="material-symbols-outlined text-primary text-sm animate-spin">progress_activity</span>
            </div>
            <div className="chat-bubble-ai">
              <div className="flex gap-1 items-center py-1">
                <span className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Actions */}
      {messages.length === 1 && (
        <div className="px-4 pb-2 flex gap-2 flex-wrap">
          {quickActions.map((action, i) => (
            <button
              key={i}
              onClick={() => setInput(action)}
              className="px-3 py-1.5 rounded-full border border-outline-variant text-on-surface-variant font-mono text-[11px]
                hover:border-primary hover:text-primary transition-all"
            >
              {action.length > 35 ? action.slice(0, 35) + '...' : action}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <div className="px-4 pb-4 pt-2 border-t border-outline-variant">
        <div className="flex gap-2 items-end">
          <textarea
            ref={textareaRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask AI anything about your portfolio..."
            rows={2}
            className="flex-1 bg-surface-container-low border border-outline-variant rounded-xl px-4 py-3 text-on-surface text-sm
              font-inter focus:outline-none focus:border-primary transition-all resize-none scrollbar-hide"
          />
          <button
            id="ai-send-btn"
            onClick={handleSend}
            disabled={loading || !input.trim()}
            className="w-10 h-10 rounded-xl bg-primary-container text-on-primary-container flex items-center justify-center
              hover:shadow-[0_0_15px_rgba(46,91,255,0.4)] transition-all active:scale-95 disabled:opacity-50 flex-shrink-0"
          >
            <span className="material-symbols-outlined text-base">send</span>
          </button>
        </div>
        <p className="font-mono text-[10px] text-outline mt-1">Enter to send • Shift+Enter for new line</p>
      </div>
    </div>
  )
}
