'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';

interface ProjectTransitionProps {
    skill: string;
    category: 'programming' | 'multimedia';
}

export default function ProjectTransition({ skill, category }: ProjectTransitionProps) {
    const router = useRouter();
    const [isTransitioning, setIsTransitioning] = useState(false);

    const handleProjectClick = () => {
        setIsTransitioning(true);
        // Wait for the transition animation to complete before navigating
        setTimeout(() => {
            router.push(`/${category}/${skill.toLowerCase().replace(/\s+/g, '-')}`);
        }, 500); // Half of the transition duration
    };

    return (
        <AnimatePresence mode="wait">
            {isTransitioning && (
                <motion.div
                    key={`transition-${skill}-${category}`}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ duration: 1, ease: "easeInOut" }}
                    className="fixed inset-0 bg-[var(--accent)] z-50 flex items-center justify-center"
                >
                    <motion.div
                        key={`loading-${skill}-${category}`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="text-white text-2xl font-semibold"
                    >
                        Loading {skill} Projects...
                    </motion.div>
                </motion.div>
            )}
            {!isTransitioning && (
                <motion.button 
                    key={`button-${skill}-${category}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="px-8 py-3 bg-[var(--accent)] text-white rounded-lg hover:bg-[var(--accent)]/90 transition-all transform hover:scale-105"
                    onClick={handleProjectClick}
                >
                    View My Work
                </motion.button>
            )}
        </AnimatePresence>
    );
} 