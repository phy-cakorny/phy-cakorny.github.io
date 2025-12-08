import { ArrowDown } from "lucide-react";
import { Particles } from "./Particles";


export const HeroSection = () => {
    return (
        <section 
        id="hero"
        className="relative min-h-screen flex flex-col justify-center items-center px-4"
        >
            <div className="container max-w-4xl mx-auto text-center z-10">
                <div className="space-y-6">
                    <h1 className="text-4xl md:text-6xl tracking-tightfont-bold">
                        <span className="opacity-0 animate-fade-in"> Hi, I'm </span>
                        <span className="text-primary opacity-0 animate-fade-in-delay-1"> 
                            {" "}
                            Paige!
                        </span>
                    </h1>

                    <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto opacity-0 animate-fade-in-delay-3">
                        <span>
                            Electrical and Computer Engineering & Computer Science
                        </span>

                        <span className="block text-primary text-xl md:text-2xl">
                            @ Cornell University
                        </span>
                    </p>

                    <div className="opacity-0 animate-fade-in-delay-4 pt-4">
                        <a href="#projects" className="cosmic-button">
                            View My Work
                        </a>
                    </div>
                </div>
            </div>

            <a 
                href="#about" 
                className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce cursor-pointer hover:scale-110 transition-transform duration-300"
                aria-label="Scroll to about section"
            >
                {/* <span className="text-sm text-muted-foreground mb-2">
                    Scroll
                </span> */}
                <ArrowDown className="h-5 w-5 text-primary animate-pulse-subtle" />
            </a>
            <Particles
                className="absolute inset-0 -z-10"
                quantity={Math.floor(window.innerWidth / 5)}
                ease={80}
                staticity={50}
                color="--primary"
                size={0.8}
            />
        </section>
    );
};