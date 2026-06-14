import { useState, useEffect, useRef } from "react";
import { ArrowUpRight, Menu, X, Mail, ExternalLink, Monitor, Layers, Code2, Palette } from "lucide-react";

const Github = ({ size }) => <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.03c3.15-.38 6.47-1.4 6.47-7.05 0-1.5-.5-2.75-1.4-3.7.1-.3.6-1.75-.1-3.65 0 0-1.1-.35-3.6 1.35a12.8 12.8 0 0 0-6.6 0C6.1 1.6 5 1.95 5 1.95c-.7 1.9-.2 3.35-.1 3.65-.9.95-1.4 2.2-1.4 3.7 0 5.65 3.32 6.67 6.47 7.05a4.8 4.8 0 0 0-1.03 2.95V22"></path><path d="M9 20c-3.1 1-5-1-5-3"></path></svg>;
const Linkedin = ({ size }) => <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>;
const Twitter = ({ size }) => <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>;
import { motion, useInView } from "motion/react";
import { useData } from "../context/DataContext";

const theme = {
  name: "Void & Mint",
  bg: "#080808",
  card: "#101010",
  secondary: "#161616",
  foreground: "#edf7f3",
  muted: "#607a70",
  primary: "#4ecf9a",
  primaryFg: "#080808",
  border: "rgba(237,247,243,0.08)",
};

const services = [
  { number: "01", icon: Monitor, title: "Fullstack Development", desc: "End-to-end web applications built for scale and performance using modern technologies like React and Node.js." },
  { number: "02", icon: Layers, title: "Game Development", desc: "Crafting interactive and immersive game experiences, combining logical architecture with creative gameplay." },
  { number: "03", icon: Code2, title: "System Architecture", desc: "Designing robust backend structures and databases to ensure secure and lightning-fast data processing." },
  { number: "04", icon: Palette, title: "UI / UX Design", desc: "Creating sleek, user-centric interfaces that feel natural, intuitive, and visually exceptional." },
];

