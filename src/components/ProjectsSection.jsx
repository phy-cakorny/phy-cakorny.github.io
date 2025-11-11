import GithubProjects from "../components/GithubProjects";

export const ProjectsSection = () => {
    return (
        <section id="projects" className="py-24 px-4 relative">
            <div className="container mx-auto max-w-5xl">
                <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
                    My <span className="text-primary">Projects</span>
                </h2>

                <GithubProjects username="phy-cakorny" max={6} />
            </div>
        </section>
    );
}