-- Run this in your Supabase SQL Editor to fix the 404 console errors

CREATE TABLE IF NOT EXISTS trophies (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  icon TEXT,
  date TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS skills (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  level INTEGER DEFAULT 0,
  icon TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE trophies ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read trophies" ON trophies FOR SELECT TO anon USING (true);
CREATE POLICY "Public read trophies auth" ON trophies FOR SELECT TO authenticated USING (true);
CREATE POLICY "Admin all trophies" ON trophies FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Public read skills" ON skills FOR SELECT TO anon USING (true);
CREATE POLICY "Public read skills auth" ON skills FOR SELECT TO authenticated USING (true);
CREATE POLICY "Admin all skills" ON skills FOR ALL TO authenticated USING (true) WITH CHECK (true);
