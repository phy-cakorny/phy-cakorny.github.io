import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, X, ExternalLink, ChevronLeft, ChevronRight, Quote, ChevronDown, ChevronUp } from "lucide-react";
import { FaPersonRunning } from "react-icons/fa6";
import { GiBlackBelt } from "react-icons/gi";
import races from "@/lib/races";
import taekwondoBlogContent, { taekwondoPhotos } from "@/lib/taekwondo";
import photographyPhotos from "@/lib/photography";

export const HobbiesSection = () => {
  
    const [isGalleryOpen, setIsGalleryOpen] = useState(false);
    const [isLightboxOpen, setIsLightboxOpen] = useState(false);
    const [isRunningTimelineOpen, setIsRunningTimelineOpen] = useState(false);
    const [isTaekwondoGalleryOpen, setIsTaekwondoGalleryOpen] = useState(false);
    const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
    const [racePhotoIndices, setRacePhotoIndices] = useState({});
    const [taekwondoLightboxOpen, setTaekwondoLightboxOpen] = useState(false);
    const [taekwondoCurrentPhotoIndex, setTaekwondoCurrentPhotoIndex] = useState(0);
    const [carouselIndices, setCarouselIndices] = useState({});

    // Close modals on ESC key, navigate lightbox with arrow keys
    useEffect(() => {
        const handler = (e) => {
            if (e.key === "Escape") {
                if (taekwondoLightboxOpen) {
                    setTaekwondoLightboxOpen(false);
                } else if (isLightboxOpen) {
                    setIsLightboxOpen(false);
                } else if (isTaekwondoGalleryOpen) {
                    setIsTaekwondoGalleryOpen(false);
                } else if (isRunningTimelineOpen) {
                    setIsRunningTimelineOpen(false);
                } else if (isGalleryOpen) {
                    setIsGalleryOpen(false);
                }
            } else if (isLightboxOpen) {
                if (e.key === "ArrowLeft") {
                    setCurrentPhotoIndex((prev) => 
                        prev === 0 ? photographyPhotos.length - 1 : prev - 1
                    );
                } else if (e.key === "ArrowRight") {
                    setCurrentPhotoIndex((prev) => 
                        prev === photographyPhotos.length - 1 ? 0 : prev + 1
                    );
                }
            } else if (taekwondoLightboxOpen) {
                if (e.key === "ArrowLeft") {
                    setTaekwondoCurrentPhotoIndex((prev) => 
                        prev === 0 ? taekwondoPhotos.length - 1 : prev - 1
                    );
                } else if (e.key === "ArrowRight") {
                    setTaekwondoCurrentPhotoIndex((prev) => 
                        prev === taekwondoPhotos.length - 1 ? 0 : prev + 1
                    );
                }
            }
        };
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, [isGalleryOpen, isLightboxOpen, isRunningTimelineOpen, isTaekwondoGalleryOpen, taekwondoLightboxOpen, photographyPhotos.length, taekwondoPhotos.length]);

    const openLightbox = (index) => {
        setCurrentPhotoIndex(index);
        setIsLightboxOpen(true);
    };

    const openTaekwondoLightbox = (index) => {
        setTaekwondoCurrentPhotoIndex(index);
        setTaekwondoLightboxOpen(true);
    };

    // Carousel navigation helpers
    const goToNextCarouselPhoto = (carouselIndex, totalPhotos) => {
        setCarouselIndices(prev => ({
            ...prev,
            [carouselIndex]: ((prev[carouselIndex] || 0) + 1) % totalPhotos
        }));
    };

    const goToPreviousCarouselPhoto = (carouselIndex, totalPhotos) => {
        setCarouselIndices(prev => ({
            ...prev,
            [carouselIndex]: ((prev[carouselIndex] || 0) - 1 + totalPhotos) % totalPhotos
        }));
    };

    // Scale helper function
    const getScaleClass = (scale) => {
        const scaleMap = {
            "sm": "max-w-sm",
            "md": "max-w-md",
            "lg": "max-w-lg",
            "xl": "max-w-xl",
            "2xl": "max-w-2xl",
            "3xl": "max-w-3xl",
            "full": "max-w-full"
        };
        return scaleMap[scale] || "max-w-2xl"; // Default to 2xl
    };

    const goToNext = () => {
        setCurrentPhotoIndex((prev) => 
            prev === photographyPhotos.length - 1 ? 0 : prev + 1
        );
    };

    const goToPrevious = () => {
        setCurrentPhotoIndex((prev) => 
            prev === 0 ? photographyPhotos.length - 1 : prev - 1
        );
    };

    const hobbies = [
        {
            name: "Photography",
            icon: Camera,
            description: "Film & Digital",
            hasGallery: photographyPhotos.length > 0
        },
        {
            name: "Running",
            icon: FaPersonRunning,
            description: "XC | TF",
            hasTimeline: races.length > 0
        },
        {
            name: "Taekwondo",
            icon: GiBlackBelt,
            description: "태권도",
            hasGallery: taekwondoPhotos.length > 0
        }
    ];

    return (
        <section id="hobbies" className="py-24 px-4 relative">
            <div className="container mx-auto max-w-5xl">
                <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center underline underline-offset-8 decoration-primary">
                    My <span className="text-primary">Hobbies</span>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {hobbies.map((hobby, index) => {
                        const Icon = hobby.icon;
                        const isPhotography = hobby.name === "Photography";
                        const isRunning = hobby.name === "Running";
                        const isTaekwondo = hobby.name === "Taekwondo";
                        return (
                            <div
                                key={index}
                                onClick={() => {
                                    if (isPhotography) setIsGalleryOpen(true);
                                    if (isRunning && hobby.hasTimeline) setIsRunningTimelineOpen(true);
                                    if (isTaekwondo && hobby.hasGallery) setIsTaekwondoGalleryOpen(true);
                                }}
                                className={`bg-card rounded-xl p-6 transition card-hover flex flex-col items-center text-center gap-4 ${
                                    (isPhotography || (isRunning && hobby.hasTimeline) || (isTaekwondo && hobby.hasGallery)) ? "cursor-pointer" : ""
                                }`}
                            >
                                <div className="p-4 rounded-full bg-primary/20 ring-1 ring-primary/20 flex items-center justify-center">
                                    {isPhotography ? (
                                        <Icon className="h-8 w-8 text-primary" />
                                    ) : (
                                        <Icon className="text-primary" style={{ fontSize: '2rem', width: '2rem', height: '2rem' }} />
                                    )}
                                </div>
                                <h3 className="text-xl font-semibold">{hobby.name}</h3>
                                <p className="text-muted-foreground text-md">
                                    {hobby.description}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Pinterest-Style Gallery Modal */}
            <AnimatePresence>
                {isGalleryOpen && photographyPhotos.length > 0 && (
                    <>
                        {/* Dim + Blur Background */}
                        <motion.div
                            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-md"
                            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
                            animate={{ 
                                opacity: 1,
                                backdropFilter: "blur(12px)"
                            }}
                            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
                            transition={{ duration: 0.4 }}
                            onClick={() => setIsGalleryOpen(false)}
                        />

                        {/* Perspective Container for 3D Effect */}
                        <div 
                            className="fixed inset-0 z-50 pointer-events-none"
                            style={{ perspective: "1000px" }}
                        >
                            {/* Gallery Container */}
                            <motion.div
                                className="fixed top-1/2 left-1/2
                                w-[95vw] max-w-7xl h-[90vh]
                                bg-card rounded-2xl shadow-2xl 
                                overflow-hidden flex flex-col pointer-events-auto"
                                style={{ transformStyle: "preserve-3d" }}
                                initial={{ 
                                    opacity: 0, 
                                    scale: 0.8,
                                    y: "100vh",
                                    rotateX: -15,
                                    x: "-50%",
                                }}
                                animate={{
                                    opacity: 1,
                                    scale: 1,
                                    y: "-50%",
                                    rotateX: 0,
                                    x: "-50%",
                                    transition: { 
                                        type: "spring", 
                                        stiffness: 100,
                                        damping: 20,
                                        mass: 0.8,
                                        delay: 0.1
                                    },
                                }}
                                exit={{ 
                                    opacity: 0, 
                                    scale: 0.8,
                                    y: "100vh",
                                    rotateX: -15,
                                    x: "-50%",
                                    transition: { duration: 0.3 }
                                }}
                                onClick={(e) => e.stopPropagation()}
                            >
                            {/* Header */}
                            <div className="flex items-center justify-between p-6">
                                <h2 className="text-2xl font-bold">Image Gallery</h2>
                                <button
                                    onClick={() => setIsGalleryOpen(false)}
                                    className="text-foreground/60 hover:text-foreground transition-colors p-2 hover:bg-card/80 rounded-lg"
                                >
                                    <X className="h-6 w-6" />
                                </button>
                            </div>

                            {/* Masonry Grid */}
                            <div className="flex-1 overflow-y-auto p-6">
                                <div 
                                    className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4"
                                    style={{ columnGap: '1rem' }}
                                >
                                    {photographyPhotos.map((photo, index) => {
                                        const photoSrc = typeof photo === 'string' ? photo : photo.src;
                                        const caption = typeof photo === 'object' ? photo.caption : undefined;
                                        
                                        return (
                                            <motion.div
                                                key={index}
                                                className="mb-4 break-inside-avoid cursor-pointer group"
                                                onClick={() => openLightbox(index)}
                                                initial={{ 
                                                    opacity: 0, 
                                                    y: 50,
                                                    scale: 0.9,
                                                    rotateY: -10
                                                }}
                                                animate={{ 
                                                    opacity: 1, 
                                                    y: 0,
                                                    scale: 1,
                                                    rotateY: 0
                                                }}
                                                transition={{ 
                                                    delay: 0.3 + (index * 0.03),
                                                    type: "spring",
                                                    stiffness: 100,
                                                    damping: 15
                                                }}
                                            >
                                                <div className="relative overflow-hidden rounded-lg bg-muted">
                                                    <img
                                                        src={photoSrc}
                                                        alt={caption || `Photography ${index + 1}`}
                                                        className="w-auto max-w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
                                                        loading="lazy"
                                                    />
                                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300" />
                                                    {caption && (
                                                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/40 via-black/20 to-transparent p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                                                            <p className="text-white text-sm font-medium">{caption}</p>
                                                        </div>
                                                    )}
                                                </div>
                                            </motion.div>
                                        );
                                    })}
                                </div>
                            </div>
                            </motion.div>
                        </div>
                    </>
                )}
            </AnimatePresence>

            {/* Lightbox for Individual Photo View */}
            <AnimatePresence>
                {isLightboxOpen && photographyPhotos.length > 0 && (
                    <>
                        {/* Dim + Blur Background */}
                        <motion.div
                            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsLightboxOpen(false)}
                        />

                        {/* Lightbox Content */}
                        <motion.div
                            className="fixed z-50 top-1/2 left-1/2
                            w-[95vw] max-w-6xl h-[90vh]
                            -translate-x-1/2 -translate-y-3/4
                            flex items-center justify-center relative"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{
                                opacity: 1,
                                scale: 1,
                                transition: { type: "spring", stiffness: 160, damping: 20 },
                            }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Close Button */}
                            <button
                                onClick={() => setIsLightboxOpen(false)}
                                className="absolute top-4 right-4 p-3 rounded-full bg-black/50 hover:bg-black/70 text-white transition-colors z-20"
                                aria-label="Close lightbox"
                            >
                                <X className="h-6 w-6" />
                            </button>

                            {/* Previous Button */}
                            <button
                                onClick={() => setCurrentPhotoIndex((prev) => 
                                    prev === 0 ? photographyPhotos.length - 1 : prev - 1
                                )}
                                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/50 hover:bg-black/70 text-white transition-colors z-10"
                                aria-label="Previous photo"
                            >
                                <ChevronLeft className="h-6 w-6" />
                            </button>

                            {/* Next Button */}
                            <button
                                onClick={() => setCurrentPhotoIndex((prev) => 
                                    prev === photographyPhotos.length - 1 ? 0 : prev + 1
                                )}
                                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/50 hover:bg-black/70 text-white transition-colors z-10"
                                aria-label="Next photo"
                            >
                                <ChevronRight className="h-6 w-6" />
                            </button>

                            {/* Photo Container */}
                            <div className="flex flex-col items-center justify-center w-full h-full p-8 gap-4">
                                <div className="flex-1 flex items-center justify-center w-full max-w-5xl mx-auto">
                                    <AnimatePresence mode="wait">
                                        <motion.img
                                            key={currentPhotoIndex}
                                            src={typeof photographyPhotos[currentPhotoIndex] === 'string' 
                                                ? photographyPhotos[currentPhotoIndex] 
                                                : photographyPhotos[currentPhotoIndex].src}
                                            alt={typeof photographyPhotos[currentPhotoIndex] === 'object' && photographyPhotos[currentPhotoIndex].caption
                                                ? photographyPhotos[currentPhotoIndex].caption
                                                : `Photography ${currentPhotoIndex + 1}`}
                                            className="max-w-full max-h-[calc(100vh-12rem)] object-contain rounded-lg"
                                            initial={{ opacity: 0, x: 50 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -50 }}
                                            transition={{ duration: 0.3 }}
                                        />
                                    </AnimatePresence>
                                </div>
                                
                                {/* Photo Counter */}
                                <div className="text-white text-sm font-medium bg-black/50 px-4 py-2 rounded-full flex-shrink-0">
                                    {currentPhotoIndex + 1} / {photographyPhotos.length}
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            {/* Race Timeline Modal */}
            <AnimatePresence>
                {isRunningTimelineOpen && races.length > 0 && (
                    <>
                        {/* Dim + Blur Background */}
                        <motion.div
                            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-md"
                            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
                            animate={{ 
                                opacity: 1,
                                backdropFilter: "blur(12px)"
                            }}
                            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
                            transition={{ duration: 0.4 }}
                            onClick={() => setIsRunningTimelineOpen(false)}
                        />

                        {/* Timeline Container */}
                        <div 
                            className="fixed inset-0 z-50 pointer-events-none"
                            style={{ perspective: "1000px" }}
                        >
                            <motion.div
                                className="fixed top-1/2 left-1/2
                                w-[95vw] max-w-6xl h-[90vh]
                                bg-card rounded-2xl shadow-2xl 
                                overflow-hidden flex flex-col pointer-events-auto"
                                style={{ transformStyle: "preserve-3d" }}
                                initial={{ 
                                    opacity: 0, 
                                    scale: 0.8,
                                    y: "100vh",
                                    rotateX: -15,
                                    x: "-50%",
                                }}
                                animate={{
                                    opacity: 1,
                                    scale: 1,
                                    y: "-50%",
                                    rotateX: 0,
                                    x: "-50%",
                                    transition: { 
                                        type: "spring", 
                                        stiffness: 100,
                                        damping: 20,
                                        mass: 0.8,
                                        delay: 0.1
                                    },
                                }}
                                exit={{ 
                                    opacity: 0, 
                                    scale: 0.8,
                                    y: "100vh",
                                    rotateX: -15,
                                    x: "-50%",
                                    transition: { duration: 0.3 }
                                }}
                                onClick={(e) => e.stopPropagation()}
                            >
                                {/* Header */}
                                <div className="flex items-center justify-between p-8">
                                    <div className="flex flex-col items-start text-left pl-8">
                                        <h2 className="text-3xl font-bold mb-1">
                                            Running (2019-Present)
                                        </h2>
                                        <p className="text-primary/80 text-lg font-semibold">Cross Country | Track & Field</p>
                                    </div>
                                    <button
                                        onClick={() => setIsRunningTimelineOpen(false)}
                                        className="text-foreground/60 hover:text-foreground transition-colors p-2 hover:bg-card/80 rounded-lg"
                                    >
                                        <X className="h-6 w-6" />
                                    </button>
                                </div>
                   
                                {/* Timeline Content */}
                                <div className="flex-1 overflow-y-auto p-6">
                                    <div className="max-w-5xl mx-auto relative">
                                        {/* Vertical Timeline Line */}
                                        <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-primary/40 via-primary/60 to-primary/40" 
                                             style={{ height: 'calc(100% - 4rem)' }}
                                        />

                                        {/* Timeline Nodes */}
                                        <div className="relative pb-8">
                                            {races.map((race, index) => {
                                                const isLeft = index % 2 === 0;
                                                
                                                return (
                                                    <motion.div
                                                        key={index}
                                                        className={`relative flex items-center ${isLeft ? 'flex-row' : 'flex-row-reverse'} ${index > 0 ? '-mt-20' : ''}`}
                                                        initial={{ opacity: 0, y: 40 }}
                                                        whileInView={{ opacity: 1, y: 0 }}
                                                        viewport={{ once: true, margin: "-100px" }}
                                                        transition={{ duration: 0.5, delay: index * 0.1 }}
                                                    >
                                                        {/* Timeline Node Content */}
                                                        <div className={`flex-1 ${isLeft ? 'pr-8 text-right' : 'pl-8 text-left'} ${isLeft ? 'md:mr-auto md:ml-0' : 'md:ml-auto md:mr-0'}`}>
                                                            <motion.div
                                                                className={`bg-card/80 backdrop-blur-sm rounded-xl p-6 border border-primary/30 shadow-lg hover:shadow-xl transition-all duration-300 group ${isLeft ? 'md:max-w-md ml-auto' : 'md:max-w-md mr-auto'}`}
                                                                whileHover={{ scale: 1.02, borderColor: 'hsl(var(--primary) / 0.5)' }}
                                                            >
                                                                {/* Race Image */}
                                                                {race.image.length > 0 && (
                                                                    <div className="mb-4 rounded-lg overflow-hidden bg-muted relative h-48 group/image">
                                                                        <AnimatePresence mode="wait">
                                                                            <motion.img
                                                                                key={racePhotoIndices[index] || 0}
                                                                                src={race.image[racePhotoIndices[index] || 0]}
                                                                                alt={`${race.title} - Photo ${(racePhotoIndices[index] || 0) + 1}`}
                                                                                className="w-full h-full object-cover"
                                                                                loading="lazy"
                                                                                initial={{ opacity: 0 }}
                                                                                animate={{ opacity: 1 }}
                                                                                exit={{ opacity: 0 }}
                                                                                transition={{ duration: 0.3 }}
                                                                            />
                                                                        </AnimatePresence>
                                                                        
                                                                        {/* Navigation arrows for multiple photos */}
                                                                        {race.image.length > 1 && (
                                                                            <>
                                                                                <button
                                                                                    onClick={(e) => {
                                                                                        e.stopPropagation();
                                                                                        setRacePhotoIndices(prev => ({
                                                                                            ...prev,
                                                                                            [index]: ((prev[index] || 0) - 1 + race.image.length) % race.image.length
                                                                                        }));
                                                                                    }}
                                                                                    className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 hover:bg-black/70 text-white opacity-0 group-hover/image:opacity-100 transition-opacity z-10"
                                                                                    aria-label="Previous photo"
                                                                                >
                                                                                    <ChevronLeft className="h-4 w-4" />
                                                                                </button>
                                                                                <button
                                                                                    onClick={(e) => {
                                                                                        e.stopPropagation();
                                                                                        setRacePhotoIndices(prev => ({
                                                                                            ...prev,
                                                                                            [index]: ((prev[index] || 0) + 1) % race.image.length
                                                                                        }));
                                                                                    }}
                                                                                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 hover:bg-black/70 text-white opacity-0 group-hover/image:opacity-100 transition-opacity z-10"
                                                                                    aria-label="Next photo"
                                                                                >
                                                                                    <ChevronRight className="h-4 w-4" />
                                                                                </button>
                                                                                {/* Photo indicator dots */}
                                                                                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5 opacity-0 group-hover/image:opacity-100 transition-opacity z-10">
                                                                                    {race.image.map((_, photoIndex) => (
                                                                                        <button
                                                                                            key={photoIndex}
                                                                                            onClick={(e) => {
                                                                                                e.stopPropagation();
                                                                                                setRacePhotoIndices(prev => ({
                                                                                                    ...prev,
                                                                                                    [index]: photoIndex
                                                                                                }));
                                                                                            }}
                                                                                            className={`h-1.5 rounded-full transition-all ${
                                                                                                (racePhotoIndices[index] || 0) === photoIndex
                                                                                                    ? "bg-white w-6"
                                                                                                    : "bg-white/50 w-1.5 hover:bg-white/75"
                                                                                            }`}
                                                                                            aria-label={`Go to photo ${photoIndex + 1}`}
                                                                                        />
                                                                                    ))}
                                                                                </div>
                                                                            </>
                                                                        )}
                                                                    </div>
                                                                )}

                                                                {/* Race Title */}
                                                                <h3 className={`text-xl font-bold text-foreground mb-2 ${isLeft ? 'text-right' : 'text-left'}`}>
                                                                    {race.title}
                                                                </h3>

                                                                {/* Race Date */}
                                                                <p className={`text-muted-foreground mb-4 ${isLeft ? 'text-right' : 'text-left'}`}>
                                                                    {race.year}
                                                                </p>

                                                                {/* Strava Link and Quote Section */}
                                                                <div className={`space-y-2 mt-4 ${isLeft ? 'text-right' : 'text-left'}`}>
                                                                    {/* Strava Link */}
                                                                    {race.stravaLink && (
                                                                        <a
                                                                            href={race.stravaLink}
                                                                            target="_blank"
                                                                            rel="noopener noreferrer"
                                                                            className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 hover:bg-primary/20 text-primary rounded-lg transition-colors text-sm font-medium"
                                                                        >
                                                                            <ExternalLink className="h-4 w-4" />
                                                                            View on Strava
                                                                        </a>
                                                                    )}

                                                                    {/* Quote Section - Expand/Collapse */}
                                                                    {race.quote && (
                                                                        <div className="mt-1">
                                                                            {/* <div className="flex items-center gap-2 text-primary/80 hover:text-primary">
                                                                                <Quote className="h-4 w-4" />
                                                                                <span className="text-sm font-medium">Memory</span>
                                                                            </div> */}
                                                                            <AnimatePresence>
                                                                                    <motion.div
                                                                                        initial={{ opacity: 0, height: 0 }}
                                                                                        animate={{ opacity: 1, height: "auto" }}
                                                                                        exit={{ opacity: 0, height: 0 }}
                                                                                        transition={{ duration: 0.3 }}
                                                                                        className="overflow-hidden"
                                                                                    >
                                                                                        <div className="mt-3 px-4 py-3 bg-card/80">
                                                                                            <p className="text-muted-foreground italic text-sm leading-relaxed">
                                                                                                {race.quote}
                                                                                            </p>
                                                                                        </div>
                                                                                    </motion.div>
                                                                            </AnimatePresence>
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            </motion.div>
                                                        </div>

                                                        {/* Timeline Dot */}
                                                        <div className="absolute left-1/2 transform -translate-x-1/2 z-10 flex items-center justify-center">
                                                            <motion.div
                                                                className="w-4 h-4 bg-primary rounded-full border-4 border-card shadow-lg"
                                                                initial={{ scale: 0 }}
                                                                whileInView={{ scale: 1 }}
                                                                viewport={{ once: true }}
                                                                transition={{ duration: 0.3, delay: index * 0.1 + 0.2 }}
                                                            />
                                                        </div>

                                                        {/* Spacer for mobile */}
                                                        <div className="w-0 md:w-1/2" />
                                                    </motion.div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </>
                )}
            </AnimatePresence>

            {/* Taekwondo Blog-Style Modal */}
            <AnimatePresence>
                {isTaekwondoGalleryOpen && taekwondoBlogContent.length > 0 && (
                    <>
                        {/* Dim + Blur Background */}
                        <motion.div
                            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-md"
                            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
                            animate={{ 
                                opacity: 1,
                                backdropFilter: "blur(12px)"
                            }}
                            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
                            transition={{ duration: 0.4 }}
                            onClick={() => setIsTaekwondoGalleryOpen(false)}
                        />

                        {/* Perspective Container for 3D Effect */}
                        <div 
                            className="fixed inset-0 z-50 pointer-events-none"
                            style={{ perspective: "1000px" }}
                        >
                            {/* Blog Container */}
                            <motion.div
                                className="fixed top-1/2 left-1/2
                                w-[95vw] max-w-4xl h-[90vh]
                                bg-card rounded-2xl shadow-2xl 
                                overflow-hidden flex flex-col pointer-events-auto"
                                style={{ transformStyle: "preserve-3d" }}
                                initial={{ 
                                    opacity: 0, 
                                    scale: 0.8,
                                    y: "100vh",
                                    rotateX: -15,
                                    x: "-50%",
                                }}
                                animate={{
                                    opacity: 1,
                                    scale: 1,
                                    y: "-50%",
                                    rotateX: 0,
                                    x: "-50%",
                                    transition: { 
                                        type: "spring", 
                                        stiffness: 100,
                                        damping: 20,
                                        mass: 0.8,
                                        delay: 0.1
                                    },
                                }}
                                exit={{ 
                                    opacity: 0, 
                                    scale: 0.8,
                                    y: "100vh",
                                    rotateX: -15,
                                    x: "-50%",
                                    transition: { duration: 0.3 }
                                }}
                                onClick={(e) => e.stopPropagation()}
                            >
                                {/* Header */}
                                <div className="flex items-center justify-between p-8">
                                    <div className="flex flex-col items-start text-left pl-8">
                                        <h2 className="text-3xl font-bold mb-1">
                                            Taekwondo (2016-Present)
                                        </h2>
                                        <p className="text-primary/80 text-lg font-semibold">Black Belt | 4th Dan</p>
                                    </div>
                                    <button
                                        onClick={() => setIsTaekwondoGalleryOpen(false)}
                                        className="text-foreground/60 hover:text-foreground transition-colors p-2 hover:bg-card/80 rounded-lg"
                                    >
                                        <X className="h-6 w-6" />
                                    </button>
                                </div>

                                {/* Blog Content */}
                                <div className="flex-1 overflow-y-auto">
                                    <div className="max-w-3xl mx-auto px-8 space-y-4">
                                        {taekwondoBlogContent.map((item, index) => {
                                            if (item.type === "text") {
                                                return (
                                                    <motion.div
                                                        key={index}
                                                        className="prose prose-invert max-w-none"
                                                        initial={{ opacity: 0, y: 20 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        transition={{ delay: index * 0.1 }}
                                                    >
                                                        <p className="text-foreground text-lg leading-relaxed">
                                                            {item.content}
                                                        </p>
                                                    </motion.div>
                                                );
                                            } else if (item.type === "photo") {
                                                const photoIndex = taekwondoPhotos.indexOf(item.src);
                                                const scaleClass = getScaleClass(item.scale);
                                                return (
                                                    <motion.figure
                                                        key={index}
                                                        className="my-8 cursor-pointer group flex flex-col items-center"
                                                        onClick={() => {
                                                            if (photoIndex !== -1) {
                                                                openTaekwondoLightbox(photoIndex);
                                                            }
                                                        }}
                                                        initial={{ opacity: 0, scale: 0.95 }}
                                                        animate={{ opacity: 1, scale: 1 }}
                                                        transition={{ delay: index * 0.1 }}
                                                    >
                                                        <div className={`relative overflow-hidden rounded-xl bg-muted ${scaleClass} w-full aspect-[4/3] flex items-center justify-center`}>
                                                            <img
                                                                src={item.src}
                                                                alt={item.caption || `Taekwondo photo ${index + 1}`}
                                                                className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
                                                                loading="lazy"
                                                            />
                                                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                                                        </div>
                                                        {item.caption && (
                                                            <figcaption className="text-center text-sm text-muted-foreground mt-3 italic">
                                                                {item.caption}
                                                            </figcaption>
                                                        )}
                                                    </motion.figure>
                                                );
                                            } else if (item.type === "carousel") {
                                                const carouselIndex = index;
                                                const currentPhotoIndex = carouselIndices[carouselIndex] || 0;
                                                const currentPhoto = item.photos[currentPhotoIndex];
                                                const totalPhotos = item.photos.length;
                                                const scaleClass = getScaleClass(currentPhoto.scale || item.scale);
                                                
                                                return (
                                                    <motion.figure
                                                        key={index}
                                                        className="my-8 flex flex-col items-center"
                                                        initial={{ opacity: 0, scale: 0.95 }}
                                                        animate={{ opacity: 1, scale: 1 }}
                                                        transition={{ delay: index * 0.1 }}
                                                    >
                                                        <div 
                                                            className={`relative overflow-hidden rounded-xl bg-muted group ${scaleClass} w-full max-w-xl mx-auto aspect-[4/3] flex items-center justify-center`}
                                                            onTouchStart={(e) => {
                                                                e.currentTarget.dataset.touchStart = e.targetTouches[0].clientX.toString();
                                                            }}
                                                            onTouchEnd={(e) => {
                                                                const touchStartX = parseFloat(e.currentTarget.dataset.touchStart || "0");
                                                                if (!touchStartX) return;
                                                                
                                                                const touchEndX = e.changedTouches[0].clientX;
                                                                const distance = touchStartX - touchEndX;
                                                                const minSwipeDistance = 50;
                                                                
                                                                if (Math.abs(distance) > minSwipeDistance) {
                                                                    if (distance > 0) {
                                                                        // Swipe left - next photo
                                                                        goToNextCarouselPhoto(carouselIndex, totalPhotos);
                                                                    } else {
                                                                        // Swipe right - previous photo
                                                                        goToPreviousCarouselPhoto(carouselIndex, totalPhotos);
                                                                    }
                                                                }
                                                            }}
                                                        >
                                                            {/* Carousel Image */}
                                                            <AnimatePresence mode="wait">
                                                                <motion.img
                                                                    key={currentPhotoIndex}
                                                                    src={currentPhoto.src}
                                                                    alt={currentPhoto.caption || `Taekwondo photo ${currentPhotoIndex + 1}`}
                                                                    className="w-full h-full object-contain cursor-pointer"
                                                                    onClick={() => {
                                                                        const photoIndex = taekwondoPhotos.indexOf(currentPhoto.src);
                                                                        if (photoIndex !== -1) {
                                                                            openTaekwondoLightbox(photoIndex);
                                                                        }
                                                                    }}
                                                                    loading="lazy"
                                                                    initial={{ opacity: 0, x: 20 }}
                                                                    animate={{ opacity: 1, x: 0 }}
                                                                    exit={{ opacity: 0, x: -20 }}
                                                                    transition={{ duration: 0.3 }}
                                                                />
                                                            </AnimatePresence>
                                                            
                                                            {/* Navigation Arrows */}
                                                            {item.photos.length > 1 && (
                                                                <>
                                                                    <button
                                                                        onClick={(e) => {
                                                                            e.stopPropagation();
                                                                            goToPreviousCarouselPhoto(carouselIndex, item.photos.length);
                                                                        }}
                                                                        className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 hover:bg-black/70 text-white opacity-0 group-hover:opacity-100 transition-opacity z-10"
                                                                        aria-label="Previous photo"
                                                                    >
                                                                        <ChevronLeft className="h-5 w-5" />
                                                                    </button>
                                                                    <button
                                                                        onClick={(e) => {
                                                                            e.stopPropagation();
                                                                            goToNextCarouselPhoto(carouselIndex, item.photos.length);
                                                                        }}
                                                                        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 hover:bg-black/70 text-white opacity-0 group-hover:opacity-100 transition-opacity z-10"
                                                                        aria-label="Next photo"
                                                                    >
                                                                        <ChevronRight className="h-5 w-5" />
                                                                    </button>
                                                                    
                                                                    {/* Photo Indicators */}
                                                                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                                                                        {item.photos.map((_, photoIndex) => (
                                                                            <button
                                                                                key={photoIndex}
                                                                                onClick={(e) => {
                                                                                    e.stopPropagation();
                                                                                    setCarouselIndices(prev => ({
                                                                                        ...prev,
                                                                                        [carouselIndex]: photoIndex
                                                                                    }));
                                                                                }}
                                                                                className={`h-2 rounded-full transition-all ${
                                                                                    currentPhotoIndex === photoIndex
                                                                                        ? "bg-white w-8"
                                                                                        : "bg-white/50 w-2 hover:bg-white/75"
                                                                                }`}
                                                                                aria-label={`Go to photo ${photoIndex + 1}`}
                                                                            />
                                                                        ))}
                                                                    </div>
                                                                </>
                                                            )}
                                                        </div>
                                                        {currentPhoto.caption && (
                                                            <figcaption className="text-center text-sm text-muted-foreground mt-3 italic">
                                                                {currentPhoto.caption} {totalPhotos > 1 && `(${currentPhotoIndex + 1} / ${totalPhotos})`}
                                                            </figcaption>
                                                        )}
                                                    </motion.figure>
                                                );
                                            }
                                            return null;
                                        })}
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </>
                )}
            </AnimatePresence>

            {/* Taekwondo Lightbox */}
            <AnimatePresence>
                {taekwondoLightboxOpen && taekwondoPhotos.length > 0 && (
                    <>
                        {/* Dim + Blur Background */}
                        <motion.div
                            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setTaekwondoLightboxOpen(false)}
                        />

                        {/* Lightbox Content */}
                        <motion.div
                            className="fixed z-50 top-1/2 left-1/2
                            w-[95vw] max-w-6xl h-[90vh]
                            -translate-x-1/2 -translate-y-1/2 
                            flex items-center justify-center relative"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{
                                opacity: 1,
                                scale: 1,
                                transition: { type: "spring", stiffness: 160, damping: 20 },
                            }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Close Button */}
                            <button
                                onClick={() => setTaekwondoLightboxOpen(false)}
                                className="absolute top-4 right-4 p-3 rounded-full bg-black/50 hover:bg-black/70 text-white transition-colors z-20"
                                aria-label="Close lightbox"
                            >
                                <X className="h-6 w-6" />
                            </button>

                            {/* Previous Button */}
                            <button
                                onClick={() => setTaekwondoCurrentPhotoIndex((prev) => 
                                    prev === 0 ? taekwondoPhotos.length - 1 : prev - 1
                                )}
                                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/50 hover:bg-black/70 text-white transition-colors z-10"
                                aria-label="Previous photo"
                            >
                                <ChevronLeft className="h-6 w-6" />
                            </button>

                            {/* Next Button */}
                            <button
                                onClick={() => setTaekwondoCurrentPhotoIndex((prev) => 
                                    prev === taekwondoPhotos.length - 1 ? 0 : prev + 1
                                )}
                                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/50 hover:bg-black/70 text-white transition-colors z-10"
                                aria-label="Next photo"
                            >
                                <ChevronRight className="h-6 w-6" />
                            </button>

                            {/* Photo Container */}
                            <div className="flex flex-col items-center justify-center p-8 max-w-full max-h-full gap-4">
                                <div className="relative flex items-center justify-center w-full max-w-5xl mx-auto min-h-[420px]">
                                    <AnimatePresence mode="wait">
                                        <motion.img
                                            key={taekwondoCurrentPhotoIndex}
                                            src={taekwondoPhotos[taekwondoCurrentPhotoIndex]}
                                            alt={`Taekwondo ${taekwondoCurrentPhotoIndex + 1}`}
                                            className="max-w-full max-h-[75vh] object-contain rounded-lg"
                                            initial={{ opacity: 0, x: 50 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -50 }}
                                            transition={{ duration: 0.3 }}
                                        />
                                    </AnimatePresence>
                                </div>
                                
                                {/* Photo Counter */}
                                <div className="text-white text-sm font-medium bg-black/50 px-4 py-2 rounded-full">
                                    {taekwondoCurrentPhotoIndex + 1} / {taekwondoPhotos.length}
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </section>
    );
};