function FadeIn({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function Home() {
  const { projects, skills, about } = useData();
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeProject, setActiveProject] = useState(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const featuredProjects = projects?.filter(p => p.featured).slice(0, 4) || [];
  const displayProjects = featuredProjects.length > 0 ? featuredProjects : projects?.slice(0, 4) || [];
  const stack = skills?.map(s => s.name) || [];

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: theme.bg, color: theme.foreground, fontFamily: "'DM Sans', sans-serif" }}
    >
      {/* Nav */}
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={scrolled ? { backgroundColor: theme.bg + "e6", borderBottom: `1px solid ${theme.border}`, backdropFilter: "blur(12px)" } : {}}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
          <a href="#" className="text-sm tracking-[0.18em] uppercase font-medium" style={{ fontFamily: "'DM Mono', monospace", color: theme.foreground }}>
            A. Ahmad
          </a>
          <nav className="hidden md:flex items-center gap-10">
            {["Work", "Services", "About", "Contact"].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="text-sm tracking-wide transition-colors duration-200 hover:opacity-100" style={{ color: theme.muted }}>
                {item}
              </a>
            ))}
          </nav>
          <a
            href="#contact"
            className="hidden md:inline-flex items-center gap-2 text-sm px-4 py-1.5 transition-all duration-200 hover:opacity-90"
            style={{ border: `1px solid ${theme.primary}`, color: theme.primary }}
            onMouseEnter={e => { e.currentTarget.style.backgroundColor = theme.primary; e.currentTarget.style.color = theme.primaryFg; }}
            onMouseLeave={e => { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.color = theme.primary; }}
          >
            {about?.available ? 'Available for work' : 'Open to projects'}
          </a>
          <button className="md:hidden" style={{ color: theme.foreground }} onClick={() => setMenuOpen(true)}>
            <Menu size={20} />
          </button>
        </div>
      </header>

      {/* Mobile menu */}
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-[100] flex flex-col p-8"
          style={{ backgroundColor: theme.bg }}
        >
          <div className="flex justify-between items-center mb-16">
            <span className="text-sm tracking-[0.18em] uppercase" style={{ fontFamily: "'DM Mono', monospace" }}>A. Ahmad</span>
            <button onClick={() => setMenuOpen(false)}><X size={20} /></button>
          </div>
          <nav className="flex flex-col gap-8">
            {["Work", "Services", "About", "Contact"].map((item, i) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.07 }}
                onClick={() => setMenuOpen(false)}
                className="text-4xl font-light"
                style={{ fontFamily: "'Playfair Display', serif", color: theme.foreground + "cc" }}
              >
                {item}
              </motion.a>
            ))}
          </nav>
        </motion.div>
      )}

      {/* Hero */}
      <section className="min-h-screen flex flex-col justify-end pb-16 pt-32 px-6 md:px-10 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-[1fr_auto] gap-12 items-end">
          <div>
            <FadeIn>
              <p className="text-xs tracking-[0.25em] uppercase mb-8" style={{ fontFamily: "'DM Mono', monospace", color: theme.primary }}>
                Fullstack Web Developer & BCA Student
              </p>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h1 className="text-[clamp(3rem,9vw,8.5rem)] leading-[0.92] font-normal mb-8" style={{ fontFamily: "'Playfair Display', serif", color: theme.foreground }}>
                Building<br />
                <em className="italic" style={{ color: theme.primary }}>robust</em> digital<br />
                experiences.
              </h1>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="text-lg font-light max-w-md leading-relaxed" style={{ color: theme.muted }}>
                I build full-stack web applications and scalable systems — focusing on performance, clean architecture, and seamless user experiences.
              </p>
            </FadeIn>
            <FadeIn delay={0.28}>
              <div className="flex flex-wrap gap-2 mt-8">
                {["React", "Node.js", "Python", "Fullstack"].map((tag) => (
                  <span key={tag} className="text-xs px-3 py-1.5" style={{ border: `1px solid ${theme.border}`, color: theme.muted, fontFamily: "'DM Mono', monospace" }}>
                    {tag}
                  </span>
                ))}
              </div>
            </FadeIn>
          </div>

          <FadeIn delay={0.3} className="flex flex-col items-end gap-8">
            <a href="#work" className="group flex items-center gap-3 text-sm tracking-wide transition-colors" style={{ color: theme.foreground }}>
              View selected work
              <span className="w-8 h-8 flex items-center justify-center transition-all duration-200" style={{ border: `1px solid ${theme.border}` }}>
                <ArrowUpRight size={14} />
              </span>
            </a>
            <div className="grid grid-cols-2 gap-6 text-right">
              {[["13+", "Projects"], ["3", "Languages"]].map(([num, label]) => (
                <div key={label}>
                  <div className="text-4xl font-light" style={{ fontFamily: "'Playfair Display', serif", color: theme.foreground + "33" }}>{num}</div>
                  <div className="text-xs mt-1 tracking-widest uppercase" style={{ color: theme.muted, fontFamily: "'DM Mono', monospace" }}>{label}</div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>

        <FadeIn delay={0.5} className="mt-20 flex items-center gap-4">
          <div className="w-px h-12" style={{ backgroundColor: theme.border }} />
          <span className="text-xs tracking-[0.2em] uppercase" style={{ color: theme.muted, fontFamily: "'DM Mono', monospace" }}>Scroll</span>
        </FadeIn>
      </section>

      {/* Selected Work */}
      <section id="work" className="py-24 px-6 md:px-10 max-w-7xl mx-auto">
        <FadeIn>
          <div className="flex items-baseline justify-between mb-16 pt-8" style={{ borderTop: `1px solid ${theme.border}` }}>
            <h2 className="text-xs tracking-[0.25em] uppercase" style={{ color: theme.muted, fontFamily: "'DM Mono', monospace" }}>Selected Work</h2>
            <span className="text-xs" style={{ color: theme.muted, fontFamily: "'DM Mono', monospace" }}>Featured</span>
          </div>
        </FadeIn>

        <div className="space-y-2">
          {displayProjects.length > 0 ? displayProjects.map((project, i) => (
            <FadeIn key={project.id} delay={i * 0.08}>
              <div
                className="group relative cursor-pointer"
                onMouseEnter={() => setActiveProject(i)}
                onMouseLeave={() => setActiveProject(null)}
                onClick={() => {
                  if (project.github_url) window.open(project.github_url, "_blank");
                  else if (project.demo_url) window.open(project.demo_url, "_blank");
                }}
              >
                <div className="grid grid-cols-[3rem_1fr_auto] md:grid-cols-[3rem_1fr_auto_auto] items-center gap-6 py-6 transition-colors" style={{ borderBottom: `1px solid ${theme.border}` }}>
                  <span className="text-xs" style={{ color: theme.muted, fontFamily: "'DM Mono', monospace" }}>0{i + 1}</span>
                  <div>
                    <h3
                      className="text-xl md:text-3xl font-normal transition-colors duration-300"
                      style={{ fontFamily: "'Playfair Display', serif", color: activeProject === i ? theme.primary : theme.foreground }}
                    >
                      {project.name}
                    </h3>
                    <p className="text-sm mt-1 hidden md:block" style={{ color: theme.muted + "99" }}>{project.description}</p>
                  </div>
                  <div className="hidden md:flex gap-2">
                    {(project.tech_stack || []).slice(0, 3).map((tag) => (
                      <span key={tag} className="text-xs px-2 py-1" style={{ border: `1px solid ${theme.border}`, color: theme.muted, fontFamily: "'DM Mono', monospace" }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                  <ArrowUpRight size={18} className="transition-all duration-200" style={{ color: activeProject === i ? theme.primary : theme.muted }} />
                </div>

                {project.image_url && (
                  <div className={`pointer-events-none absolute right-20 top-1/2 -translate-y-1/2 w-52 h-36 overflow-hidden transition-all duration-300 z-10 ${activeProject === i ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}>
                    <img src={project.image_url} alt={project.name} className="w-full h-full object-cover" />
                  </div>
                )}
              </div>
            </FadeIn>
          )) : (
            <div className="py-12 text-center" style={{ color: theme.muted }}>Loading projects...</div>
          )}
        </div>
      </section>

      {/* Image band */}
      <FadeIn>
        <div className="relative h-[45vw] max-h-[500px] overflow-hidden">
          <div className="w-full h-full bg-surface-container flex items-center justify-center opacity-50" style={{ backgroundColor: theme.card }}>
             {/* Fallback pattern if no image */}
             <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)", backgroundSize: "32px 32px" }}></div>
          </div>
          <div className="absolute inset-0" style={{ background: `linear-gradient(to right, ${theme.bg}, transparent, ${theme.bg})` }} />
          <div className="absolute inset-0 flex items-center justify-center">
            <blockquote className="text-center text-2xl md:text-4xl font-light italic max-w-2xl px-8" style={{ fontFamily: "'Playfair Display', serif", color: theme.foreground + "cc" }}>
              "Talk is cheap. Show me the code."
            </blockquote>
          </div>
        </div>
      </FadeIn>

      {/* Services */}
      <section id="services" className="py-24 px-6 md:px-10 max-w-7xl mx-auto">
        <FadeIn>
          <div className="flex items-baseline justify-between mb-16 pt-8" style={{ borderTop: `1px solid ${theme.border}` }}>
            <h2 className="text-xs tracking-[0.25em] uppercase" style={{ color: theme.muted, fontFamily: "'DM Mono', monospace" }}>Services & Expertise</h2>
          </div>
        </FadeIn>
        <div className="grid md:grid-cols-2 gap-px" style={{ backgroundColor: theme.border }}>
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <FadeIn key={service.number} delay={i * 0.07}>
                <div
                  className="p-8 md:p-12 transition-colors duration-300 h-full"
                  style={{ backgroundColor: theme.bg }}
                  onMouseEnter={e => e.currentTarget.style.backgroundColor = theme.card}
                  onMouseLeave={e => e.currentTarget.style.backgroundColor = theme.bg}
                >
                  <div className="flex items-start justify-between mb-8">
                    <Icon size={20} style={{ color: theme.primary }} />
                    <span className="text-xs" style={{ color: theme.muted, fontFamily: "'DM Mono', monospace" }}>{service.number}</span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-normal mb-4" style={{ fontFamily: "'Playfair Display', serif", color: theme.foreground }}>
                    {service.title}
                  </h3>
                  <p className="font-light leading-relaxed text-sm" style={{ color: theme.muted }}>{service.desc}</p>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </section>

      {/* Stack */}
      {stack.length > 0 && (
        <FadeIn>
          <div className="py-10 px-6 md:px-10" style={{ borderTop: `1px solid ${theme.border}`, borderBottom: `1px solid ${theme.border}` }}>
            <div className="max-w-7xl mx-auto">
              <p className="text-xs tracking-[0.25em] uppercase mb-8 text-center" style={{ color: theme.muted, fontFamily: "'DM Mono', monospace" }}>Tools & Technologies</p>
              <div className="flex flex-wrap justify-center gap-x-8 gap-y-3">
                {stack.map((item) => (
                  <span key={item} className="text-sm font-light tracking-widest uppercase transition-colors hover:text-white" style={{ color: theme.muted + "99" }}>
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </FadeIn>
      )}

      {/* About */}
      <section id="about" className="py-24 px-6 md:px-10 max-w-7xl mx-auto">
        <FadeIn>
          <div className="pt-8 mb-16" style={{ borderTop: `1px solid ${theme.border}` }}>
            <h2 className="text-xs tracking-[0.25em] uppercase" style={{ color: theme.muted, fontFamily: "'DM Mono', monospace" }}>About</h2>
          </div>
        </FadeIn>
        <div className="grid md:grid-cols-2 gap-16 items-start">
          <FadeIn>
            <div className="relative">
              <div className="aspect-[3/4] overflow-hidden flex items-center justify-center" style={{ backgroundColor: theme.card }}>
                <div className="text-[12rem] leading-none opacity-5 font-serif">A</div>
              </div>
              <div className="absolute -bottom-4 -right-4 px-4 py-2 text-xs tracking-widest uppercase" style={{ backgroundColor: theme.primary, color: theme.primaryFg, fontFamily: "'DM Mono', monospace" }}>
                Developer
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.15}>
            <div className="pt-4">
              <h3 className="text-4xl md:text-5xl font-normal leading-tight mb-8" style={{ fontFamily: "'Playfair Display', serif", color: theme.foreground }}>
                Ali Ahmad<br />
                <em className="italic" style={{ color: theme.primary }}>Raza Sheikh</em>
              </h3>
              <p className="font-light leading-relaxed mb-6" style={{ color: theme.muted }}>
                I'm a BCA student and full-stack developer passionate about building robust digital experiences. Whether it's a dynamic web application or an interactive game project, I love turning complex problems into elegant code.
              </p>
              <p className="font-light leading-relaxed mb-12" style={{ color: theme.muted }}>
                With a strong foundation in modern frontend frameworks and backend architecture, I focus on delivering seamless performance and intuitive user experiences.
              </p>

              <div className="grid grid-cols-3 gap-6 pt-8 mb-12" style={{ borderTop: `1px solid ${theme.border}` }}>
                {[["BCA", "Student"], ["13+", "Projects"], ["Future", "Founder"]].map(([num, label]) => (
                  <div key={label}>
                    <div className="text-3xl font-light" style={{ fontFamily: "'Playfair Display', serif", color: theme.primary }}>{num}</div>
                    <div className="text-xs mt-1 tracking-widest uppercase" style={{ color: theme.muted, fontFamily: "'DM Mono', monospace" }}>{label}</div>
                  </div>
                ))}
              </div>

              <div className="flex gap-4">
                {[{ icon: Github, label: "GitHub", url: "https://github.com/ali071205" }, 
                  { icon: Linkedin, label: "LinkedIn", url: "https://linkedin.com/in/ali-ahmad-raza-sheikh-760aa335b" }, 
                  { icon: Mail, label: "Email", url: "mailto:aliahmad071205@gmail.com" }].map(({ icon: Icon, label, url }) => (
                  <a
                    key={label}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="w-10 h-10 flex items-center justify-center transition-all duration-200"
                    style={{ border: `1px solid ${theme.border}`, color: theme.muted }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = theme.primary; e.currentTarget.style.color = theme.primary; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = theme.border; e.currentTarget.style.color = theme.muted; }}
                  >
                    <Icon size={15} />
                  </a>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-24 px-6 md:px-10 max-w-7xl mx-auto">
        <FadeIn>
          <div className="pt-8 mb-16" style={{ borderTop: `1px solid ${theme.border}` }}>
            <h2 className="text-xs tracking-[0.25em] uppercase" style={{ color: theme.muted, fontFamily: "'DM Mono', monospace" }}>Contact</h2>
          </div>
        </FadeIn>
        <div className="grid md:grid-cols-2 gap-16 items-start">
          <FadeIn>
            <h3 className="text-5xl md:text-7xl font-normal leading-tight" style={{ fontFamily: "'Playfair Display', serif", color: theme.foreground }}>
              Let's build<br />something<br />
              <em className="italic" style={{ color: theme.primary }}>amazing.</em>
            </h3>
          </FadeIn>
          <FadeIn delay={0.15}>
            <div className="space-y-8">
              <p className="font-light leading-relaxed" style={{ color: theme.muted }}>
                Looking for a passionate developer who brings both technical skills and creative thinking to every project? Let's talk!
              </p>
              <a href="mailto:aliahmad071205@gmail.com" className="flex items-center gap-3 transition-colors hover:text-white" style={{ color: theme.foreground }}>
                <Mail size={16} style={{ color: theme.muted }} />
                <span className="pb-0.5" style={{ borderBottom: `1px solid ${theme.border}` }}>aliahmad071205@gmail.com</span>
                <ExternalLink size={12} style={{ color: theme.muted }} />
              </a>
              <a
                href="mailto:aliahmad071205@gmail.com"
                className="inline-flex items-center gap-3 px-8 py-4 text-sm tracking-wide transition-opacity duration-200 hover:opacity-90 group"
                style={{ backgroundColor: theme.primary, color: theme.primaryFg }}
              >
                Get in touch
                <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 md:px-10 py-8" style={{ borderTop: `1px solid ${theme.border}` }}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs" style={{ color: theme.muted, fontFamily: "'DM Mono', monospace" }}>
          <span>© {new Date().getFullYear()} Ali Ahmad Raza Sheikh. All rights reserved.</span>
          <div className="flex items-center gap-4">
            <a href="/admin" className="tracking-widest uppercase hover:text-white transition-colors" style={{ color: theme.muted }}>Admin Panel</a>
            <span className="tracking-widest uppercase">Built with precision.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
