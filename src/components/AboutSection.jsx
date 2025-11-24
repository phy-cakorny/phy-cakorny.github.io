import { Code, Briefcase, MapPin, Cpu } from "lucide-react";
import { useEffect, useState } from "react";


const FlipCard = ({ icon: Icon, title, description }) => {
    const [isFlipped, setIsFlipped] = useState(false);

    return (
        <div
            className="relative w-full h-40 cursor-pointer [perspective:1000px]"
            onClick={() => setIsFlipped(!isFlipped)}
        >
            <div
                className={`absolute inset-0 transition-transform duration-500 [transform-style:preserve-3d] ${
                    isFlipped ? "[transform:rotateY(180deg)]" : ""
                }`}
            >
                <div className="absolute inset-0 rounded-xl p-6 backface-hidden gradient-border
                                flex items-center gap-8 card-hover">
                    <div className="p-3 rounded-full bg-primary/20 ring-1 ring-primary/20">
                        <Icon className="h-7 w-7 text-primary" />
                    </div>
                     <div className="flex flex-col justify-center">
                        <h2 className="font-semibold text-xl text-left">{title}</h2>
                    </div>
                </div>

                <div className="absolute inset-0 gradient-border rounded-xl p-6 [transform:rotateY(180deg)] backface-hidden 
                                flex items-center justify-center card-hover">
                    <p className="text-muted-foreground text-center">{description}</p>
                </div>
            </div>
        </div>
    );
};

export const AboutSection = () => {
    return (
        <section id="about" className="py-24 lg:py-20 relative">
            {" "}
            <div className="container mx-auto max-w-5xl">
                <h2 className="text-3xl md:text-4xl font-bold font-clashDisplay mb-12 text-center underline underline-offset-8 decoration-primary">
                    About
                    <span className="text-primary"> Me</span>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6"> 
                        <img 
                            src="/headshot.jpg" 
                            alt="Profile Picture" 
                            className="w-36 h-36 rounded-full mx-auto object-cover" 
                        />
                        <h3 className="text-2xl font-semibold opacity-0 animate-fade-in">
                            Passionate about 
                            <span className="text-primary font-semibold">
                                {" "}robotics and artificial intelligence{" "}
                            </span>
                            in society.
                        </h3>

                        <p className="text-muted-foreground mt-1 text-lg opacity-0 animate-fade-in-delay-1">
                            BS in ECE & CS (May 2027)
                        </p>

                        <p className="flex items-center gap-2 text-muted-foreground text-sm justify-center">
                            <MapPin /> California • New York
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center md:justify-center">
                            {/* <a href="#contact" className="cosmic-button">
                                {" "}
                                Get in touch!
                            </a> */}

                            <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="px-6 py-2 rounded-full border border-primary text-primary hover:bg-primary/20 transition-colors duration-300">
                                {" "}
                                View Resume
                            </a>
                        </div>
                    </div>
                
                    <div className="grid grid-cols-1 gap-6">
                         <FlipCard
                            icon={Code}
                            title="Full Stack Engineering"
                            description="Building full-stack systems integrating LLM pipelines, UI/UX prototypes, and scalable database backends."
                        />
                        <FlipCard
                            icon={Cpu}
                            title="Digital Logic & Embedded Systems"
                            description="Designing synchronous digital circuits, verifying HDL, and deploying hardware implementations on FPGA."
                        />
                        <FlipCard
                            icon={Briefcase}
                            title="Technical Project Leadership"
                            description="Leading subteams, managing timelines, and delivering iterative milestones using agile methods."
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}