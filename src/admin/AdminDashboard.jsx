import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useData } from '../context/DataContext'
import { useAuth } from '../context/AuthContext'
import AIAssistant from './AIAssistant'

export default function AdminDashboard() {
  const { projects, skills, messages, fetchMessages } = useData()
  const { user } = useAuth()

  useEffect(() => { fetchMessages() }, [])

  const unreadMessages = messages.filter(m => !m.read).length

  return (
    <div className="max-w-7xl mx-auto space-y-12">
      {/* Welcome Header */}
      <section className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="font-headline-md text-[32px] md:text-[48px] text-primary-fixed-dim leading-tight">Overview</h1>
          <p className="font-body-md text-on-surface-variant mt-2 max-w-md">Welcome back, system admin. Your portfolio is currently performing at peak efficiency.</p>
        </div>
        <div className="flex gap-3">
          <Link to="/admin/projects" className="bg-primary-container text-on-primary-container font-label-caps px-6 py-3 rounded-full flex items-center gap-2 active:scale-95 transition-transform mint-glow hover:brightness-110">
            <span className="material-symbols-outlined text-[18px]">add</span>
            NEW PROJECT
          </Link>
        </div>
      </section>

      {/* Quick Stats Bento Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Total Projects */}
        <div className="glass-card p-6 rounded-2xl flex flex-col justify-between h-40 group hover:border-primary-container/40 transition-all duration-300">
          <div className="flex justify-between items-start">
            <span className="material-symbols-outlined text-primary-fixed-dim p-2 bg-white/5 rounded-lg group-hover:scale-110 transition-transform">work</span>
          </div>
          <div>
            <h2 className="font-headline-md text-[40px] text-on-background leading-none">{projects.length}</h2>
            <p className="font-label-caps text-on-surface-variant mt-1 uppercase tracking-widest">TOTAL PROJECTS</p>
          </div>
        </div>

        {/* Added Skills */}
        <div className="glass-card p-6 rounded-2xl flex flex-col justify-between h-40 group hover:border-primary-container/40 transition-all duration-300">
          <div className="flex justify-between items-start">
            <span className="material-symbols-outlined text-primary-fixed-dim p-2 bg-white/5 rounded-lg group-hover:scale-110 transition-transform">psychology</span>
          </div>
          <div>
            <h2 className="font-headline-md text-[40px] text-on-background leading-none">{skills.length}</h2>
            <p className="font-label-caps text-on-surface-variant mt-1 uppercase tracking-widest">ADDED SKILLS</p>
          </div>
        </div>

        {/* New Messages */}
        <div className="glass-card p-6 rounded-2xl flex flex-col justify-between h-40 group hover:border-primary-container/40 transition-all duration-300 border-primary-container/20">
          <div className="flex justify-between items-start">
            <span className="material-symbols-outlined text-primary-fixed-dim p-2 bg-white/5 rounded-lg group-hover:scale-110 transition-transform">inbox</span>
            {unreadMessages > 0 && (
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-primary-container rounded-full animate-pulse"></span>
              </div>
            )}
          </div>
          <div>
            <h2 className="font-headline-md text-[40px] text-on-background leading-none">{messages.length}</h2>
            <p className="font-label-caps text-on-surface-variant mt-1 uppercase tracking-widest">TOTAL MESSAGES</p>
          </div>
        </div>
      </section>

      {/* Main Dashboard Split */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Gemini AI Section (Col Span 3) */}
        <div className="lg:col-span-3 space-y-6">
          <div className="relative overflow-hidden glass-card rounded-3xl p-8 border-primary-container/20 group">
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <span className="material-symbols-outlined text-primary-fixed-dim animate-spin-slow" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
                <span className="font-label-caps text-primary-fixed-dim tracking-[0.2em] uppercase">GEMINI INTELLIGENCE</span>
              </div>
              <AIAssistant
                contextData={`Current portfolio stats: ${projects.length} projects, ${skills.length} skills. Unread messages: ${unreadMessages}.`}
              />
            </div>
          </div>
          
          <div className="glass-card rounded-3xl p-6 h-64 flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-label-caps text-on-surface-variant uppercase tracking-widest">PERFORMANCE TRENDS</h3>
              <div className="flex gap-2">
                <div className="w-2 h-2 rounded-full bg-primary-container"></div>
                <div className="w-2 h-2 rounded-full bg-white/10"></div>
              </div>
            </div>
            <div className="flex-1 flex items-end justify-between gap-2 px-2">
              <div className="w-full bg-white/5 rounded-t-lg h-[40%] transition-all hover:bg-primary-container/40"></div>
              <div className="w-full bg-white/5 rounded-t-lg h-[65%] transition-all hover:bg-primary-container/40"></div>
              <div className="w-full bg-primary-container/60 rounded-t-lg h-[85%] transition-all hover:bg-primary-container/80 shadow-[0_0_10px_rgba(0,255,170,0.2)]"></div>
              <div className="w-full bg-white/5 rounded-t-lg h-[55%] transition-all hover:bg-primary-container/40"></div>
              <div className="w-full bg-white/5 rounded-t-lg h-[95%] transition-all hover:bg-primary-container/40"></div>
              <div className="w-full bg-white/5 rounded-t-lg h-[30%] transition-all hover:bg-primary-container/40"></div>
              <div className="w-full bg-white/5 rounded-t-lg h-[50%] transition-all hover:bg-primary-container/40"></div>
            </div>
          </div>
        </div>

        {/* Recent Activity (Col Span 2) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-card rounded-3xl p-8 h-full flex flex-col">
            <div className="flex justify-between items-center mb-8">
              <h3 className="font-label-caps text-primary-fixed-dim uppercase tracking-widest">RECENT MESSAGES</h3>
            </div>
            <div className="space-y-6 flex-1">
              {messages.slice(0, 4).length > 0 ? messages.slice(0, 4).map((msg, i) => (
                <div key={i} className="flex gap-4 group">
                  <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center shrink-0 border border-white/5 group-hover:border-primary-container/20 transition-all">
                    <span className="material-symbols-outlined text-[18px] text-primary-container">mail</span>
                  </div>
                  <div className="space-y-1">
                    <p className="font-body-md text-on-surface text-[14px]">New message from <span className="text-primary-fixed-dim font-semibold">{msg.name}</span>.</p>
                    <p className="font-label-caps text-[10px] text-on-surface-variant">{new Date(msg.created_at).toLocaleDateString()}</p>
                  </div>
                </div>
              )) : (
                <div className="text-center py-8">
                  <span className="material-symbols-outlined text-outline text-4xl block mb-2">mail_outline</span>
                  <p className="font-body-md text-sm text-on-surface-variant">No messages yet</p>
                </div>
              )}
            </div>
            
            <div className="mt-8 pt-8 border-t border-white/5">
              <div className="grid grid-cols-2 gap-3">
                <Link to="/admin/skills" className="bg-surface-container border border-outline-variant text-on-surface rounded-xl p-4 flex items-center gap-2 font-label-caps text-xs uppercase hover:bg-white/5 transition-all">
                  <span className="material-symbols-outlined text-lg">add</span>
                  Add Skill
                </Link>
                <Link to="/admin/about" className="bg-surface-container border border-outline-variant text-on-surface rounded-xl p-4 flex items-center gap-2 font-label-caps text-xs uppercase hover:bg-white/5 transition-all">
                  <span className="material-symbols-outlined text-lg">edit</span>
                  Edit Profile
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
