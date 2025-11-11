import { cn } from "@/lib/utils";
import { useState } from "react";
import { FaHtml5, FaCss3Alt, FaJs, FaReact, FaAws, FaGitAlt, FaDocker, FaFigma } from "react-icons/fa";
import { SiTailwindcss, SiNextdotjs, SiPostgresql, SiNodedotjs } from "react-icons/si";
import { BiLogoVisualStudio } from "react-icons/bi";


const skills = [
    // Frontend
  { name: "HTML", category: "frontend", icon: <FaHtml5 className="text-orange-500 text-3xl" /> },
  { name: "CSS", category: "frontend", icon: <FaCss3Alt className="text-blue-500 text-3xl" /> },
  { name: "JavaScript", category: "frontend", icon: <FaJs className="text-yellow-400 text-3xl" /> },
  { name: "React", category: "frontend", icon: <FaReact className="text-sky-400 text-3xl" /> },
  { name: "Tailwind CSS", category: "frontend", icon: <SiTailwindcss className="text-cyan-400 text-3xl" /> },
  { name: "Next.js", category: "frontend", icon: <SiNextdotjs className="text-gray-800 dark:text-white text-3xl" /> },

  // Backend
  { name: "Node.js", category: "backend", icon: <SiNodedotjs className="text-green-500 text-3xl" /> },
  { name: "PostgreSQL", category: "backend", icon: <SiPostgresql className="text-blue-600 text-3xl" /> },
  { name: "AWS", category: "backend", icon: <FaAws className="text-orange-400 text-3xl" /> },

  // Tools
  { name: "Git/GitHub", category: "tools", icon: <FaGitAlt className="text-red-500 text-3xl" /> },
  { name: "Docker", category: "tools", icon: <FaDocker className="text-sky-600 text-3xl" /> },
  { name: "Figma", category: "tools", icon: <FaFigma className="text-pink-500 text-3xl" /> },
  { name: "VS Code", category: "tools", icon: <BiLogoVisualStudio className="text-blue-500 text-3xl" /> },
];

const categories = ["all", "frontend", "backend", "tools"];


export const SkillsSection = () => {
    const [activeCategory, setActiveCategory] = useState("all");

    const filteredSkills = skills.filter(
        (skill) => activeCategory === "all" || skill.category === activeCategory
    );

    return <section id="skills" className="py-24 px-4 bg-secondary/30">
        <div className="container mx-auto max-w-5xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
                 My <span className="text-primary"> Skills</span>
            </h2>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category, key) => (
                <button
                    key={key}
                    onClick={() => setActiveCategory(category)}
                    className={cn(
                        "px-5 py-2 rounded-full transition-colors duration-300 capitalize",
                        activeCategory === category
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary/70 text-forefround hover:bd-secondary"
                    )}
                >
                    {category}
                </button>
            ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSkills.map((skill, key) => (
                <div
                    key={key}
                    className="bg-card p-6 rounded-lg shadow-xs card-hover flex flex-col items-center"
                >
                    <div className="mb-3">{skill.icon}</div>
                    <h3 className="font-semibold text-lg">{skill.name}</h3>
                </div>
            ))}
        </div>
    </section>;
};