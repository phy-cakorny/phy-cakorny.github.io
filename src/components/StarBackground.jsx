import { useEffect, useState } from "react";

export const StarBackground = () => {
    const [stars, setStars] = useState([])
    const [meteors, setMeteors] = useState([])
    const [isDarkMode, setIsDarkMode] = useState(false)

    useEffect(() => {
        const storedTheme = localStorage.getItem("theme")
        setIsDarkMode(storedTheme === "dark")

        const handleStorageChange = () => {
            const theme = localStorage.getItem("theme")
            setIsDarkMode(theme === "dark")
        }

        window.addEventListener("storage", handleStorageChange)

        const observer = new MutationObserver(() => {
            setIsDarkMode(document.documentElement.classList.contains("dark"))
        })
        observer.observe(document.documentElement, { attributes: true })

        generateStars(); 
        generateMeteors();

        const handleResize = () => {
            generateStars();
        }; 

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
            window.removeEventListener("storage", handleStorageChange);
            observer.disconnect();
        }
    }, []);

    const generateStars = () => {
        const numStars = Math.floor(
            (window.innerWidth * window.innerHeight) / 10000
        );
        const newStars = [];

        for (let i = 0; i < numStars; i++) {
            newStars.push({
                id: i,
                size: Math.random() * 3 + 1,
                x: Math.random() * 100,
                y: Math.random() * 100,
                opacity: Math.random() * 0.5 + 0.5,
                animationDuration: Math.random() * 4 + 2,
            });
        }

        setStars(newStars);
    }

    const generateMeteors = () => {
        const numMeteors = 4;
        const newMeteors = [];

        for (let i = 0; i < numMeteors; i++) {
            newMeteors.push({
                id: i,
                size: Math.random() * 2 + 0.5,
                x: Math.random() * 100,
                y: Math.random() * 20,
                opacity: Math.random() * 0.4 + 0.6,
                delay: Math.random() * 6,
                animationDuration: Math.random() * 2 + 1.5,
            });
        }

        setMeteors(newMeteors);
    }

    if (!isDarkMode) {
        return null;
    }

    return (
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
            {stars.map((star) => (
                <div
                    key={star.id}
                    className="absolute bg-white rounded-full animate-pulse-subtle"
                    style={{
                        width: star.size + "px",
                        height: star.size + "px",
                        left: star.x + "%",
                        top: star.y + "%",
                        opacity: star.opacity,
                        animationDuration: star.animationDuration + "s",
                    }}
                />
            ))}

            {meteors.map((meteor) => (
                <div
                    key={meteor.id}
                    className="meteor animate-meteor"
                    style={{
                        width: meteor.size * 50 + "px",
                        height: meteor.size * 2 + "px",
                        left: meteor.x + "%",
                        top: meteor.y + "%",
                        animationDelay: meteor.delay,
                        animationDuration: meteor.animationDuration + "s",
                    }}
                />
            ))}
        </div>
    );
};