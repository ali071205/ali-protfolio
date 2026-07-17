import { useState } from 'react'
import { useData } from '../context/DataContext'

const EMPTY_FORM = {
  title: '',
  slug: '',
  description: '',
  content: '',
  image_url: '',
  tags: '',
  published: true,
}

export default function AdminBlogs() {
  const { blogs, addBlog, updateBlog, deleteBlog } = useData()
  const [form, setForm] = useState(EMPTY_FORM)
  const [editId, setEditId] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [loading, setLoading] = useState(false)
  const [deleteConfirm, setDeleteConfirm] = useState(null)
  const [toast, setToast] = useState(null)

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type })
    setTimeout(() => setToast(null), 3000)
  }

  const handleChange = e => {
    const { name, value, type, checked } = e.target
    setForm(prev => {
      const next = { ...prev, [name]: type === 'checkbox' ? checked : value }
      if (name === 'title' && !editId) {
        next.slug = value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')
      }
      return next
    })
  }

  const handleEdit = blog => {
    setForm({
      ...blog,
      tags: Array.isArray(blog.tags) ? blog.tags.join(', ') : '',
    })
    setEditId(blog.id)
    setShowForm(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    try {
      const payload = {
        ...form,
        tags: form.tags.split(',').map(t => t.trim()).filter(Boolean),
        updated_at: new Date().toISOString()
      }
      if (editId) {
        await updateBlog(editId, payload)
        showToast('Blog updated successfully!')
      } else {
        await addBlog(payload)
        showToast('Blog added! Now live on your portfolio.')
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
      await deleteBlog(id)
      setDeleteConfirm(null)
      showToast('Blog deleted.')
    } catch (err) {
      showToast(err.message, 'error')
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
          <h1 className="font-headline-md text-[32px] md:text-[48px] text-primary-fixed-dim leading-tight">Blog Manager</h1>
          <p className="font-body-md text-on-surface-variant mt-2 max-w-md">{blogs.length} articles published</p>
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
            {showForm && !editId ? 'CANCEL' : editId ? 'CANCEL EDIT' : 'NEW ARTICLE'}
          </button>
        </div>
      </section>

      {/* Add/Edit Form */}
      {showForm && (
        <div className="glass-card rounded-3xl p-8 border border-primary-container/20">
          <h2 className="font-headline-sm text-xl text-on-background mb-8">
            {editId ? 'Edit Article' : 'Write New Article'}
          </h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3 mint-border-glow rounded-lg">
              <label className="block font-label-caps text-xs text-on-surface-variant uppercase tracking-widest">Title *</label>
              <input name="title" value={form.title} onChange={handleChange} required className="form-input bg-background/50 focus:bg-background" placeholder="Article Title" />
            </div>

            <div className="space-y-3 mint-border-glow rounded-lg">
              <label className="block font-label-caps text-xs text-on-surface-variant uppercase tracking-widest">URL Slug *</label>
              <input name="slug" value={form.slug} onChange={handleChange} required className="form-input bg-background/50 focus:bg-background" placeholder="article-url-slug" />
            </div>

            <div className="md:col-span-2 space-y-3 mint-border-glow rounded-lg">
              <label className="block font-label-caps text-xs text-on-surface-variant uppercase tracking-widest">Meta Description (SEO) *</label>
              <textarea name="description" value={form.description} onChange={handleChange} required rows={2}
                className="form-input bg-background/50 focus:bg-background resize-none" placeholder="Short description for Google search results..." />
            </div>

            <div className="md:col-span-2 space-y-3 mint-border-glow rounded-lg">
              <label className="block font-label-caps text-xs text-on-surface-variant uppercase tracking-widest">Content (Markdown) *</label>
              <textarea name="content" value={form.content} onChange={handleChange} required rows={10}
                className="form-input bg-background/50 focus:bg-background resize-none font-mono" placeholder="# Heading 1&#10;Write your article here..." />
            </div>

            <div className="space-y-3 mint-border-glow rounded-lg">
              <label className="block font-label-caps text-xs text-on-surface-variant uppercase tracking-widest">Cover Image URL</label>
              <input name="image_url" value={form.image_url} onChange={handleChange} className="form-input bg-background/50 focus:bg-background" placeholder="https://..." />
            </div>

            <div className="space-y-3 mint-border-glow rounded-lg">
              <label className="block font-label-caps text-xs text-on-surface-variant uppercase tracking-widest">Tags / Keywords</label>
              <input name="tags" value={form.tags} onChange={handleChange} className="form-input bg-background/50 focus:bg-background" placeholder="React, SEO, Tutorial" />
            </div>

            <div className="md:col-span-2 flex items-center gap-4 py-2">
              <div className="relative flex items-center">
                <input
                  type="checkbox"
                  id="published"
                  name="published"
                  checked={form.published}
                  onChange={handleChange}
                  className="w-5 h-5 rounded border-outline-variant bg-background/50 accent-primary-container"
                />
              </div>
              <label htmlFor="published" className="font-body-md text-sm text-on-surface cursor-pointer select-none">
                Publish this article immediately (visible to public)
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
                  <><span className="material-symbols-outlined text-lg">save</span> {editId ? 'UPDATE ARTICLE' : 'PUBLISH ARTICLE'}</>
                )}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Blogs List */}
      <div className="space-y-4">
        {blogs.length === 0 ? (
          <div className="glass-card rounded-3xl p-16 text-center border border-white/5">
            <span className="material-symbols-outlined text-outline text-6xl block mb-4">article</span>
            <p className="font-headline-sm text-xl text-on-surface-variant mb-2">No articles yet</p>
            <p className="font-body-md text-sm text-outline">Start writing to build Topical Authority for SEO.</p>
          </div>
        ) : (
          blogs.map(blog => {
            if (!blog) return null;
            return (
              <div key={blog.id} className="glass-card rounded-2xl p-6 flex flex-col md:flex-row items-start md:items-center gap-6 group hover:border-primary-container/30">
                {/* Image thumb */}
                {blog.image_url && (
                  <div className="w-full md:w-32 h-32 md:h-24 rounded-xl overflow-hidden bg-background/50 border border-white/5 flex-shrink-0 relative">
                    <img src={blog.image_url} alt={blog.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  </div>
                )}

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 flex-wrap mb-2">
                  <h3 className="font-headline-sm text-lg text-on-background">{blog.title}</h3>
                  <span className={`px-2.5 py-1 rounded-full border font-label-caps text-[10px] uppercase ${blog.published ? 'bg-primary-container/10 border-primary-container text-primary-fixed-dim' : 'bg-surface-container border-outline-variant text-on-surface-variant'}`}>
                    {blog.published ? 'Published' : 'Draft'}
                  </span>
                </div>
                <p className="font-body-md text-sm text-on-surface-variant mb-4 line-clamp-2">{blog.description}</p>
                <div className="flex gap-2 flex-wrap">
                  {(blog.tags || []).map((t, i) => (
                    <span key={i} className="font-label-caps text-[10px] px-2.5 py-1 rounded-md bg-white/5 border border-white/5 text-on-surface-variant uppercase">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex md:flex-col gap-3 flex-shrink-0 w-full md:w-auto mt-4 md:mt-0 pt-4 md:pt-0 border-t md:border-t-0 border-white/5">
                <button
                  onClick={() => handleEdit(blog)}
                  className="flex-1 md:flex-none px-4 py-2.5 rounded-xl border border-outline-variant text-on-surface-variant hover:border-primary-fixed-dim hover:text-primary-fixed-dim transition-all text-xs font-label-caps uppercase flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-outlined text-[16px]">edit</span>
                  Edit
                </button>
                {deleteConfirm === blog.id ? (
                  <div className="flex gap-2 flex-1 md:flex-none">
                    <button
                      onClick={() => handleDelete(blog.id)}
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
                    onClick={() => setDeleteConfirm(blog.id)}
                    className="flex-1 md:flex-none px-4 py-2.5 rounded-xl border border-error/20 text-error hover:bg-error-container hover:border-error-container transition-all text-xs font-label-caps uppercase flex items-center justify-center gap-2"
                  >
                    <span className="material-symbols-outlined text-[16px]">delete</span>
                    Delete
                  </button>
                )}
              </div>
            </div>
          )
        })
        )}
      </div>
    </div>
  )
}
