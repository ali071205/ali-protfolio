import { useState } from 'react'
import { useData } from '../context/DataContext'

const EMPTY_FORM = { name: '', desc: '', rarity: 'Rare', color: 'mint', icon: 'Trophy' }
const RARITIES = ['Common', 'Uncommon', 'Rare', 'Epic', 'Legendary', 'Mythic']
const COLORS = ['mint', 'cyan-glow']
const ICONS = ['Trophy', 'Crown', 'Medal', 'Star', 'Zap', 'Award', 'Shield']

export default function AdminTrophies() {
  const { trophies, addTrophy, updateTrophy, deleteTrophy } = useData()
  const [form, setForm] = useState(EMPTY_FORM)
  const [editId, setEditId] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [loading, setLoading] = useState(false)
  const [toast, setToast] = useState(null)

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type })
    setTimeout(() => setToast(null), 3000)
  }

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    try {
      if (editId) {
        await updateTrophy(editId, form)
        showToast('Trophy updated successfully!')
      } else {
        await addTrophy(form)
        showToast('Trophy added to the portfolio!')
      }
      setForm(EMPTY_FORM)
      setEditId(null)
      setShowForm(false)
    } catch (err) {
      showToast(err.message, 'error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-7xl mx-auto space-y-12">
      {/* Toast */}
      {toast && (
        <div className={`fixed top-20 right-8 z-50 px-6 py-4 rounded-xl shadow-2xl font-body-md text-sm
          flex items-center gap-3 transition-all ${
            toast.type === 'error'
              ? 'bg-error-container border border-error/50 text-on-error-container'
              : 'glass-card border-primary-container text-primary-fixed-dim'
          }`}>
          <span className="material-symbols-outlined text-xl">
            {toast.type === 'error' ? 'error' : 'check_circle'}
          </span>
          {toast.msg}
        </div>
      )}

      {/* Header */}
      <section className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="font-headline-md text-[32px] md:text-[48px] text-primary-fixed-dim leading-tight">Trophies</h1>
          <p className="font-body-md text-on-surface-variant mt-2 max-w-md">Manage your achievements and milestones. {trophies.length} trophies currently active.</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => { setForm(EMPTY_FORM); setEditId(null); setShowForm(!showForm) }}
            className={`font-label-caps px-6 py-3 rounded-full flex items-center gap-2 active:scale-95 transition-all ${
              showForm 
                ? 'border border-outline-variant text-on-surface-variant hover:text-on-surface' 
                : 'bg-primary-container text-on-primary-container mint-glow hover:brightness-110'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">{showForm ? 'close' : 'add'}</span>
            {showForm ? 'CANCEL' : 'ADD TROPHY'}
          </button>
        </div>
      </section>

      {/* Add Form */}
      {showForm && (
        <div className="glass-card rounded-3xl p-8 border border-primary-container/20">
          <h2 className="font-headline-sm text-xl text-on-background mb-8">
            {editId ? 'Edit Trophy Configuration' : 'Configure New Trophy'}
          </h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3 mint-border-glow rounded-lg">
              <label className="block font-label-caps text-xs text-on-surface-variant uppercase tracking-widest">Trophy Name *</label>
              <input
                value={form.name}
                onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                required className="form-input bg-background/50 focus:bg-background" placeholder="e.g. First Game Shipped"
              />
            </div>
            
            <div className="space-y-3 mint-border-glow rounded-lg">
              <label className="block font-label-caps text-xs text-on-surface-variant uppercase tracking-widest">Description *</label>
              <input
                value={form.desc}
                onChange={e => setForm(p => ({ ...p, desc: e.target.value }))}
                required className="form-input bg-background/50 focus:bg-background" placeholder="e.g. Released debut indie title to public."
              />
            </div>

            <div className="space-y-3 mint-border-glow rounded-lg">
              <label className="block font-label-caps text-xs text-on-surface-variant uppercase tracking-widest">Rarity</label>
              <select
                value={form.rarity}
                onChange={e => setForm(p => ({ ...p, rarity: e.target.value }))}
                className="form-input bg-background/50 focus:bg-background text-on-surface"
              >
                {RARITIES.map(c => <option key={c} value={c} className="bg-surface-container text-on-surface">{c}</option>)}
              </select>
            </div>

            <div className="space-y-3 mint-border-glow rounded-lg">
              <label className="block font-label-caps text-xs text-on-surface-variant uppercase tracking-widest">Theme Color</label>
              <select
                value={form.color}
                onChange={e => setForm(p => ({ ...p, color: e.target.value }))}
                className="form-input bg-background/50 focus:bg-background text-on-surface"
              >
                {COLORS.map(c => <option key={c} value={c} className="bg-surface-container text-on-surface">{c}</option>)}
              </select>
            </div>

            <div className="space-y-3 mint-border-glow rounded-lg">
              <label className="block font-label-caps text-xs text-on-surface-variant uppercase tracking-widest">Iconography (Lucide)</label>
              <div className="flex flex-wrap gap-2 p-3 bg-background/50 border border-white/5 rounded-xl">
                {ICONS.map(icon => (
                  <button
                    key={icon}
                    type="button"
                    onClick={() => setForm(p => ({ ...p, icon }))}
                    className={`p-2 rounded-lg transition-all ${form.icon === icon ? 'bg-primary-container text-on-primary-container shadow-[0_0_10px_rgba(0,255,170,0.3)]' : 'hover:bg-white/5 text-on-surface-variant hover:text-on-surface'}`}
                    title={icon}
                  >
                    <span className="font-mono text-sm">{icon}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="md:col-span-2 flex gap-4 mt-4 pt-6 border-t border-white/5">
              <button type="submit" disabled={loading}
                className="flex-1 py-4 bg-primary-container text-on-primary-container font-label-caps tracking-widest uppercase rounded-xl hover:brightness-110 mint-glow transition-all active:scale-95 disabled:opacity-70 flex items-center justify-center gap-2">
                {loading ? <><span className="material-symbols-outlined animate-spin-slow text-lg">progress_activity</span> SAVING...</> : <><span className="material-symbols-outlined text-lg">save</span> {editId ? 'UPDATE TROPHY' : 'SAVE TROPHY'}</>}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Trophies List */}
      <div className="space-y-6">
        {trophies.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {trophies.map(trophy => (
              <div key={trophy.id} className="glass-card rounded-2xl p-5 flex items-start gap-4 group hover:border-primary-container/30">
                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-primary-fixed-dim group-hover:bg-primary-container/10 transition-colors">
                  <span className="font-mono text-xs">{trophy.icon}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-headline-sm text-sm text-on-background truncate">{trophy.name}</p>
                    <span className="font-label-caps text-[10px] text-primary-container px-2 py-0.5 rounded-full bg-primary-container/10">{trophy.rarity}</span>
                  </div>
                  <p className="text-xs text-on-surface-variant mt-1 line-clamp-2">{trophy.desc}</p>
                </div>
                <div className="flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => { setForm({ name: trophy.name, desc: trophy.desc, rarity: trophy.rarity, color: trophy.color, icon: trophy.icon }); setEditId(trophy.id); setShowForm(true); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
                    className="p-1.5 rounded-lg hover:bg-white/5 text-on-surface-variant hover:text-primary-fixed-dim transition-all">
                    <span className="material-symbols-outlined text-sm">edit</span>
                  </button>
                  <button onClick={() => deleteTrophy(trophy.id).catch(e => showToast(e.message, 'error'))}
                    className="p-1.5 rounded-lg hover:bg-error-container/20 text-on-surface-variant hover:text-error transition-all">
                    <span className="material-symbols-outlined text-sm">delete</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {trophies.length === 0 && !showForm && (
          <div className="glass-card rounded-3xl p-16 text-center border border-white/5">
            <span className="material-symbols-outlined text-outline text-6xl block mb-4">emoji_events</span>
            <p className="font-headline-sm text-xl text-on-surface-variant mb-2">No trophies configured</p>
            <p className="font-body-md text-sm text-outline">Click "ADD TROPHY" to build your achievements profile.</p>
          </div>
        )}
      </div>
    </div>
  )
}
