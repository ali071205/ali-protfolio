import { Link } from 'react-router-dom';
import { useData } from '../../context/DataContext';

export function LatestBlogs() {
  const { blogs } = useData();
  
  if (!blogs || blogs.length === 0) return null;

  // Only show latest 3 published blogs
  const latestBlogs = blogs.filter(b => b.published).slice(0, 3);

  if (latestBlogs.length === 0) return null;

  return (
    <section id="latest-blogs" className="relative py-24">
      <div className="absolute inset-0 bg-background" />
      <div className="relative mx-auto max-w-7xl px-4">
        <div className="text-center mb-16">
          <p className="font-mono text-mint text-sm tracking-widest uppercase mb-4">Topical Authority</p>
          <h2 className="text-4xl md:text-5xl font-display text-gradient-neon">Latest Articles</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {latestBlogs.map(blog => (
            <Link to={`/blog/${blog.slug}`} key={blog.id} className="group relative glass-strong rounded-2xl p-6 transition-all hover:-translate-y-2 hover:border-mint/30">
              {blog.image_url && (
                <div className="w-full h-40 mb-6 rounded-xl overflow-hidden border border-white/10">
                  <img src={blog.image_url} alt={blog.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
              )}
              <h3 className="text-xl font-display text-foreground group-hover:text-mint transition-colors mb-3 line-clamp-2">{blog.title}</h3>
              <p className="text-sm text-muted-foreground mb-6 line-clamp-3">{blog.description}</p>
              
              <div className="mt-auto flex flex-wrap gap-2">
                {(blog.tags || []).slice(0, 3).map(tag => (
                  <span key={tag} className="text-[10px] uppercase tracking-widest px-2 py-1 bg-white/5 border border-white/5 text-cyan-glow rounded">
                    {tag}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Link to="/blog" className="inline-block px-8 py-4 glass-strong text-mint font-display tracking-widest uppercase text-sm rounded-xl hover:bg-mint/10 transition-colors">
            View All Articles
          </Link>
        </div>
      </div>
    </section>
  );
}
