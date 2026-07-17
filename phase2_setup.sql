-- ============================================================
-- Ali Ahmad Raza Sheikh Portfolio - Phase 2 SEO Setup
-- Run this SQL in your Supabase SQL Editor
-- ============================================================

-- 1. Add slug to existing projects table
ALTER TABLE projects ADD COLUMN IF NOT EXISTS slug TEXT UNIQUE;

-- Generate slugs for existing projects based on their name
UPDATE projects SET slug = LOWER(REPLACE(REPLACE(name, ' ', '-'), '.', '')) WHERE slug IS NULL;

-- 2. Blogs Table
CREATE TABLE IF NOT EXISTS blogs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  content TEXT NOT NULL,
  image_url TEXT,
  tags TEXT[] DEFAULT '{}',
  published BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 3. Row Level Security (RLS) for blogs
ALTER TABLE blogs ENABLE ROW LEVEL SECURITY;

-- Public can read published blogs
CREATE POLICY "Public read published blogs" ON blogs FOR SELECT TO anon USING (published = true);
CREATE POLICY "Public read published blogs auth" ON blogs FOR SELECT TO authenticated USING (true);

-- Admin can do everything
CREATE POLICY "Admin all blogs" ON blogs FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- 4. Insert dummy blog post
INSERT INTO blogs (title, slug, description, content, image_url, tags) VALUES
(
  'How I Built My Portfolio with React and Supabase',
  'building-portfolio-react-supabase',
  'A deep dive into the architecture and SEO strategies behind my developer portfolio.',
  '# Building My Portfolio\n\nThis is a sample blog post. I used **React**, **Vite**, and **Supabase** to build this portfolio. It has monster-level SEO.',
  '/assets/flappy_bird.png',
  ARRAY['React', 'Supabase', 'SEO']
) ON CONFLICT (slug) DO NOTHING;
