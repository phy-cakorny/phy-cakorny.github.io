import '@google/model-viewer';
import EnhancedProjects from "../components/EnhancedProjects";

export const ProjectsSection = () => {
    return (
        <section id="projects" className="py-24 px-4 relative">
            <div className="container mx-auto max-w-5xl">
                <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center underline underline-offset-8 decoration-primary">
                    My <span className="text-primary">Projects</span>
                </h2>

                <EnhancedProjects username="phy-cakorny" max={6} />
            </div>
        </section>
    );
}