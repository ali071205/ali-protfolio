-- ============================================================
-- Ali Ahmad Raza Sheikh Portfolio - Supabase Database Setup
-- Run this SQL in your Supabase SQL Editor:
-- https://supabase.com/dashboard/project/sgmnkfsjhwlolhmfxjqj/sql/new
-- ============================================================

-- Projects Table
CREATE TABLE IF NOT EXISTS projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  tech_stack TEXT[] DEFAULT '{}',
  github_url TEXT,
  demo_url TEXT,
  image_url TEXT,
  category TEXT DEFAULT 'Web',
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Skills Table
CREATE TABLE IF NOT EXISTS skills (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  icon TEXT DEFAULT 'code',
  level INTEGER DEFAULT 80,
  category TEXT DEFAULT 'Frontend',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Experience Table
CREATE TABLE IF NOT EXISTS experience (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  company TEXT NOT NULL,
  period TEXT NOT NULL,
  type TEXT DEFAULT 'Full-Time',
  bullets TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Messages Table (Contact Form)
CREATE TABLE IF NOT EXISTS messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  read BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- About Table (single row)
CREATE TABLE IF NOT EXISTS about (
  id INTEGER DEFAULT 1 PRIMARY KEY,
  bio TEXT DEFAULT 'Full-stack developer & BCA student passionate about building digital experiences.',
  bio_extended TEXT,
  profile_image TEXT DEFAULT '/assets/profile.png',
  available BOOLEAN DEFAULT true,
  email TEXT DEFAULT 'aliahmad071205@gmail.com',
  phone TEXT DEFAULT '+91 123-456-7890',
  address TEXT DEFAULT '286 Noori Mohalla, Sagore, Dist. Dhar',
  github TEXT DEFAULT 'https://github.com/ali071205',
  linkedin TEXT DEFAULT 'https://linkedin.com/in/ali-ahmad-raza-sheikh-760aa335b',
  twitter TEXT DEFAULT '',
  dob TEXT DEFAULT 'December 7, 2005',
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================================
-- Seed Initial Data
-- ============================================================

-- Insert about info
INSERT INTO about (id, bio, bio_extended, available, email, phone, address, github, linkedin, dob)
VALUES (
  1,
  'I''m Ali Ahmad Raza Sheikh — a Fullstack Web Developer currently in BCA 2nd year with a passion for building robust digital experiences and a long-term goal of becoming a game developer.',
  'I know 2 foreign languages (basic Japanese, reading Arabic, and English). I have completed 13 projects spanning web development, games, and tools. My technical skills include C, HTML5, C++, Python, CSS3, SEO, and C#.',
  true,
  'aliahmad071205@gmail.com',
  '+91 123-456-7890',
  '286 Noori Mohalla, Sagore, Dist. Dhar - 452002',
  'https://github.com/ali071205',
  'https://linkedin.com/in/ali-ahmad-raza-sheikh-760aa335b',
  'December 7, 2005'
) ON CONFLICT (id) DO UPDATE SET
  bio = EXCLUDED.bio,
  bio_extended = EXCLUDED.bio_extended,
  updated_at = now();

-- Insert initial skills
INSERT INTO skills (name, icon, level, category) VALUES
  ('HTML5', 'html', 95, 'Frontend'),
  ('CSS3', 'css', 90, 'Frontend'),
  ('JavaScript', 'javascript', 80, 'Frontend'),
  ('React', 'data_object', 75, 'Frontend'),
  ('Python', 'terminal', 85, 'Languages'),
  ('C', 'code', 90, 'Languages'),
  ('C++', 'code', 70, 'Languages'),
  ('C#', 'code', 100, 'Languages'),
  ('SEO', 'search', 100, 'Tools'),
  ('Node.js', 'api', 65, 'Backend'),
  ('Supabase', 'database', 70, 'Backend'),
  ('Git', 'fork_right', 80, 'Tools')
ON CONFLICT DO NOTHING;

-- Insert initial projects
INSERT INTO projects (name, description, tech_stack, github_url, demo_url, image_url, category, featured) VALUES
  ('Flappy Bird Clone', 'A fun Flappy Bird clone built with Python and Pygame featuring smooth collision detection and score tracking.', ARRAY['Python', 'Pygame'], 'https://github.com/ali071205', '', '/assets/flappy_bird.png', 'Game', true),
  ('Number Guessing Game', 'Interactive number guessing game with difficulty levels, hints system, and score tracking.', ARRAY['Python', 'CLI'], 'https://github.com/ali071205', '', '/assets/number_gussing.png', 'Game', false),
  ('Sudoku Solver', 'Automated Sudoku solver using backtracking algorithm with visual step-by-step solution display.', ARRAY['Python', 'Algorithm'], 'https://github.com/ali071205', '', '/assets/sudoku.png', 'Tool', true),
  ('Tic-Tac-Toe', 'Classic Tic-Tac-Toe with AI opponent using minimax algorithm and clean UI.', ARRAY['Python', 'AI'], 'https://github.com/ali071205', '', '/assets/tic-tac-to.png', 'Game', false),
  ('Food Ordering App', 'Full-stack food ordering application with menu management and cart functionality.', ARRAY['HTML', 'CSS', 'JavaScript'], 'https://github.com/ali071205', '', '/assets/food.png', 'Web', true),
  ('Developer Portfolio', 'This portfolio website built with React, Vite, Tailwind CSS, and Supabase with AI-powered admin panel.', ARRAY['React', 'Vite', 'Tailwind', 'Supabase'], 'https://github.com/ali071205', '', '', 'Web', true)
ON CONFLICT DO NOTHING;

-- Insert experience
INSERT INTO experience (title, company, period, type, bullets) VALUES
  ('BCA Student — 2nd Year', 'College', '2024 — Present', 'Full-Time', ARRAY[
    'Studying Bachelor of Computer Applications with focus on software development.',
    'Building full-stack web and game projects to strengthen practical skills.',
    'Learning Japanese and Arabic as foreign languages alongside technical studies.'
  ]),
  ('Self-Taught Developer', 'Independent', '2022 — Present', 'Self-Taught', ARRAY[
    'Completed 13+ projects ranging from games in Python to full-stack web apps.',
    'Mastered HTML, CSS, JavaScript, React, Python, C, C++, C#, and SEO.',
    'Built AI-powered admin panel integrating Google Gemini with Supabase backend.'
  ])
ON CONFLICT DO NOTHING;

-- ============================================================
-- Row Level Security (RLS) — Public read, admin write
-- ============================================================

-- Enable RLS
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE experience ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE about ENABLE ROW LEVEL SECURITY;

-- Public can read projects, skills, experience, about
CREATE POLICY "Public read projects" ON projects FOR SELECT TO anon USING (true);
CREATE POLICY "Public read skills" ON skills FOR SELECT TO anon USING (true);
CREATE POLICY "Public read experience" ON experience FOR SELECT TO anon USING (true);
CREATE POLICY "Public read about" ON about FOR SELECT TO anon USING (true);

-- Public can insert messages (contact form)
CREATE POLICY "Public insert messages" ON messages FOR INSERT TO anon WITH CHECK (true);

-- Authenticated (admin) can do everything
CREATE POLICY "Admin all projects" ON projects FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin all skills" ON skills FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin all experience" ON experience FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin all messages" ON messages FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin all about" ON about FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- ============================================================
-- DONE! Now go to Supabase Auth and create admin user:
-- Email: aliahmad071205@gmail.com  Password: aliahmad001
-- Dashboard: https://supabase.com/dashboard/project/sgmnkfsjhwlolhmfxjqj/auth/users
-- ============================================================
