import { TbCube3dSphere, TbWaveSquare, TbBrandSupabase, TbCube, TbUsers } from "react-icons/tb";
import { GiLaserWarning, GiSolderingIron } from "react-icons/gi";
import { LuCircuitBoard } from "react-icons/lu";
import { SiKicad, SiAltiumdesigner, SiPython, SiGit, SiLinux, SiAutodesk, SiTailwindcss, SiNextdotjs, SiPostgresql, SiNodedotjs } from "react-icons/si";
import { VscTools } from "react-icons/vsc";
import { FaHtml5, FaCss3Alt, FaJs, FaReact, FaAws, FaGitAlt, FaDocker, FaFigma } from "react-icons/fa";

interface Skills {
    name: string;
    icon: React.ReactNode;
}

interface ProjectDetails {
    name: string;
    date: string;
    details: string[];
}
  
interface Media {
    type: "image" | "video" | "model" | "file";
    path: string | null;
    caption: string;
    skills: Skills[];
    preview: string | null;
    externalLink: string | null;
    githubLink: string[] | null;
    projectdetails: ProjectDetails | null;
}

interface Project {
    logo: string;
    role: string;
    company: string;
    location: string;
    start: string;
    end: string | null;
    description: string;
    media: Media[];
    category: "hardware" | "software" | "research" | "teaching";
}

interface Projects {
    [key: string]: Project;
}

