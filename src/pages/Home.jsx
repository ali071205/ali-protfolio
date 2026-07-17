import { Nav } from "../components/portfolio/Nav";
import { Hero } from "../components/portfolio/Hero";
import { Journey } from "../components/portfolio/Journey";
import { SkillsTree } from "../components/portfolio/SkillsTree";
import { Projects } from "../components/portfolio/Projects";
import { Achievements } from "../components/portfolio/Achievements";
import { About } from "../components/portfolio/About";
import { Contact } from "../components/portfolio/Contact";
import { Footer } from "../components/portfolio/Footer";

import { SEO } from "../components/SEO";

export default function Home() {
  return (
    <div className="relative bg-background text-foreground dark">
      <SEO 
        title="Ali Ahmad Raza Sheikh | Full Stack React & Python Developer" 
        description="Portfolio of Ali Ahmad Raza Sheikh, a Full Stack Developer specializing in React, Python, and scalable web applications."
        keywords="ali ahmad raza sheikh, freelance react developer, python web developer, full stack developer portfolio, frontend engineer"
        url="https://ali-portfolio-brown-tau.vercel.app/"
      />
      <Nav />
      <main>
        <Hero />
        <Journey />
        <SkillsTree />
        <Projects />
        <Achievements />
        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
