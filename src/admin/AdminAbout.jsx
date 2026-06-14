import { useState, useEffect } from 'react'
import { useData } from '../context/DataContext'

export default function AdminAbout() {
  const { about, updateAbout } = useData()
  const [form, setForm] = useState(null)
  const [loading, setLoading] = useState(false)
  const [toast, setToast] = useState(null)

  useEffect(() => {
    if (about) setForm({ ...about })
  }, [about])

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type })
    setTimeout(() => setToast(null), 3000)
  }

  const handleChange = e => {
    const { name, value, type, checked } = e.target
    setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
  }

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    try {
      await updateAbout(form)
      showToast('Profile configuration updated and deployed!')
    } catch (err) {
      showToast(err.message, 'error')
    } finally {
      setLoading(false)
    }
  }

  if (!form) return (
    <div className="flex items-center justify-center h-64">
      <span className="material-symbols-outlined text-primary-fixed-dim animate-spin-slow text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>progress_activity</span>
    </div>
  )

  return (
    <div className="max-w-4xl mx-auto space-y-12">
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

      <section className="flex flex-col gap-2">
        <h1 className="font-headline-md text-[32px] md:text-[48px] text-primary-fixed-dim leading-tight">Profile Config</h1>
        <p className="font-body-md text-on-surface-variant max-w-md">Manage your personal brand, biography, and contact vectors.</p>
      </section>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Availability Toggle */}
        <div className="glass-card rounded-3xl p-8 flex items-center justify-between border border-primary-container/20 hover:border-primary-container/40 transition-colors">
          <div>
            <p className="font-headline-sm text-lg text-on-background">System Availability</p>
            <p className="font-body-md text-sm text-on-surface-variant mt-1">Broadcast an "Available for Hire" status across your portfolio</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              name="available"
              checked={form.available}
              onChange={handleChange}
              className="sr-only peer"
            />
            <div className="w-14 h-8 bg-surface-container rounded-full peer peer-checked:bg-primary-container transition-all border border-white/10
              after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:rounded-full after:h-6 after:w-6
              after:transition-all peer-checked:after:translate-x-6 peer-checked:after:shadow-[0_0_10px_rgba(0,255,170,0.5)]" />
          </label>
        </div>

        {/* Bio */}
        <div className="glass-card rounded-3xl p-8 space-y-6">
          <div className="flex items-center gap-3 mb-2">
            <span className="material-symbols-outlined text-primary-fixed-dim bg-white/5 p-2 rounded-lg">description</span>
            <h2 className="font-headline-sm text-xl text-on-background">Biography</h2>
          </div>

          <div className="space-y-3 mint-border-glow rounded-lg">
            <label className="block font-label-caps text-xs text-on-surface-variant uppercase tracking-widest">Short Summary (Headline)</label>
            <textarea name="bio" value={form.bio || ''} onChange={handleChange} rows={3}
              className="form-input bg-background/50 focus:bg-background resize-none" placeholder="A brief, impactful statement about who you are..." />
          </div>

          <div className="space-y-3 mint-border-glow rounded-lg">
            <label className="block font-label-caps text-xs text-on-surface-variant uppercase tracking-widest">Extended Biography (Optional)</label>
            <textarea name="bio_extended" value={form.bio_extended || ''} onChange={handleChange} rows={5}
              className="form-input bg-background/50 focus:bg-background resize-none" placeholder="Detailed background, journey, and technical philosophy..." />
          </div>
        </div>

        {/* Contact Info */}
        <div className="glass-card rounded-3xl p-8 space-y-6">
          <div className="flex items-center gap-3 mb-2">
            <span className="material-symbols-outlined text-primary-fixed-dim bg-white/5 p-2 rounded-lg">contact_mail</span>
            <h2 className="font-headline-sm text-xl text-on-background">Contact Vectors</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { name: 'email', label: 'Primary Email', placeholder: 'you@domain.com', type: 'email' },
              { name: 'phone', label: 'Secure Line (Phone)', placeholder: '+00 xxx-xxx-xxxx' },
              { name: 'address', label: 'Base Location', placeholder: 'City, Country' },
              { name: 'dob', label: 'System Initialization (DOB)', placeholder: 'Month DD, YYYY' },
            ].map(field => (
              <div key={field.name} className="space-y-3 mint-border-glow rounded-lg">
                <label className="block font-label-caps text-xs text-on-surface-variant uppercase tracking-widest">{field.label}</label>
                <input
                  name={field.name}
                  type={field.type || 'text'}
                  value={form[field.name] || ''}
                  onChange={handleChange}
                  className="form-input bg-background/50 focus:bg-background"
                  placeholder={field.placeholder}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Social Links */}
        <div className="glass-card rounded-3xl p-8 space-y-6">
          <div className="flex items-center gap-3 mb-2">
            <span className="material-symbols-outlined text-primary-fixed-dim bg-white/5 p-2 rounded-lg">share</span>
            <h2 className="font-headline-sm text-xl text-on-background">Network Links</h2>
          </div>
          <div className="space-y-4">
            {[
              { name: 'github', label: 'GitHub Profile URL', icon: 'code', placeholder: 'https://github.com/...' },
              { name: 'linkedin', label: 'LinkedIn Profile URL', icon: 'work', placeholder: 'https://linkedin.com/in/...' },
              { name: 'twitter', label: 'Twitter/X Profile URL', icon: 'tag', placeholder: 'https://twitter.com/...' },
            ].map(social => (
              <div key={social.name} className="space-y-3 mint-border-glow rounded-lg">
                <label className="block font-label-caps text-xs text-on-surface-variant uppercase tracking-widest">{social.label}</label>
                <div className="flex items-center gap-4">
                  <span className="material-symbols-outlined text-primary-fixed-dim bg-background/50 p-3 rounded-lg border border-white/5">{social.icon}</span>
                  <input
                    name={social.name}
                    value={form[social.name] || ''}
                    onChange={handleChange}
                    className="form-input bg-background/50 focus:bg-background flex-1"
                    placeholder={social.placeholder}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Profile Image */}
        <div className="glass-card rounded-3xl p-8 space-y-6">
          <div className="flex items-center gap-3 mb-2">
            <span className="material-symbols-outlined text-primary-fixed-dim bg-white/5 p-2 rounded-lg">image</span>
            <h2 className="font-headline-sm text-xl text-on-background">Visual Identity</h2>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="w-24 h-24 rounded-2xl overflow-hidden bg-background/50 border border-white/5 flex-shrink-0 flex items-center justify-center relative group">
              {form.profile_image ? (
                <img src={form.profile_image} alt="Profile" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
              ) : (
                <span className="font-headline-md text-3xl text-primary-fixed-dim">A</span>
              )}
            </div>
            <div className="flex-1 w-full space-y-3 mint-border-glow rounded-lg">
              <label className="block font-label-caps text-xs text-on-surface-variant uppercase tracking-widest">Image Source URL</label>
              <input
                name="profile_image"
                value={form.profile_image || ''}
                onChange={handleChange}
                className="form-input bg-background/50 focus:bg-background w-full"
                placeholder="https://... or /assets/profile.jpg"
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-5 bg-primary-container text-on-primary-container font-label-caps tracking-widest uppercase rounded-2xl
            hover:brightness-110 transition-all active:scale-[0.98] disabled:opacity-70 mint-glow
            flex items-center justify-center gap-3"
        >
          {loading ? (
            <><span className="material-symbols-outlined animate-spin-slow text-xl">progress_activity</span> INITIATING DEPLOYMENT...</>
          ) : (
            <><span className="material-symbols-outlined text-xl">cloud_upload</span> DEPLOY CHANGES</>
          )}
        </button>
      </form>
    </div>
  )
}
