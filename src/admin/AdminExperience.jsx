import { useState } from 'react'
import { useData } from '../context/DataContext'

const EMPTY_FORM = { title: '', company: '', period: '', type: 'Work', bullets: '' }
const TYPES = ['Work', 'Freelance', 'Education', 'Personal']

export default function AdminExperience() {
  const { experience, addExperience, updateExperience, deleteExperience } = useData()
  const [form, setForm] = useState(EMPTY_FORM)
  const [editId, setEditId] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [loading, setLoading] = useState(false)
  const [toast, setToast] = useState(null)
  const [deleteConfirm, setDeleteConfirm] = useState(null)

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type })
    setTimeout(() => setToast(null), 3000)
  }

  const handleChange = e => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handleEdit = exp => {
    setForm({
      ...exp,
      bullets: Array.isArray(exp.bullets) ? exp.bullets.join('\n') : exp.bullets || ''
    })
    setEditId(exp.id)
    setShowForm(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    try {
      const payload = {
        ...form,
        bullets: form.bullets.split('\n').map(b => b.trim()).filter(Boolean)
      }
      if (editId) {
        await updateExperience(editId, payload)
        showToast('Journey milestone updated!')
      } else {
        await addExperience(payload)
        showToast('Journey milestone added!')
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
          <h1 className="font-headline-md text-[32px] md:text-[48px] text-primary-fixed-dim leading-tight">Journey</h1>
          <p className="font-body-md text-on-surface-variant mt-2 max-w-md">Manage your experience timeline. {experience.length} milestones active.</p>
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
            {showForm ? 'CANCEL' : 'ADD MILESTONE'}
          </button>
        </div>
      </section>

      {/* Add/Edit Form */}
      {showForm && (
        <div className="glass-card rounded-3xl p-8 border border-primary-container/20">
          <h2 className="font-headline-sm text-xl text-on-background mb-8">
            {editId ? 'Edit Milestone' : 'Add New Milestone'}
          </h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3 mint-border-glow rounded-lg">
              <label className="block font-label-caps text-xs text-on-surface-variant uppercase tracking-widest">Title / Role *</label>
              <input name="title" value={form.title} onChange={handleChange} required className="form-input bg-background/50 focus:bg-background" placeholder="e.g. Lead Game Developer" />
            </div>

            <div className="space-y-3 mint-border-glow rounded-lg">
              <label className="block font-label-caps text-xs text-on-surface-variant uppercase tracking-widest">Organization *</label>
              <input name="company" value={form.company} onChange={handleChange} required className="form-input bg-background/50 focus:bg-background" placeholder="e.g. Neon Studios" />
            </div>

            <div className="space-y-3 mint-border-glow rounded-lg">
              <label className="block font-label-caps text-xs text-on-surface-variant uppercase tracking-widest">Time Period *</label>
              <input name="period" value={form.period} onChange={handleChange} required className="form-input bg-background/50 focus:bg-background" placeholder="e.g. 2023 - Present" />
            </div>

            <div className="space-y-3 mint-border-glow rounded-lg">
              <label className="block font-label-caps text-xs text-on-surface-variant uppercase tracking-widest">Type</label>
              <select name="type" value={form.type} onChange={handleChange} className="form-input bg-background/50 focus:bg-background text-on-surface">
                {TYPES.map(c => <option key={c} value={c} className="bg-surface-container text-on-surface">{c}</option>)}
              </select>
            </div>

            <div className="md:col-span-2 space-y-3 mint-border-glow rounded-lg">
              <label className="block font-label-caps text-xs text-on-surface-variant uppercase tracking-widest">Description / Bullet Points</label>
              <p className="text-[10px] text-on-surface-variant uppercase">Enter each bullet point on a new line</p>
              <textarea name="bullets" value={form.bullets} onChange={handleChange} rows={4}
                className="form-input bg-background/50 focus:bg-background resize-none" placeholder="Built a multiplayer engine...\nOptimized asset loading..." />
            </div>

            <div className="md:col-span-2 flex gap-4 mt-4 pt-6 border-t border-white/5">
              <button type="submit" disabled={loading}
                className="flex-1 py-4 bg-primary-container text-on-primary-container font-label-caps tracking-widest uppercase rounded-xl hover:brightness-110 mint-glow transition-all active:scale-95 disabled:opacity-70 flex items-center justify-center gap-2">
                {loading ? <><span className="material-symbols-outlined animate-spin-slow text-lg">progress_activity</span> SAVING...</> : <><span className="material-symbols-outlined text-lg">save</span> {editId ? 'UPDATE MILESTONE' : 'SAVE MILESTONE'}</>}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Experience List */}
      <div className="space-y-4">
        {experience.length === 0 ? (
          <div className="glass-card rounded-3xl p-16 text-center border border-white/5">
            <span className="material-symbols-outlined text-outline text-6xl block mb-4">route</span>
            <p className="font-headline-sm text-xl text-on-surface-variant mb-2">No journey milestones yet</p>
            <p className="font-body-md text-sm text-outline">Click "ADD MILESTONE" to build your timeline.</p>
          </div>
        ) : (
          experience.map(exp => (
            <div key={exp.id} className="glass-card rounded-2xl p-6 flex flex-col md:flex-row items-start gap-6 group hover:border-primary-container/30">
              {/* Info */}
              <div className="flex-1 min-w-0 w-full">
                <div className="flex items-center justify-between gap-3 flex-wrap mb-2">
                  <h3 className="font-headline-sm text-lg text-on-background">{exp.title}</h3>
                  <span className="px-2.5 py-1 rounded-full bg-surface-container border border-outline-variant text-primary-fixed-dim font-label-caps text-[10px] uppercase">
                    {exp.period}
                  </span>
                </div>
                <div className="text-sm font-label-caps text-on-surface-variant tracking-widest mb-4">
                  {exp.company} • {exp.type}
                </div>
                {exp.bullets && exp.bullets.length > 0 && (
                  <ul className="list-disc list-inside space-y-1 text-sm text-outline">
                    {exp.bullets.map((b, i) => (
                      <li key={i}>{b}</li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Actions */}
              <div className="flex md:flex-col gap-3 flex-shrink-0 w-full md:w-auto mt-4 md:mt-0 pt-4 md:pt-0 border-t md:border-t-0 border-white/5">
                <button onClick={() => handleEdit(exp)}
                  className="flex-1 md:flex-none px-4 py-2.5 rounded-xl border border-outline-variant text-on-surface-variant hover:border-primary-fixed-dim hover:text-primary-fixed-dim transition-all text-xs font-label-caps uppercase flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-outlined text-[16px]">edit</span> Edit
                </button>
                {deleteConfirm === exp.id ? (
                  <div className="flex gap-2 flex-1 md:flex-none">
                    <button onClick={() => { deleteExperience(exp.id); setDeleteConfirm(null); showToast('Deleted') }}
                      className="flex-1 px-4 py-2.5 rounded-xl bg-error-container text-on-error-container text-xs font-label-caps uppercase text-center"
                    >Confirm</button>
                    <button onClick={() => setDeleteConfirm(null)}
                      className="flex-1 px-4 py-2.5 rounded-xl border border-outline-variant text-on-surface-variant text-xs font-label-caps uppercase text-center"
                    >Cancel</button>
                  </div>
                ) : (
                  <button onClick={() => setDeleteConfirm(exp.id)}
                    className="flex-1 md:flex-none px-4 py-2.5 rounded-xl border border-error/20 text-error hover:bg-error-container hover:border-error-container transition-all text-xs font-label-caps uppercase flex items-center justify-center gap-2"
                  >
                    <span className="material-symbols-outlined text-[16px]">delete</span> Delete
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
