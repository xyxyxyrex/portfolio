'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProjectTransition from './Projects';

interface SkillCardProps {
    title: string;
    icon: React.ReactNode;
    description: string;
    examples?: string[];
    category: 'programming' | 'multimedia';
}

export default function SkillCard({ title, icon, description, examples, category }: SkillCardProps) {
    const [isFlipped, setIsFlipped] = useState(false);

    console.log('SkillCard rendered:', { title, icon, description });

    const cardVariants = {
        front: {
            rotateY: 0,
            transition: {
                duration: 0.6,
                ease: "easeInOut"
            }
        },
        back: {
            rotateY: 180,
            transition: {
                duration: 0.6,
                ease: "easeInOut"
            }
        }
    };

    const contentVariants = {
        front: {
            opacity: 1,
            transition: {
                delay: 0.3,
                duration: 0.3
            }
        },
        back: {
            opacity: 1,
            transition: {
                delay: 0.3,
                duration: 0.3
            }
        }
    };

    return (
        <div 
            className="w-[300px] h-[300px] perspective-1000 cursor-pointer"
            onClick={() => setIsFlipped(!isFlipped)}
        >
            <motion.div
                className="w-full h-full transform-style-3d relative"
                animate={isFlipped ? "back" : "front"}
                variants={cardVariants}
            >
                <motion.div
                    className="absolute w-full h-full backface-hidden bg-[var(--background)] border border-[var(--accent)]/20 rounded-xl p-6 flex flex-col items-center justify-center gap-4 hover:border-[var(--accent)]/40 transition-colors duration-300"
                    variants={contentVariants}
                    initial={{ opacity: 0 }}
                >
                    <div className="text-[var(--accent)] w-16 h-16 flex items-center justify-center">
                        {icon}
                    </div>
                    <h3 className="text-xl font-semibold text-[var(--foreground)]">{title}</h3>
                    <p className="text-sm text-[var(--foreground)]/70 text-center">Click to learn more</p>
                </motion.div>

                <motion.div
                    className="absolute w-full h-full backface-hidden rotate-y-180 bg-[var(--background)] border border-[var(--accent)]/20 rounded-xl p-6 flex flex-col items-center justify-center gap-4 hover:border-[var(--accent)]/40 transition-colors duration-300"
                    variants={contentVariants}
                    initial={{ opacity: 0 }}
                >
                    <h3 className="text-xl font-semibold text-[var(--foreground)] mb-2">{title}</h3>
                    <p className="text-sm text-[var(--foreground)]/80 text-center mb-4">{description}</p>
                    <p className="text-xs text-[var(--foreground)]/50 mt-auto">Click to flip back</p>
                    <div onClick={(e) => e.stopPropagation()}>
                        <ProjectTransition skill={title} category={category} />
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
} 