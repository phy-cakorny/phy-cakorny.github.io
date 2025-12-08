import { Mail } from "lucide-react";
import { FaLinkedin, FaGithub } from "react-icons/fa";

const socialLinks = [
  {
    name: "GitHub",
    icon: FaGithub,
    href: "https://github.com/phy-cakorny",
  },
  {
    name: "LinkedIn",
    icon: FaLinkedin,
    href: "https://www.linkedin.com/in/paige-yun-cakorny/",
  },
  {
    name: "Email",
    icon: Mail,
    href: "mailto:paigehyun@gmail.com",
  },
];

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background/50 backdrop-blur-sm py-8 mt-16">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Copyright */}
          <div className="text-lg text-primary">
            © {currentYear} Paige. All rights reserved.
          </div>

          {/* Social Media Links */}
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-primary transition-colors duration-300 p-5 rounded-full hover:bg-primary/10"
                  aria-label={social.name}
                >
                  <Icon className="h-6 w-6" />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
};
