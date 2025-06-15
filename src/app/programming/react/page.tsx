'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useCallback } from 'react';

// Example React projects - replace with your actual projects
const projects = [
    {
        id: 1,
        title: 'Portfolio Website',
        description: 'A modern portfolio website built with React and Next.js',
        image: '/projects/react/portfolio.jpg',
        technologies: ['React', 'Next.js', 'Tailwind CSS', 'Framer Motion'],
        link: 'https://github.com/yourusername/portfolio'
    },
    {
        id: 2,
        title: 'E-commerce Platform',
        description: 'A full-stack e-commerce platform with React frontend',
        image: '/projects/react/ecommerce.jpg',
        technologies: ['React', 'Node.js', 'MongoDB', 'Redux'],
        link: 'https://github.com/yourusername/ecommerce'
    },
    // Add more projects as needed
];

export default function ReactProjects() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0);

    const slideVariants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 1000 : -1000,
            opacity: 0
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1
        },
        exit: (direction: number) => ({
            zIndex: 0,
            x: direction < 0 ? 1000 : -1000,
            opacity: 0
        })
    };

    const swipeConfidenceThreshold = 10000;
    const swipePower = (offset: number, velocity: number) => {
        return Math.abs(offset) * velocity;
    };

    const paginate = useCallback((newDirection: number) => {
        setDirection(newDirection);
        setCurrentIndex((prev) => (prev + newDirection + projects.length) % projects.length);
    }, []);

    return (
        <div className="min-h-screen bg-[var(--background)] relative overflow-hidden">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-[var(--accent)]"
                style={{ zIndex: -1 }}
            />

            <div className="container mx-auto px-4 py-8">
                <motion.h1 
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="text-4xl font-bold text-white mb-8"
                >
                    React Projects
                </motion.h1>

                <div className="relative max-w-4xl mx-auto h-[500px]">
                    <AnimatePresence initial={false} custom={direction}>
                        <motion.div
                            key={currentIndex}
                            custom={direction}
                            variants={slideVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{
                                x: { type: "spring", stiffness: 300, damping: 30 },
                                opacity: { duration: 0.2 }
                            }}
                            drag="x"
                            dragConstraints={{ left: 0, right: 0 }}
                            dragElastic={1}
                            onDragEnd={(e, { offset, velocity }) => {
                                const swipe = swipePower(offset.x, velocity.x);
                                if (swipe < -swipeConfidenceThreshold) {
                                    paginate(1);
                                } else if (swipe > swipeConfidenceThreshold) {
                                    paginate(-1);
                                }
                            }}
                            className="absolute w-full h-full"
                        >
                            <div className="bg-white rounded-xl overflow-hidden shadow-2xl h-full">
                                <div className="relative h-[400px]">
                                    <img
                                        src={projects[currentIndex].image}
                                        alt={projects[currentIndex].title}
                                        className="w-full h-full object-cover"
                                        loading="lazy"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                                        <h2 className="text-3xl font-bold mb-2">{projects[currentIndex].title}</h2>
                                        <p className="text-lg mb-4">{projects[currentIndex].description}</p>
                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {projects[currentIndex].technologies.map((tech) => (
                                                <span
                                                    key={tech}
                                                    className="px-3 py-1 bg-[var(--accent)]/20 text-[var(--accent)] rounded-full text-sm"
                                                >
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                        <a
                                            href={projects[currentIndex].link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-block px-6 py-2 bg-[var(--accent)] text-white rounded-lg hover:bg-[var(--accent)]/90 transition-colors"
                                        >
                                            View Project
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    <button
                        onClick={() => paginate(-1)}
                        className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors z-10"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>

                    <button
                        onClick={() => paginate(1)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors z-10"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>

                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex justify-center gap-2 z-10">
                        {projects.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => {
                                    setDirection(index > currentIndex ? 1 : -1);
                                    setCurrentIndex(index);
                                }}
                                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                                    index === currentIndex ? 'w-8 bg-white' : 'bg-white/30'
                                }`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
} 