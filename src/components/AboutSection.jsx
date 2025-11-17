import { Code, Briefcase, MapPin, Cpu } from "lucide-react";

export const AboutSection = () => {
    return (
        <section id="about" className="py-24 px-4 relative">
            {" "}
            <div className="container mx-auto max-w-5xl">
                <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
                    About 
                    <span className="text-primary"> Me</span>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6"> 
                        <h3 className="text-2xl font-semibold opacity-0 animate-fade-in">
                            Passionate about 
                            <span className="text-primary font-semibold">
                                {" "}robotics and artificial intelligence{" "}
                            </span>
                            in society.
                        </h3>

                        <p className="text-muted-foreground mt-1 text-lg opacity-0 animate-fade-in-delay-1">
                            BS in ECE / CS (May 2027)
                        </p>

                        <p className="flex items-center gap-2 text-muted-foreground text-sm justify-center">
                            <MapPin /> California • New York
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center md:justify-center">
                            {/* <a href="#contact" className="cosmic-button">
                                {" "}
                                Get in touch!
                            </a> */}

                            <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="px-6 py-2 rounded-full border border-primary text-primary hover:bg-primary/10 transition-colors duration-300">
                                {" "}
                                View Resume
                            </a>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-6">
                        <div className="gradient-border p-6 card-hover">
                            <div className="flex items-start gap-4">
                                <div className="p-3 rounded-full bg-primary/10">
                                    <Code className="h-6 w-6 text-primary" />
                                </div>
                                <div className="text-left">
                                    <h4 className="font-semibold text-lg"> Full Stack Engineering </h4>
                                    <p className="text-muted-foreground">
                                        Building full-stack systems integrating LLM pipelines, UI/UX prototypes, and scalable database backends.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="gradient-border p-6 card-hover">
                            <div className="flex items-start gap-4">
                                <div className="p-3 rounded-full bg-primary/10">
                                    <Cpu className="h-6 w-6 text-primary" />
                                </div>
                                <div className="text-left">
                                    <h4 className="font-semibold text-lg"> Digital Logic & Embedded Systems </h4>
                                    <p className="text-muted-foreground">
                                        Designing synchronous digital circuits, verifying HDL, and deploying hardware implementations on FPGA.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="gradient-border p-6 card-hover">
                            <div className="flex items-start gap-4">
                                <div className="p-3 rounded-full bg-primary/10">
                                    <Briefcase className="h-6 w-6 text-primary" />
                                </div>
                                <div className="text-left">
                                    <h4 className="font-semibold text-lg">Technical Project Leadership</h4>
                                    <p className="text-muted-foreground">
                                        Leading multidisciplinary teams, managing timelines, and delivering iterative milestones using agile methods.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}