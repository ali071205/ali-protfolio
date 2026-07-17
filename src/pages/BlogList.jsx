import { Link } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { SEO } from '../components/SEO';
import { Nav } from '../components/portfolio/Nav';
import { Footer } from '../components/portfolio/Footer';

export default function BlogList() {
  const { blogs, loading } = useData();

  if (loading) return <div className="h-screen flex items-center justify-center bg-background text-foreground dark">Loading...</div>;

  return (
    <div className="relative bg-background text-foreground dark min-h-screen">
      <SEO 
        title="Blog | Ali Ahmad Raza Sheikh" 
        description="Read articles about web development, React, Python, and AI by Ali Ahmad Raza Sheikh."
        keywords="react blog, python tutorials, web development articles, ali ahmad raza blog"
        url="https://ali-portfolio-pi-rust.vercel.app/blog"
      />
      <Nav />
      <main className="pt-32 pb-20 max-w-4xl mx-auto px-4">
        <h1 className="text-4xl md:text-6xl font-display text-gradient-neon mb-12">Articles</h1>
        
        <div className="space-y-8">
          {blogs.length === 0 ? (
            <p className="text-muted-foreground">No articles published yet.</p>
          ) : (
            blogs.map(blog => (
              <Link to={`/blog/${blog.slug}`} key={blog.id} className="block group glass-strong rounded-2xl p-6 hover:-translate-y-1 transition-all">
                <h2 className="text-2xl font-display text-foreground group-hover:text-mint transition-colors mb-2">{blog.title}</h2>
                <p className="text-muted-foreground mb-4">{blog.description}</p>
                <div className="flex gap-2 flex-wrap">
                  {blog.tags?.map(tag => (
                    <span key={tag} className="text-xs uppercase tracking-widest text-cyan-glow bg-white/5 px-2 py-1 rounded">{tag}</span>
                  ))}
                </div>
              </Link>
            ))
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
