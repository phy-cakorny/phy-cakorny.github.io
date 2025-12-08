import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, X, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";
import { FaPersonRunning } from "react-icons/fa6";
import { GiBlackBelt } from "react-icons/gi";
import races from "@/lib/races";

export const HobbiesSection = () => {

    const photographyPhotos = [
        "/photography/boston.jpeg",
        "/photography/weill.jpeg",
        "/photography/italy1.jpeg",
        "/photography/korea1.jpeg",
        "/photography/lake.jpeg",
        "/photography/italy2.png",
        "/photography/korea2.jpeg",
        "/photography/nyc_ariel.jpeg",
        "/photography/italy3.jpeg",
        "/photography/nyc.jpeg",
        "/photography/italy4.jpeg",
        "/photography/korea3.jpeg",
        "/photography/sf.jpeg",
    ];

    const taekwondoPhotos = [
        "/taekwondo/tkd1.jpeg",
        "/taekwondo/tkd2.jpeg",
        "/taekwondo/tkd3.jpeg",
        "/taekwondo/tkd6.jpeg",
        "/taekwondo/tkd7.jpeg",
        "/taekwondo/tkd8.jpeg",
        "/taekwondo/tkd9.jpeg",
        "/taekwondo/tkd10.JPG",
        "/taekwondo/tkd11.JPG",
        "/taekwondo/tkd4.jpeg",
        "/taekwondo/tkd5.jpeg",
    ];

    const [isGalleryOpen, setIsGalleryOpen] = useState(false);
    const [isLightboxOpen, setIsLightboxOpen] = useState(false);
    const [isRunningTimelineOpen, setIsRunningTimelineOpen] = useState(false);
    const [isTaekwondoGalleryOpen, setIsTaekwondoGalleryOpen] = useState(false);
    const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
    const [racePhotoIndices, setRacePhotoIndices] = useState({});
    const [taekwondoLightboxOpen, setTaekwondoLightboxOpen] = useState(false);
    const [taekwondoCurrentPhotoIndex, setTaekwondoCurrentPhotoIndex] = useState(0);

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
            description: "Film & Digital | Landscape & Portrait",
            hasGallery: photographyPhotos.length > 0
        },
        {
            name: "Running",
            icon: FaPersonRunning,
            description: "5k - Marathon | XCTF",
            hasTimeline: races.length > 0
        },
        {
            name: "Taekwondo",
            icon: GiBlackBelt,
            description: "Black Belt | 3rd Dan",
            hasGallery: taekwondoPhotos.length > 0
        }
    ];

    return (
        <section id="hobbies" className="py-24 px-4 relative">
            <div className="container mx-auto max-w-5xl">
                <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center underline underline-offset-8 decoration-primary">
                    My <span className="text-primary">Hobbies</span>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                                <p className="text-muted-foreground text-sm">
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
                                    {photographyPhotos.map((photo, index) => (
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
                                                    src={photo}
                                                    alt={`Photography ${index + 1}`}
                                                    className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
                                                    loading="lazy"
                                                />
                                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                                            </div>
                                        </motion.div>
                                    ))}
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
                            -translate-x-1/2 -translate-y-1/2 
                            flex items-center justify-center"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{
                                opacity: 1,
                                scale: 1,
                                transition: { type: "spring", stiffness: 160, damping: 20 },
                            }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Photo Container */}
                            <div className="flex items-center justify-center p-8 max-w-full max-h-full">
                                <AnimatePresence mode="wait">
                                    <motion.img
                                        key={currentPhotoIndex}
                                        src={photographyPhotos[currentPhotoIndex]}
                                        alt={`Photography ${currentPhotoIndex + 1}`}
                                        className="max-w-full max-h-[85vh] object-contain rounded-lg"
                                        initial={{ opacity: 0, x: 50 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -50 }}
                                        transition={{ duration: 0.3 }}
                                    />
                                </AnimatePresence>
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
                                <div className="flex items-center justify-between p-6">
                                    <h2 className="text-2xl font-bold">Race Timeline</h2>
                                    <button
                                        onClick={() => setIsRunningTimelineOpen(false)}
                                        className="text-foreground/60 hover:text-foreground transition-colors p-2 hover:bg-card/80 rounded-lg"
                                    >
                                        <X className="h-6 w-6" />
                                    </button>
                                </div>

                                {/* Timeline Content */}
                                <div className="flex-1 overflow-y-auto p-6 ">
                                    <div className="max-w-4xl mx-auto space-y-8">
                                        {races.map((race, index) => (
                                            <motion.div
                                                key={index}
                                                className="flex flex-col md:flex-row gap-6 items-start md:items-center bg-card/50 rounded-xl p-6 border border-primary/30 shadow-[0_0px_5px_5px_hsla(var(--primary)/0.1)] transition-all"
                                                initial={{ 
                                                    opacity: 0, 
                                                    x: -50,
                                                    scale: 0.95
                                                }}
                                                animate={{ 
                                                    opacity: 1, 
                                                    x: 0,
                                                    scale: 1
                                                }}
                                                transition={{ 
                                                    delay: 0.2 + (index * 0.1),
                                                    type: "spring",
                                                    stiffness: 100,
                                                    damping: 15
                                                }}
                                            >
                                                <div className="flex-shrink-0 w-full md:w-64 h-48 rounded-lg overflow-hidden bg-muted relative group mb-4">
                                                    {race.image.length > 0 && (
                                                        <>
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
                                                                        className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 hover:bg-black/70 text-white opacity-0 group-hover:opacity-100 transition-opacity z-10"
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
                                                                        className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 hover:bg-black/70 text-white opacity-0 group-hover:opacity-100 transition-opacity z-10"
                                                                        aria-label="Next photo"
                                                                    >
                                                                        <ChevronRight className="h-4 w-4" />
                                                                    </button>
                                                                    {/* Photo indicator dots */}
                                                                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity z-10">
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
                                                        </>
                                                    )}
                                                </div>

                                                {/* Race Info */}
                                                <div className="flex-1 flex flex-col gap-3 items-center">
                                                    <h3 className="text-2xl font-bold text-foreground">
                                                        {race.title}
                                                    </h3>
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-lg text-muted-foreground">
                                                            {race.year}
                                                        </span>
                                                    </div>
                                                    {race.stravaLink && (
                                                        <a
                                                            href={race.stravaLink}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 hover:bg-primary/20 text-primary rounded-lg transition-colors text-sm font-medium w-fit mt-2"
                                                        >
                                                            <ExternalLink className="h-4 w-4" />
                                                            View on Strava
                                                        </a>
                                                    )}
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </>
                )}
            </AnimatePresence>

            {/* Taekwondo Gallery Modal */}
            <AnimatePresence>
                {isTaekwondoGalleryOpen && taekwondoPhotos.length > 0 && (
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
                                    <h2 className="text-2xl font-bold">Taekwondo Gallery</h2>
                                    <button
                                        onClick={() => setIsTaekwondoGalleryOpen(false)}
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
                                        {taekwondoPhotos.map((photo, index) => (
                                            <motion.div
                                                key={index}
                                                className="mb-4 break-inside-avoid cursor-pointer group"
                                                onClick={() => openTaekwondoLightbox(index)}
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
                                                        src={photo}
                                                        alt={`Taekwondo ${index + 1}`}
                                                        className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
                                                        loading="lazy"
                                                    />
                                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                                                </div>
                                            </motion.div>
                                        ))}
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
                            flex items-center justify-center"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{
                                opacity: 1,
                                scale: 1,
                                transition: { type: "spring", stiffness: 160, damping: 20 },
                            }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Photo Container */}
                            <div className="flex items-center justify-center p-8 max-w-full max-h-full">
                                <AnimatePresence mode="wait">
                                    <motion.img
                                        key={taekwondoCurrentPhotoIndex}
                                        src={taekwondoPhotos[taekwondoCurrentPhotoIndex]}
                                        alt={`Taekwondo ${taekwondoCurrentPhotoIndex + 1}`}
                                        className="max-w-full max-h-[85vh] object-contain rounded-lg"
                                        initial={{ opacity: 0, x: 50 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -50 }}
                                        transition={{ duration: 0.3 }}
                                    />
                                </AnimatePresence>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </section>
    );
};

