import { useState } from "react";
import { Check, Send } from "lucide-react";
import { Header } from "./Journey";
import { useData } from "../../context/DataContext";

export function Contact() {
  const { sendMessage, about } = useData();
  const [sent, setSent] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });

  function handleSubmit(e) {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    sendMessage(formData);
    setSent(true);
    setFormData({ name: "", email: "", subject: "", message: "" });
    setTimeout(function() { setSent(false); }, 5000);
  }

  return (
    <section id="contact" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-20 [mask-image:radial-gradient(ellipse_at_center,black_25%,transparent_75%)]" />
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 h-[480px] w-[480px] rounded-full bg-[var(--grad-neon)] opacity-10 blur-3xl" />
      <div className="relative mx-auto max-w-5xl px-4">
        <Header eyebrow="Command Center" title="OPEN A CHANNEL" subtitle="Transmit a message — I respond within 24 hours." />

        <div className="mt-16 grid lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2 space-y-4">
            <div className="glass-strong neon-border rounded-2xl p-6">
              <div className="text-xs uppercase tracking-[0.3em] text-cyan-glow">Status</div>
              <div className="mt-2 flex items-center gap-2 font-display text-xl">
                <span className={"h-2 w-2 rounded-full animate-pulse " + (about && about.available ? "bg-mint glow-mint" : "bg-red-500")} />
                {about && about.available ? "Available for new missions" : "Currently occupied"}
              </div>
              <p className="mt-3 text-sm text-muted-foreground">
                Open to full-stack projects, game development collaborations, and new opportunities.
              </p>
            </div>
            <div className="glass rounded-2xl p-6 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Response time</span>
                <span className="text-mint font-mono">{"<"} 24h</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Timezone</span>
                <span className="text-cyan-glow font-mono">IST / UTC+5:30</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Languages</span>
                <span className="text-mint font-mono">EN / HI</span>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="lg:col-span-3 glass-strong neon-border rounded-2xl p-7 space-y-5">
            <div className="grid sm:grid-cols-2 gap-4">
              <Field
                label="Codename"
                placeholder="Your name"
                value={formData.name}
                onChange={function(e) { setFormData(Object.assign({}, formData, { name: e.target.value })); }}
                required
              />
              <Field
                label="Channel"
                placeholder="you@domain.com"
                type="email"
                value={formData.email}
                onChange={function(e) { setFormData(Object.assign({}, formData, { email: e.target.value })); }}
                required
              />
            </div>
            <Field
              label="Mission"
              placeholder="Project title"
              value={formData.subject}
              onChange={function(e) { setFormData(Object.assign({}, formData, { subject: e.target.value })); }}
            />
            <div>
              <Label>Transmission</Label>
              <textarea
                rows={5}
                placeholder="Tell me about the world you're building…"
                required
                value={formData.message}
                onChange={function(e) { setFormData(Object.assign({}, formData, { message: e.target.value })); }}
                className="mt-2 w-full rounded-xl bg-black/40 border border-white/10 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-mint focus:outline-none focus:ring-2 focus:ring-mint/30"
              />
            </div>

            <button
              type="submit"
              className={"group relative w-full inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 font-display uppercase tracking-widest transition-all " + (sent ? "bg-mint/20 text-mint border border-mint/50" : "bg-[var(--grad-neon)] text-[color:var(--primary-foreground)] glow-mint hover:scale-[1.01]")}
            >
              {sent
                ? (<><Check className="h-4 w-4" /> Transmission received</>)
                : (<><Send className="h-4 w-4 group-hover:translate-x-1 transition-transform" /> Launch Transmission</>)
              }
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

function Label({ children }) {
  return <div className="text-[10px] uppercase tracking-[0.3em] text-cyan-glow">{children}</div>;
}

function Field({ label, ...rest }) {
  return (
    <div>
      <Label>{label}</Label>
      <input
        {...rest}
        className="mt-2 w-full rounded-xl bg-black/40 border border-white/10 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-mint focus:outline-none focus:ring-2 focus:ring-mint/30"
      />
    </div>
  );
}
