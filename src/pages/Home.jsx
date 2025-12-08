import { ThemeToggle } from "../components/ThemeToggle";
// import { StarBackground } from "../components/StarBackground";
// import { ParticleCloud } from "../components/ParticleCloud";

import { Navbar } from "../components/Navbar";
import { HeroSection } from "../components/HeroSection";
import { AboutSection } from "../components/AboutSection";
import { SkillsSection } from "../components/SkillsSection";
import { ProjectsSection } from "../components/ProjectsSection";
import { Footer } from "../components/Footer";

export const Home = () => {
    return (
        <div className="min-h-screen bg-background text-foreground overflow-x-hidden">

            {/* navbar */}   
            <Navbar />

            {/* main conent */}
            <main>
                <HeroSection />
                <AboutSection />
                {/* <SkillsSection /> */}
                <ProjectsSection />
            </main>

            {/* footer */}
            <Footer />
        </div>
    );
};