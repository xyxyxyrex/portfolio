'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import GradientMesh from '../../../../components/GradientMesh';
import Link from 'next/link';

const projects = [
    { 
        id: 1, 
        title: 'Digital Art 1', 
        image: '../projects/photoshop/art1.png',
        description: 'A vibrasnt digital artwoasdrk showcasing creative expression through digital mediums.',
        category: 'Digital Art',
        year: '2024'
    },
    { 
        id: 2, 
        title: 'Photo Manipulation', 
        image: '/projects/photoshop/art2.png',
        description: 'Advanced photo manipulation techniques creating surreal and imaginative compositions.',
        category: 'Photo Editing',
        year: '2024'
    },
    { 
        id: 3, 
        title: 'Graphic Design', 
        image: '/projects/photoshop/design1.jpg',
        description: 'Modern graphic design work focusing on brand identity and visual communication.',
        category: 'Branding',
        year: '2024'
    },
    { 
        id: 4, 
        title: 'Graphic Design', 
        image: '/projects/photoshop/design1.jpg',
        description: 'Creative branding solutions with a focus on user experience and visual appeal.',
        category: 'Branding',
        year: '2024'
    },
    { 
        id: 5, 
        title: 'Graphic Design', 
        image: '/projects/photoshop/design1.jpg',
        description: 'Innovative design concepts that push the boundaries of visual storytelling.',
        category: 'Creative Design',
        year: '2024'
    },
    { 
        id: 6, 
        title: 'Graphic Design', 
        image: '/projects/photoshop/design1.jpg',
        description: 'Strategic design solutions that effectively communicate brand messages.',
        category: 'Brand Strategy',
        year: '2024'
    },
    { 
        id: 7, 
        title: 'Graphic Design', 
        image: '/projects/photoshop/design1.jpg',
        description: 'Cutting-edge design work that combines aesthetics with functionality.',
        category: 'UI/UX Design',
        year: '2024'
    },
    { 
        id: 8, 
        title: 'Graphic Design', 
        image: '/projects/photoshop/design1.jpg',
        description: 'Contemporary design projects that showcase modern visual trends.',
        category: 'Modern Design',
        year: '2024'
    },
];

