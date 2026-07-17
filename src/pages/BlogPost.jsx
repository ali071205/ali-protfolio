import { useParams, Link } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { SEO } from '../components/SEO';
import { Nav } from '../components/portfolio/Nav';
import { Footer } from '../components/portfolio/Footer';

export default function BlogPost() {
  const { slug } = useParams();
  const { blogs, loading } = useData();
  const blog = blogs.find(b => b.slug === slug);

  if (loading) return <div className="h-screen flex items-center justify-center bg-background text-foreground dark">Loading...</div>;
  if (!blog) return <div className="h-screen flex items-center justify-center bg-background text-foreground dark">Article not found</div>;

  return (
    <div className="relative bg-background text-foreground dark min-h-screen">
      <SEO 
        title={`${blog.title} | Ali Ahmad Raza Sheikh`} 
        description={blog.description}
        keywords={blog.tags?.join(', ')}
        url={`https://ali-portfolio-pi-rust.vercel.app/blog/${slug}`}
        image={blog.image_url}
        type="article"
      />
      <Nav />
      <main className="pt-32 pb-20 max-w-3xl mx-auto px-4">
        <Link to="/blog" className="text-mint mb-8 inline-block hover:underline">← Back to Articles</Link>
        <h1 className="text-4xl md:text-5xl font-display text-gradient-neon mb-6 leading-tight">{blog.title}</h1>
        <div className="flex gap-2 flex-wrap mb-8">
          {blog.tags?.map(tag => (
            <span key={tag} className="px-3 py-1 bg-white/5 rounded-full text-sm text-cyan-glow">{tag}</span>
          ))}
        </div>
        {blog.image_url && <img src={blog.image_url} alt={blog.title} className="w-full h-64 md:h-96 object-cover rounded-2xl mb-12 border border-white/10" />}
        
        {/* Simple markdown render (in production you might use react-markdown) */}
        <div className="prose prose-invert prose-mint max-w-none whitespace-pre-line leading-relaxed text-lg">
          {blog.content}
        </div>
      </main>
      <Footer />
    </div>
  );
}
