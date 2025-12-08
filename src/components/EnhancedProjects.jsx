import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { ExternalLink, Github, FileText } from "lucide-react";
import { cn } from "@/lib/utils";
import projects from "@/lib/projects.tsx";


const categories = ["all", "hardware", "software", "research", "teaching"];

const PopoutProjectCard = ({
  projectKey,
  logo,
  company,
  role,
  start,
  end,
  location,
  description,
  children,
}) => {
  const [open, setOpen] = useState(false);

  // Close on ESC key
  useEffect(() => {
    const handler = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <>
      {/* Base Card */}
      <div
        onClick={() => setOpen(true)}
        className="bg-card rounded-xl p-6 shadow-sm cursor-pointer hover:shadow-md transition 
                  flex items-center gap-4"
      >
        {/* Logo */}
        <div className="w-12 h-12 flex-shrink-0 rounded-lg overflow-hidden bg-muted">
          <img
            src={logo}
            alt={`${company} logo`}
            className="w-full h-full object-contain"
          />
        </div>

        {/* Text */}
        <div className="flex flex-col flex-1 min-w-0">
          <h3 className="text-xl font-bold">{company}</h3>
          <p className="text-foreground/70 text-sm">
            {role} | {start} - {end || "Present"} | {location}
          </p>
          <p className="text-foreground/60 mt-2 line-clamp-2">{description}</p>
        </div>
      </div>


      {/* Popout */}
      <AnimatePresence>
        {open && (
          <>
            {/* Dim + Blur Background */}
            <motion.div
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />

            {/* Centered Card */}
            <motion.div
              className="fixed z-50 top-1/2 left-1/2
              w-[90vw] h-[90vh]
              -translate-x-1/2 -translate-y-1/2 
              bg-card rounded-2xl shadow-2xl 
              overflow-y-auto p-10"
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{
                opacity: 1,
                scale: 1,
                transition: { type: "spring", stiffness: 160, damping: 20 },
              }}
              exit={{ opacity: 0, scale: 0.7 }}
            >
              {/* Close Button */}
              <button
                onClick={() => setOpen(false)}
                className="absolute top-6 right-6 text-foreground/60 hover:text-foreground text-xl"
              >
                ✕
              </button>

              <div className="bg-card rounded-xl p-6 transition flex items-center  gap-4">
                {/* Logo */}
                <div className="w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-muted">
                  <img
                    src={logo}
                    alt={`${company} logo`}
                    className="w-full h-full object-contain"
                  />
                 </div>

                {/* Text */}
                <div className="flex flex-col flex-1 min-w-0">
                  <h1 className="text-xl md:text-2xl font-bold">{company}</h1>
                  <p className="text-foreground/70 text-base md:text-md">
                    {role} | {start} - {end || "Present"} | {location}
                  </p>
                  <p className="text-foreground/60 mt-2 line-clamp-2 text-base md:text-md">{description}</p>
                </div>
                </div>


                {/* Media + Details */}
                <div className="mt-6">
                  {children}
                </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default function EnhancedProjects({ 
  activeTab: initialActiveTab,
}) {
  const [activeCategory, setActiveCategory] = useState(initialActiveTab || "all");
  
  // Filter projects by category
  const filteredProjects = Object.entries(projects).filter(([key, project]) => {
    if (activeCategory === "all") return true;
    return project.category === activeCategory;
  });
  
  if (filteredProjects.length === 0) {
    return <div className="text-center py-12">No projects found in this category.</div>;
  }

  // Expanded project
  const [expandedProject, setExpandedProject] = useState(null);

  const toggleExpand = (key) => {
    setExpandedProject((prev) => (prev === key ? null : key));
  };

  return (
    <div className="container mx-auto max-w-5xl">
      {/* Category Tabs */}
      <div className="flex flex-wrap justify-center gap-3 mb-8">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={cn(
              "px-6 py-2 rounded-full transition-all duration-300 capitalize font-medium",
              activeCategory === category
                ? "bg-primary text-primary-foreground shadow-lg"
                : "bg-card text-foreground/80 hover:bg-card/80 hover:text-primary"
            )}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Projects List */}
      <div className="space-y-6">
        {filteredProjects.map(([projectKey, project]) => {
          const { logo, role, company, location, start, end, description, media } = project;
          const isOpen = expandedProject === projectKey;

          return (
            <PopoutProjectCard
              projectKey={projectKey}
              logo={logo}
              company={company}
              role={role}
              start={start}
              end={end}
              location={location}
              description={description}
            >
              {media.map((mediaItem, index) => (
                <div key={index} className="bg-card rounded-xl p-6">
                  <div className="flex flex-col lg:flex-row gap-6">
                    
                    {/* Media Content */}
                    <div className="flex-1">
                      {mediaItem.path && (
                        <div className="mb-4">
                          {mediaItem.type === "video" && (
                            <video
                              src={mediaItem.path}
                              controls
                              autoPlay
                              muted
                              loop
                              playsInline
                              className="w-full rounded-lg"
                              style={{ maxHeight: "400px" }}
                            />
                          )}
                          {mediaItem.type === "image" && (
                            <img
                              src={mediaItem.path}
                              alt={mediaItem.caption}
                              className="w-full rounded-lg"
                              style={{ maxHeight: "400px", objectFit: "contain" }}
                            />
                          )}
                          {mediaItem.type === "model" && (
                            <model-viewer
                              src={mediaItem.path}
                              alt={mediaItem.caption}
                              auto-rotate
                              camera-controls
                              className="w-full rounded-lg"
                              style={{ height: "400px" }}
                            />
                          )}
                          {mediaItem.type === "file" && (
                            <div className="w-full rounded-lg bg-card">
                              <iframe
                                src={mediaItem.path}
                                className="w-full rounded-t-lg"
                                style={{ height: "600px" }}
                              />
                            </div>
                          )}
                        </div>
                      )}

                      {/* Caption */}
                      {mediaItem.caption && (
                        <p className="text-md text-foreground/60 mb-4 items-center">
                          {mediaItem.caption}
                        </p>
                      )}

                      {mediaItem.type === "file" && (
                        <div className="p-4"> 
                          <a
                            href={mediaItem.path}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm"
                          >
                            <FileText className="h-4 w-4" />
                            Open in New Tab
                          </a>
                        </div>
                      )}
                      
                      {/* Skills */}
                      {mediaItem.skills?.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-6 justify-center">
                          {mediaItem.skills.map((skill, i) => (
                            <div
                              key={i}
                              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-primary/10 border border-primary/20"
                            >
                              {skill.icon && (
                                <span className="text-primary">{skill.icon}</span>
                              )}
                              <span className="text-sm font-medium text-foreground">
                                {skill.name}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Project Details */}
                      {mediaItem.projectdetails && (
                        <div className="mb-6 mt-6 p-4">
                          <h4 className="text-xl font-semibold text-foreground mb-1">
                            {mediaItem.projectdetails.name}
                          </h4>
                          <p className="text-sm text-foreground/70 mb-4">
                            {mediaItem.projectdetails.date}
                          </p>
                          <ul className="list-disc list-inside space-y-2 text-foreground/80 text-md leading-relaxed text-left">
                          {mediaItem.projectdetails.details.map((detail, i) => (
                            <li key={i}>{detail}</li>
                            ))
                          }
                          </ul>
                        </div>
                      )}

                      {/* Links */}
                      {(mediaItem.externalLink || mediaItem.githubLink) && (
                        <div className="flex flex-wrap justify-center gap-3 mt-4">
                          {mediaItem.externalLink && (
                            <a
                              href={mediaItem.externalLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm"
                            >
                              <ExternalLink className="h-4 w-4" />
                              {company} Website
                            </a>
                          )}

                          {Array.isArray(mediaItem.githubLink) &&
                            mediaItem.githubLink.length > 0 && (
                              <div className="flex gap-2">
                                {mediaItem.githubLink.map((link, j) => (
                                  <a
                                    key={j}
                                    href={link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 px-4 py-2 border border-primary rounded-lg hover:bg-primary/10 hover:border-primary transition-colors text-sm"
                                  >
                                    <Github className="h-4 w-4" />
                                    {mediaItem.githubLink.length > 1
                                      ? `Code ${j + 1}`
                                      : "Code"}
                                  </a>
                                ))}
                              </div>
                            )}
                        </div>
                      )}
                    </div>

                    {/* Preview Card */}
                    {mediaItem.preview && (
                      <div className="lg:w-64 flex-shrink-0">
                        <div className="rounded-lg overflow-hidden">
                          <img
                            src={mediaItem.preview}
                            alt="Preview"
                            className="w-full h-auto"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </PopoutProjectCard>
          );
        })}
      </div>
    </div>
  );
}
