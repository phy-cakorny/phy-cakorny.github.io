import { ThemeToggle } from "../components/ThemeToggle";
import { StarBackground } from "../components/StarBackground";
import { Navbar } from "../components/Navbar";

import { HeroSection } from "../components/HeroSection";
import { AboutSection } from "../components/AboutSection";

export const Home = () => {
    return (
        <div className="min-h-screen bg-background text-foreground overflow-x-hidden">

            {/* theme toggle */}
            <ThemeToggle />

            {/* background effects */}
            <StarBackground />

            {/* navbar */}   
            <Navbar />

            {/* main conent */}
            <main>
                <HeroSection />
                <AboutSection />
                {/* <ProjectsSection /> */}
                {/* <ContactSe ction /> */}
            </main>

            {/* footer */}
        </div>
    );
};