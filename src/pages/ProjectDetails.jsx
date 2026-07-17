import { useParams, Link } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { SEO } from '../components/SEO';
import { Nav } from '../components/portfolio/Nav';
import { Footer } from '../components/portfolio/Footer';

export default function ProjectDetails() {
  const { slug } = useParams();
  const { projects, loading } = useData();
  const project = projects.find(p => p.slug === slug || p.id === slug);

  if (loading) return <div className="h-screen flex items-center justify-center bg-background text-foreground dark">Loading...</div>;
  if (!project) return <div className="h-screen flex items-center justify-center bg-background text-foreground dark">Project not found</div>;

  return (
    <div className="relative bg-background text-foreground dark min-h-screen">
      <SEO 
        title={`${project.name} | Ali Ahmad Raza Sheikh`} 
        description={project.description}
        keywords={project.tech_stack.join(', ')}
        url={`https://ali-portfolio-pi-rust.vercel.app/project/${slug}`}
        image={project.image_url}
      />
      <Nav />
      <main className="pt-32 pb-20 max-w-4xl mx-auto px-4">
        <Link to="/" className="text-mint mb-8 inline-block hover:underline">← Back to Portfolio</Link>
        <h1 className="text-4xl md:text-6xl font-display text-gradient-neon mb-6">{project.name}</h1>
        {project.image_url && <img src={project.image_url} alt={project.name} className="w-full rounded-2xl mb-8 border border-white/10" />}
        <div className="flex gap-2 flex-wrap mb-8">
          {project.tech_stack.map(tech => (
            <span key={tech} className="px-3 py-1 bg-white/5 rounded-full text-sm text-cyan-glow">{tech}</span>
          ))}
        </div>
        <p className="text-lg text-muted-foreground whitespace-pre-line leading-relaxed">{project.description}</p>
        
        <div className="mt-12 flex gap-4">
          {project.demo_url && <a href={project.demo_url} target="_blank" rel="noreferrer" className="px-6 py-3 bg-mint/10 text-mint rounded-xl hover:bg-mint/20 transition">Live Demo</a>}
          {project.github_url && <a href={project.github_url} target="_blank" rel="noreferrer" className="px-6 py-3 bg-white/5 rounded-xl hover:bg-white/10 transition">GitHub Repo</a>}
        </div>
      </main>
      <Footer />
    </div>
  );
}
