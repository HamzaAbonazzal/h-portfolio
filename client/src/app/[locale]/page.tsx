import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { Technologies } from "@/components/sections/Technologies";
import { Projects } from "@/components/sections/Projects";
import { Stats } from "@/components/sections/Stats";
import { Contact } from "@/components/sections/Contact";

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Skills />
      <Technologies />
      <Stats />
      <Projects />
      <Contact />
    </>
  );
}