export default function PhotoshopProjects() {
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const [isHovering, setIsHovering] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [theme, setTheme] = useState('light');
    const [rotation, setRotation] = useState(0);
    const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const animationFrameRef = useRef<number | null>(null);

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme') || 'light';
        setTheme(savedTheme);
        document.documentElement.setAttribute('data-theme', savedTheme);
    }, []);

    // Add mouse move handler
    const handleMouseMove = (e: React.MouseEvent) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
        const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
        setMousePosition({ x, y });
    };

    // Handle card click with rotation
    const handleCardClick = (index: number) => {
        if (selectedIndex === index) {
            setSelectedIndex(null);
            // Resume auto-rotation
            startAutoRotation();
        } else {
            setSelectedIndex(index);
            // Calculate target rotation to bring card to front
            const targetAngle = (360 / projects.length) * index;
            const currentRotation = rotation % 360;
            let targetRotation = -targetAngle;
            
            // Calculate shortest path to target
            const diff = (targetRotation - currentRotation + 540) % 360 - 180;
            targetRotation = currentRotation + diff;

            // Animate to target rotation
            animateToRotation(targetRotation);
        }
    };

    // Animation function for smooth rotation
    const animateToRotation = (targetRotation: number) => {
        if (animationFrameRef.current) {
            cancelAnimationFrame(animationFrameRef.current);
        }

        const startRotation = rotation;
        const startTime = performance.now();
        const duration = 1000; // 1 second animation

        const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function for smooth animation
            const easeProgress = 1 - Math.pow(1 - progress, 3); // Cubic ease-out
            
            const newRotation = startRotation + (targetRotation - startRotation) * easeProgress;
            setRotation(newRotation);

            if (progress < 1) {
                animationFrameRef.current = requestAnimationFrame(animate);
            }
        };

        animationFrameRef.current = requestAnimationFrame(animate);
    };

    // Auto-rotation function
    const startAutoRotation = () => {
        if (animationFrameRef.current) {
            cancelAnimationFrame(animationFrameRef.current);
        }

        let lastTime = performance.now();
        const rotationSpeed = 0.02; // degrees per millisecond

        const animate = (currentTime: number) => {
            const deltaTime = currentTime - lastTime;
            lastTime = currentTime;

            setRotation(prev => (prev + rotationSpeed * deltaTime) % 360);
            animationFrameRef.current = requestAnimationFrame(animate);
        };

        animationFrameRef.current = requestAnimationFrame(animate);
    };

    // Start auto-rotation on mount
    useEffect(() => {
        startAutoRotation();
        return () => {
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
        };
    }, []);

    // Handle motion tracking on hover
    const handleCardHover = (index: number) => {
        if (hoverTimeoutRef.current) {
            clearTimeout(hoverTimeoutRef.current);
        }
        
        if (selectedIndex === null || selectedIndex === index) {
            hoverTimeoutRef.current = setTimeout(() => {
                setIsHovering(true);
            }, 50);
        }
    };

    const handleCardLeave = () => {
        if (hoverTimeoutRef.current) {
            clearTimeout(hoverTimeoutRef.current);
        }
        hoverTimeoutRef.current = setTimeout(() => {
            setIsHovering(false);
            setMousePosition({ x: 0, y: 0 });
        }, 100);
    };

    // Cleanup timeout on unmount
    useEffect(() => {
        return () => {
            if (hoverTimeoutRef.current) {
                clearTimeout(hoverTimeoutRef.current);
            }
        };
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);
    };

    return (        <div className="min-h-screen bg-[var(--background)] relative overflow-hidden">
            <GradientMesh />
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-[var(--accent)]"
                style={{ zIndex: -1 }}
            />

            <div className="container mx-auto px-4 py-8 relative z-10 min-h-screen flex flex-col">
                <div className="flex flex-col items-center mb-8">
                    <div className="flex items-center gap-4 mb-4">
                        <Link href="/">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="p-2 rounded-lg hover:bg-[var(--accent)] hover:bg-opacity-10 transition-all text-[var(--foreground)] flex items-center gap-2"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                                </svg>
                                Back to Skills
                            </motion.button>
                        </Link>

                        {/* Theme Toggle Button */}
                        <motion.button
                            onClick={toggleTheme}
                            className="p-2 rounded-lg hover:bg-[var(--accent)] hover:bg-opacity-10 transition-all text-[var(--foreground)]"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            aria-label="Toggle theme"
                        >
                            {theme === 'light' ? (
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
                                </svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
                                </svg>
                            )}
                        </motion.button>
                    </div>
                    <motion.h1 
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        className="text-4xl font-bold text-[var(--foreground)] text-center"
                    >
                        Photoshop Projects
                    </motion.h1>
                </div>

                <div className="flex-1 flex flex-col">
                    <div 
                        className="relative w-full h-[500px] perspective-[2000px]"
                        onMouseEnter={() => setIsHovering(true)}
                        onMouseLeave={() => {
                            setIsHovering(false);
                            setMousePosition({ x: 0, y: 0 });
                        }}
                        onMouseMove={handleMouseMove}
                    >
                        <div
                            className={`absolute left-1/2 top-1/2 transform-style-3d transition-all duration-300 ease-out ${
                                selectedIndex === null ? 'animate-rotate-3d' : ''
                            }`}
                            style={{
                                transform: `translate(-50%, -50%) rotateY(${rotation}deg)`,
                                willChange: 'transform'
                            }}
                        >
                            {projects.map((project, index) => {
                                const angle = (360 / projects.length) * index;
                                const radius = 450;
                                const x = Math.sin((angle * Math.PI) / 180) * radius;
                                const z = Math.cos((angle * Math.PI) / 180) * radius;
                                
                                const blurAmount = Math.max(0, Math.min(8, Math.abs(z) / 100));
                                const isForeground = Math.abs(z) < 100;

                                // Calculate motion transform based on mouse position
                                const motionX = isHovering && selectedIndex === index ? mousePosition.x * 20 : 0;
                                const motionY = isHovering && selectedIndex === index ? mousePosition.y * 20 : 0;
                                const motionRotateX = isHovering && selectedIndex === index ? mousePosition.y * -10 : 0;
                                const motionRotateY = isHovering && selectedIndex === index ? mousePosition.x * 10 : 0;

                                // Calculate z-index based on position and selection state
                                const baseZIndex = Math.round((z + radius) / 10);
                                const zIndex = selectedIndex === index ? 9999 : baseZIndex;

                                return (
                                    <div
                                        key={project.id}
                                        className={`absolute left-1/2 top-1/2 transform-style-3d transition-all duration-300 ease-out cursor-pointer`}
                                        style={{
                                            transform: `
                                                translate(-50%, -50%)
                                                translateX(${x}px)
                                                translateZ(${z}px)
                                                rotateY(${angle}deg)
                                                ${selectedIndex === index ? `
                                                    translateZ(400px)
                                                    translateX(${motionX}px)
                                                    translateY(${motionY}px)
                                                    rotateX(${motionRotateX}deg)
                                                    rotateY(${motionRotateY}deg)
                                                ` : ''}
                                            `,
                                            willChange: 'transform',
                                            transition: 'all 0.3s cubic-bezier(0.2, 0, 0.2, 1)',
                                            zIndex: zIndex
                                        }}
                                        onClick={() => handleCardClick(index)}
                                        onMouseEnter={() => handleCardHover(index)}
                                        onMouseLeave={handleCardLeave}
                                    >
                                        <div 
                                            className={`transition-all duration-300 ease-out ${
                                                selectedIndex === index 
                                                    ? 'w-[600px] h-auto max-h-[450px]' 
                                                    : 'w-[200px] h-[280px]'
                                            } rounded-lg overflow-hidden shadow-lg ${
                                                selectedIndex === index 
                                                    ? 'shadow-2xl bg-[var(--background)]/20' 
                                                    : 'bg-[var(--background)]/10'
                                            } border border-[var(--foreground)]/20`}
                                        >
                                            <div className="relative w-full h-full overflow-hidden">
                                                <div className={`absolute inset-0 bg-gradient-to-b from-[var(--foreground)]/10 to-[var(--foreground)]/5 ${
                                                    selectedIndex === index ? 'opacity-0' : 'opacity-100'
                                                } transition-opacity duration-300`} />
                                                <img
                                                    src={project.image}
                                                    alt={project.title}
                                                    className={`w-full h-full transition-all duration-300 ease-out ${
                                                        selectedIndex === index ? 'object-contain' : 'object-cover'
                                                    }`}
                                                    loading="lazy"
                                                    style={{
                                                        objectPosition: 'center center',
                                                        transformOrigin: 'center center',
                                                        transition: 'all 0.3s ease-out'
                                                    }}
                                                />
                                                <div 
                                                    className={`absolute inset-0 flex flex-col justify-end p-4 transition-all duration-500 ease-out
                                                        ${selectedIndex === index ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                                                >
                                                    <h3 className="text-xl font-semibold text-[var(--foreground)] drop-shadow-lg mb-2">{project.title}</h3>
                                                    <div className="flex items-center gap-2 mt-2">
                                                        <span className="text-xs text-[var(--foreground)]/80 drop-shadow-sm">{project.year}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    <AnimatePresence mode="wait">
                        {selectedIndex !== null && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 20 }}
                                transition={{ duration: 0.5, ease: "easeOut" }}
                                className="mt-8 text-center text-[var(--foreground)] space-y-4"
                            >
                                <motion.h2 
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 }}
                                    className="text-2xl font-bold"
                                >
                                    {projects[selectedIndex].title}
                                </motion.h2>
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 }}
                                    className="flex justify-center gap-4 text-sm text-[var(--foreground)]/80"
                                >
                                    <span className="px-3 py-1 bg-[var(--accent)]/10 rounded-full backdrop-blur-sm">
                                        {projects[selectedIndex].category}
                                    </span>
                                    <span className="px-3 py-1 bg-[var(--accent)]/10 rounded-full backdrop-blur-sm">
                                        {projects[selectedIndex].year}
                                    </span>
                                </motion.div>
                                <motion.p
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 }}
                                    className="max-w-2xl mx-auto text-[var(--foreground)]/90"
                                >
                                    {projects[selectedIndex].description}
                                </motion.p>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {selectedIndex === null && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="mt-8 text-center text-[var(--foreground)]/60"
                        >
                            <p className="text-lg">Click on a project to view details</p>
                        </motion.div>
                    )}
                </div>
            </div>

            <style jsx global>{`
                @keyframes rotate-3d {
                    from {
                        transform: translate(-50%, -50%) rotateY(0deg);
                    }
                    to {
                        transform: translate(-50%, -50%) rotateY(360deg);
                    }
                }

                .animate-rotate-3d {
                    animation: rotate-3d 20s linear infinite;
                }

                .pause-animation {
                    animation-play-state: paused;
                }

                .transform-style-3d {
                    transform-style: preserve-3d;
                    backface-visibility: visible;
                }

                /* Remove all blur effects */
                .backdrop-blur-md,
                .backdrop-blur-sm,
                .backdrop-blur-xl {
                    backdrop-filter: none;
                    -webkit-backdrop-filter: none;
                }
            `}</style>
        </div>
    );
} 