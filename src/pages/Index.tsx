import { TopNav } from "@/components/portfolio/TopNav";
import { Hero } from "@/components/portfolio/Hero";
import { Experience } from "@/components/portfolio/Experience";
import { Projects } from "@/components/portfolio/Projects";
import { Contact } from "@/components/portfolio/Contact";
import { Skills } from "@/components/portfolio/Skills";
const Index = () => (
  <div className="min-h-screen text-foreground">
    <a href="#main-content" className="skip-link">본문으로 건너뛰기</a>
    <TopNav />
    <main id="main-content">
      <div className="mx-auto max-w-7xl px-5 md:px-10 lg:px-12">
        <Hero /><Projects /><Skills /><Experience /><Contact />
      </div>
    </main>
  </div>
);
export default Index;
