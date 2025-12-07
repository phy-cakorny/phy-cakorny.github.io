import '@google/model-viewer';
import GithubProjects from "../components/GithubProjects";

export const ProjectsSection = () => {
    return (
        <section id="projects" className="py-24 px-4 relative">
            <div className="container mx-auto max-w-5xl">
                <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
                    My <span className="text-primary">Projects</span>
                </h2>

                <div className="project-model">
                    <model-viewer
                        src="/robot2023.glb"
                        // src="https://modelviewer.dev/shared-assets/models/Astronaut.glb"
                        alt="2023 Competition Robot"
                        auto-rotate
                        camera-controls
                        style={{ width: '100%', height: '500px' }}
                    ></model-viewer>
                </div>

                <GithubProjects username="phy-cakorny" max={6} />
            </div>
        </section>
    );
}