import { useEffect, useRef } from "react";

export const ParticleCloud = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        let particles = [];
        const particleCount = Math.floor(
            (window.innerWidth * window.innerHeight) / 20000
        );
        const mouse = { x: null, y: null };

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        const createParticles = () => {
            particles = [];
            for (let i = 0; i < particleCount; i++) {
                particles.push({
                    x: Math.random() * canvas.width * 0.6 + canvas.width * 0.2,
                    y: Math.random() * canvas.height * 0.6 + canvas.height * 0.2,
                    radius: Math.random() * 3 + 1,
                    dx: Math.random() - 0.5,
                    dy: Math.random() - 0.5,
                    opacity: Math.random() * 0.5 + 0.5,
                });
            }
        };

        const drawParticles = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach((particle) => {
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
                ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
                ctx.fill();
            });
        };

        const updateParticles = () => {
            particles.forEach((particle) => {
                const dx = mouse.x - particle.x;
                const dy = mouse.y - particle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 100) {
                    particle.x -= dx / 20;
                    particle.y -= dy / 20;
                } else {
                    particle.x += particle.dx;
                    particle.y += particle.dy;
                }

                if (particle.x < 0.2 * canvas.width || particle.x > 0.8 * canvas.width) particle.dx *= -1;
                if (particle.y < 0.2 * canvas.height || particle.y > 0.8 * canvas.height) particle.dy *= -1;
            });
        };

        const animate = () => {
            drawParticles();
            updateParticles();
            requestAnimationFrame(animate);
        };

        const onMouseMove = (e) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        };

        window.addEventListener("resize", resizeCanvas);
        window.addEventListener("mousemove", onMouseMove);

        resizeCanvas();
        createParticles();
        animate();

        return () => {
            window.removeEventListener("resize", resizeCanvas);
            window.removeEventListener("mousemove", onMouseMove);
        };
    }, []);

    return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />;
};