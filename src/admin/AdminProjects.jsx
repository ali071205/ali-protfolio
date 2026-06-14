import { useState } from 'react'
import { useData } from '../context/DataContext'
import { generateProjectDescription, isGeminiConfigured } from '../lib/gemini'

const EMPTY_FORM = {
  name: '',
  description: '',
  tech_stack: '',
  github_url: '',
  demo_url: '',
  image_url: '',
  category: 'Web',
  featured: false,
}

const CATEGORIES = ['Web', 'Game', 'Tool', 'Mobile', 'AI', 'Other']

export default function AdminProjects() {
  const { projects, addProject, updateProject, deleteProject } = useData()
  const [form, setForm] = useState(EMPTY_FORM)
  const [editId, setEditId] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [loading, setLoading] = useState(false)
  const [aiLoading, setAiLoading] = useState(false)
  const [deleteConfirm, setDeleteConfirm] = useState(null)
  const [toast, setToast] = useState(null)

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type })
    setTimeout(() => setToast(null), 3000)
  }

  const handleChange = e => {
    const { name, value, type, checked } = e.target
    setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
  }

  const handleEdit = project => {
    setForm({
      ...project,
      tech_stack: Array.isArray(project.tech_stack) ? project.tech_stack.join(', ') : '',
    })
    setEditId(project.id)
    setShowForm(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    try {
      const payload = {
        ...form,
        tech_stack: form.tech_stack.split(',').map(t => t.trim()).filter(Boolean),
      }
      if (editId) {
        await updateProject(editId, payload)
        showToast('Project updated successfully!')
      } else {
        await addProject(payload)
        showToast('Project added! Now live on your portfolio.')
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

  const handleDelete = async id => {
    try {
      await deleteProject(id)
      setDeleteConfirm(null)
      showToast('Project deleted.')
    } catch (err) {
      showToast(err.message, 'error')
    }
  }

  const handleAIDescription = async () => {
    if (!form.name || !isGeminiConfigured) return
    setAiLoading(true)
    try {
      const desc = await generateProjectDescription(
        form.name,
        form.tech_stack.split(',').map(t => t.trim()),
        form.description || 'a web/software project'
      )
      setForm(prev => ({ ...prev, description: desc }))
    } catch (err) {
      showToast('AI error: ' + err.message, 'error')
    } finally {
      setAiLoading(false)
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
          <h1 className="font-headline-md text-[32px] md:text-[48px] text-primary-fixed-dim leading-tight">Projects</h1>
          <p className="font-body-md text-on-surface-variant mt-2 max-w-md">{projects.length} total projects in your portfolio</p>
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
            {showForm && !editId ? 'CANCEL' : editId ? 'CANCEL EDIT' : 'NEW PROJECT'}
          </button>
        </div>
      </section>

      {/* Add/Edit Form */}
      {showForm && (
        <div className="glass-card rounded-3xl p-8 border border-primary-container/20">
          <h2 className="font-headline-sm text-xl text-on-background mb-8">
            {editId ? 'Edit Project Details' : 'Configure New Project'}
          </h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3 mint-border-glow rounded-lg">
              <label className="block font-label-caps text-xs text-on-surface-variant uppercase tracking-widest">Project Name *</label>
              <input name="name" value={form.name} onChange={handleChange} required className="form-input bg-background/50 focus:bg-background" placeholder="Project Title" />
            </div>

            <div className="space-y-3 mint-border-glow rounded-lg">
              <label className="block font-label-caps text-xs text-on-surface-variant uppercase tracking-widest">Category</label>
              <select name="category" value={form.category} onChange={handleChange} className="form-input bg-background/50 focus:bg-background text-on-surface">
                {CATEGORIES.map(c => <option key={c} value={c} className="bg-surface-container text-on-surface">{c}</option>)}
              </select>
            </div>

            <div className="md:col-span-2 space-y-3 mint-border-glow rounded-lg">
              <div className="flex items-center justify-between">
                <label className="block font-label-caps text-xs text-on-surface-variant uppercase tracking-widest">Description</label>
                {isGeminiConfigured && (
                  <button
                    type="button"
                    onClick={handleAIDescription}
                    disabled={!form.name || aiLoading}
                    className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-container/10 border border-primary-container/20 text-primary-fixed-dim font-label-caps text-[10px] uppercase
                      hover:bg-primary-container/20 transition-all disabled:opacity-50"
                  >
                    <span className={`material-symbols-outlined text-[14px] ${aiLoading ? 'animate-spin-slow' : ''}`} style={{ fontVariationSettings: "'FILL' 1" }}>
                      {aiLoading ? 'progress_activity' : 'auto_awesome'}
                    </span>
                    {aiLoading ? 'GENERATING...' : 'AI ASSIST'}
                  </button>
                )}
              </div>
              <textarea name="description" value={form.description} onChange={handleChange} rows={4}
                className="form-input bg-background/50 focus:bg-background resize-none" placeholder="Detailed project description..." />
            </div>

            <div className="space-y-3 mint-border-glow rounded-lg">
              <label className="block font-label-caps text-xs text-on-surface-variant uppercase tracking-widest">Tech Stack</label>
              <input name="tech_stack" value={form.tech_stack} onChange={handleChange} className="form-input bg-background/50 focus:bg-background" placeholder="React, Tailwind, Node (comma separated)" />
            </div>

            <div className="space-y-3 mint-border-glow rounded-lg">
              <label className="block font-label-caps text-xs text-on-surface-variant uppercase tracking-widest">Cover Image URL</label>
              <input name="image_url" value={form.image_url} onChange={handleChange} className="form-input bg-background/50 focus:bg-background" placeholder="https://..." />
            </div>

            <div className="space-y-3 mint-border-glow rounded-lg">
              <label className="block font-label-caps text-xs text-on-surface-variant uppercase tracking-widest">GitHub Repository</label>
              <input name="github_url" value={form.github_url} onChange={handleChange} className="form-input bg-background/50 focus:bg-background" placeholder="https://github.com/..." />
            </div>

            <div className="space-y-3 mint-border-glow rounded-lg">
              <label className="block font-label-caps text-xs text-on-surface-variant uppercase tracking-widest">Live Demo URL</label>
              <input name="demo_url" value={form.demo_url} onChange={handleChange} className="form-input bg-background/50 focus:bg-background" placeholder="https://..." />
            </div>

            <div className="md:col-span-2 flex items-center gap-4 py-2">
              <div className="relative flex items-center">
                <input
                  type="checkbox"
                  id="featured"
                  name="featured"
                  checked={form.featured}
                  onChange={handleChange}
                  className="w-5 h-5 rounded border-outline-variant bg-background/50 accent-primary-container"
                />
              </div>
              <label htmlFor="featured" className="font-body-md text-sm text-on-surface cursor-pointer select-none">
                Highlight this project on the main portfolio page
              </label>
            </div>

            <div className="md:col-span-2 flex gap-4 mt-4 pt-6 border-t border-white/5">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 py-4 bg-primary-container text-on-primary-container font-label-caps tracking-widest uppercase rounded-xl
                  hover:brightness-110 mint-glow transition-all active:scale-95 disabled:opacity-70
                  flex items-center justify-center gap-2"
              >
                {loading ? (
                  <><span className="material-symbols-outlined animate-spin-slow text-lg">progress_activity</span> SAVING...</>
                ) : (
                  <><span className="material-symbols-outlined text-lg">save</span> {editId ? 'UPDATE PROJECT' : 'SAVE PROJECT'}</>
                )}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Projects List */}
      <div className="space-y-4">
        {projects.length === 0 ? (
          <div className="glass-card rounded-3xl p-16 text-center border border-white/5">
            <span className="material-symbols-outlined text-outline text-6xl block mb-4">folder_open</span>
            <p className="font-headline-sm text-xl text-on-surface-variant mb-2">No projects yet</p>
            <p className="font-body-md text-sm text-outline">Click "NEW PROJECT" to add your first piece of work.</p>
          </div>
        ) : (
          projects.map(project => (
            <div key={project.id} className="glass-card rounded-2xl p-6 flex flex-col md:flex-row items-start md:items-center gap-6 group hover:border-primary-container/30">
              {/* Image thumb */}
              <div className="w-full md:w-48 h-32 md:h-24 rounded-xl overflow-hidden bg-background/50 border border-white/5 flex-shrink-0 relative">
                {project.image_url ? (
                  <img src={project.image_url} alt={project.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="material-symbols-outlined text-outline text-3xl">code</span>
                  </div>
                )}
                {project.featured && (
                  <div className="absolute top-2 left-2 bg-background/80 backdrop-blur-md px-2 py-1 rounded-md border border-primary-container/30 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary-container"></span>
                    <span className="font-label-caps text-[8px] text-primary-fixed-dim uppercase">Featured</span>
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 flex-wrap mb-2">
                  <h3 className="font-headline-sm text-lg text-on-background">{project.name}</h3>
                  <span className="px-2.5 py-1 rounded-full bg-surface-container border border-outline-variant text-on-surface-variant font-label-caps text-[10px] uppercase">
                    {project.category}
                  </span>
                </div>
                <p className="font-body-md text-sm text-on-surface-variant mb-4 line-clamp-2">{project.description}</p>
                <div className="flex gap-2 flex-wrap">
                  {(project.tech_stack || []).slice(0, 5).map((t, i) => (
                    <span key={i} className="font-label-caps text-[10px] px-2.5 py-1 rounded-md bg-white/5 border border-white/5 text-on-surface-variant uppercase">
                      {t}
                    </span>
                  ))}
                  {(project.tech_stack || []).length > 5 && (
                    <span className="font-label-caps text-[10px] px-2.5 py-1 rounded-md bg-white/5 text-outline">
                      +{(project.tech_stack || []).length - 5}
                    </span>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex md:flex-col gap-3 flex-shrink-0 w-full md:w-auto mt-4 md:mt-0 pt-4 md:pt-0 border-t md:border-t-0 border-white/5">
                <button
                  onClick={() => handleEdit(project)}
                  className="flex-1 md:flex-none px-4 py-2.5 rounded-xl border border-outline-variant text-on-surface-variant hover:border-primary-fixed-dim hover:text-primary-fixed-dim transition-all text-xs font-label-caps uppercase flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-outlined text-[16px]">edit</span>
                  Edit
                </button>
                {deleteConfirm === project.id ? (
                  <div className="flex gap-2 flex-1 md:flex-none">
                    <button
                      onClick={() => handleDelete(project.id)}
                      className="flex-1 px-4 py-2.5 rounded-xl bg-error-container text-on-error-container text-xs font-label-caps uppercase text-center"
                    >
                      Confirm
                    </button>
                    <button
                      onClick={() => setDeleteConfirm(null)}
                      className="flex-1 px-4 py-2.5 rounded-xl border border-outline-variant text-on-surface-variant text-xs font-label-caps uppercase text-center"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setDeleteConfirm(project.id)}
                    className="flex-1 md:flex-none px-4 py-2.5 rounded-xl border border-error/20 text-error hover:bg-error-container hover:border-error-container transition-all text-xs font-label-caps uppercase flex items-center justify-center gap-2"
                  >
                    <span className="material-symbols-outlined text-[16px]">delete</span>
                    Delete
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