const projects: Projects = {
    RPL: {
        logo: "/logos/RPL.png",
        role: "Student Research Assistant",
        company: "Cornell Rapid Prototyping Lab",
        location: "Ithaca, NY",
        start: "August 2023",
        end: "Present",
        description:
          "Operate 3D printers(FDM and resin) and laser cutters (CO2) \
          to fabricate parts for 40+ research groups and project teams at \
          Cornell University",
        category: "hardware",
        media: [
          {
            type: "video",
            path: "/projects/RPL_timelapse.mp4",
            caption: "Timelapse of 3D printing the clock tower",
            skills: [
              { name: "3D Printing", icon: <TbCube3dSphere /> },
              { name: "Laser Cutting", icon: <GiLaserWarning /> },
              { name: "CAD", icon: <TbCube /> },
              { name: "Fusion 360", icon: <SiAutodesk /> },
              { name: "Inventor", icon: <SiAutodesk /> },
              { name: "Hand Tools", icon: <VscTools /> },

            ],
            preview: null,
            externalLink: "https://rpl.engineering.cornell.edu/",
            githubLink: null,
            projectdetails: null,
          },
        ],
    },
    C2S2: {
        logo: "/logos/C2S2.png",
        role: "Printed Circuit Board (PCB) Designer",
        company: "Cornell Custom Silicon Systems (C2S2)",
        location: "Ithaca, NY",
        start: "August 2024",
        end: "Present",
        description:
          "Design and fabricate test-ready boards that interface with \
          custom analog, digital, and RF chips",
        category: "research",
        media: [
          {
            type: "image",
            path: "/projects/C2S2_tapeout.png",
            caption: "Digital, analog, and RFIC tapeouts (June 2025)",
            skills: [
              { name: "Schematic Design", icon: <LuCircuitBoard /> },
              { name: "Oscilloscope Debugging", icon: <TbWaveSquare /> },
              { name: "Soldering", icon: <GiSolderingIron /> },
              { name: "Breadboarding", icon: <TbBrandSupabase /> },
              { name: "KiCad", icon: <SiKicad /> },
              { name: "Altium", icon: <SiAltiumdesigner />},
              { name: "Git", icon: <SiGit /> },
              { name: "Python", icon: <SiPython />},
              { name: "Linux", icon: <SiLinux /> },
            ],
            preview: null,
            externalLink: "https://c2s2.engineering.cornell.edu/",
            githubLink: null,
            projectdetails: {
                name: "Cornell Lab of Orinithology (LoO)", 
                date: "2024-present",
                details: [
                    "Multi-year collaboration with the LoO to develop low-power, agnostic bird-tag system to classify scrub jayvocalizations and track head-bobbing motion",
                    "Collaborated with analog, digital, and RF engineers to validate board requirements, integrate test structures, and ensure manufacturable, high-reliability hardware",
                    "Designed a 4-layer PCB with integrated microphones, IMUs, microcontrollers, and a RISC-V processor; reduced board area by 30% through optimized component placement and routing",
                    "Performed SPICE simulations (DC/AC/transient) to validate custom analog front-end circuits and sensor interfaces",
                    "Improved breadboarding and board-verification to reduce hardware iteration cycles by ~25% by identifying design flaws and debugging interfaces prior to fabrication",
                ]                
            },
          },
        ],
    },
    Verantos: {
        logo:"/logos/Verantos.png",
        role: "AI/ML and Application Developer Intern",
        company: "Verantos",
        location: "Menlo Park, CA",
        start: "May 2025",
        end: "August 2025",
        description:
          "Developed scalable backend systems and AI-assisted clinical code mapping tools to support evidence-generation workflows.",
        category: "software",
        media: [
          {
            type: "image",
            path: "/projects/verantos.png",
            caption: "Full stack pipeline for clinical concept mapping",
            skills: [
              { name: "Python", icon: <SiPython /> },
              { name: "Git", icon: <SiGit /> },
              { name: "Linux", icon: <SiLinux /> },
              { name: "React", icon: <FaReact  /> },
              { name: "Next.js", icon: <SiNextdotjs /> },
              { name: "PostgreSQL", icon: <SiPostgresql /> },
              { name: "AWS", icon: <FaAws /> },
              { name: "Docker", icon: <FaDocker /> },
              { name: "API Development", icon: <VscTools /> },
            ],
            preview: null,
            externalLink: "https://www.verantos.com/",
            githubLink: null,
            projectdetails: {
              name: "AI-Assisted Clinical Code Mapping Platform",
              date: "Summer 2025",
              details: [
                "Designed scalable backend APIs enabling epidemiologists to map clinical concepts to OMOP-standardized codes",
                "Built endpoints for CSV ingestion and Snowflake-backed data retrieval; integrated AWS S3 for reliable storage",
                "Integrated domain-specific clinical language models to automate mapping suggestions, reducing manual workload by ~80%",
                "Worked closely with UX and epidemiology teams to iterate on frontend workflows and mapping interface",
              ],
            },
          },
        ],
    },
    CS1112: {
        logo: "/logos/Cornell.png",
        role: "Couse Consultant (CS 1112)",
        company: "Cornell Bowers CIS",
        location: "Ithaca, NY",
        start: "January 2024",
        end: "May 2024",
        description:
          "Assisted 100+ students with introductory programming and algorithmic problem-solving in Python",
        category: "teaching",
        media: [
          {
            type: "file",
            path: "/projects/CS1112_syll.pdf",
            caption: "Course syllabus",
            skills: [
              { name: "Python", icon: <SiPython /> },
              { name: "Linux", icon: <SiLinux /> },
            ],
            preview: null,
            externalLink: null,
            githubLink: null,
            projectdetails: null,
          },
        ],
      },
    ECE2300: {
        logo: "/logos/Cornell.png",
        role: "Teaching Assistant (ECE 2300)",
        company: "College of Engineering",
        location: "Ithaca, NY",
        start: "Fall 2025",
        end: "Present",
        description:
            "Provide academic support for digital design (ECE 2300)",
        category: "teaching",
        media: [
            {
            type: "image",
            path: "/projects/ECE2300.png",
            caption: "Embedded door-monitoring system",
            skills: [
                { name: "Python", icon: <SiPython /> },
                { name: "Digital Logic", icon: <TbBrandSupabase /> },
                { name: "Verilog", icon: <LuCircuitBoard /> },
                { name: "Linux", icon: <SiLinux /> },
            ],
            preview: null,
            externalLink: null,
            githubLink: null,
            projectdetails: {
                name: "Undergraduate Teaching Assistant (ECE 2300)",
                date: "2025–present",
                details: [
                "Led weekly discussion sections, hosted consulting hours, and proctored exams",
                "Supported over 200 students in digital logic design labs, covering combinational circuits, FSMs, and hardware debugging",
                "Conducted exam review sessions and helped design lab materials for FPGA-based development boards",
                ],
            },
            },
        ],
    },
    FRC: {
        logo: "/logos/SpaceCookies.png",
        role: "Team Captain & Drive Team Coach",
        company: "FIRST Robotics FRC Team 1868",
        location: "Mountain View, CA",
        start: "August 2019",
        end: "May 2023",
        description:
          "Led team operations, technical development, strategy, and outreach for an award-winning robotics program.",
        category: "hardware",
        media: [
          {
            type: "model",
            path: "/projects/robot2023.glb",
            caption: "FRC 1868 x Mechanism & Competition Strategy",
            skills: [
              { name: "Mechanical Design", icon: <TbCube3dSphere /> },
              { name: "CAD", icon: <TbCube /> },
              { name: "Leadership", icon: <TbUsers /> },
              { name: "Strategy", icon: <TbWaveSquare /> },
            ],
            preview: null,
            externalLink: "https://frc.spacecookies.org/",
            githubLink: null,
            projectdetails: {
              name: "FIRST Robotics Competition – Team 1868",
              date: "2019–2023",
              details: [
                "Led workshops, offseason projects, and technical training for 60+ team members",
                "Managed robot mechanism design and directed on-field match strategy as drive team coach",
                "Represented team in technical interviews and award presentations",
                "Organized major outreach events promoting STEM accessibility for young girls",
              ],
            },
          },
        ],
      },
};

export default projects;

