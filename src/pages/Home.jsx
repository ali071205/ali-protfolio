import { Nav } from "../components/portfolio/Nav";
import { Hero } from "../components/portfolio/Hero";
import { Journey } from "../components/portfolio/Journey";
import { SkillsTree } from "../components/portfolio/SkillsTree";
import { Projects } from "../components/portfolio/Projects";
import { Achievements } from "../components/portfolio/Achievements";
import { About } from "../components/portfolio/About";
import { Contact } from "../components/portfolio/Contact";
import { Footer } from "../components/portfolio/Footer";

export default function Home() {
  return (
    <div className="relative bg-background text-foreground dark">
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
