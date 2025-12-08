import { ThemeToggle } from "../components/ThemeToggle";
// import { StarBackground } from "../components/StarBackground";
// import { ParticleCloud } from "../components/ParticleCloud";

import { Navbar } from "../components/Navbar";
import { HeroSection } from "../components/HeroSection";
import { AboutSection } from "../components/AboutSection";
import { ProjectsSection } from "../components/ProjectsSection";
import { HobbiesSection } from "../components/HobbiesSection";
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
                <HobbiesSection />
            </main>

            {/* footer */}
            <Footer />
        </div>
    );
};