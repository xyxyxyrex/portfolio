'use client';

import { useState } from 'react';
import SkillCard from '../components/SkillCard'
import { motion } from 'framer-motion';

const programmingSkills = [
    {
        id: 1,
        title: "React",
        icon: (
            <svg xmlns="http://www.w.org/2000/svg" viewBox="-11.5 -10.23174 23 20.46348" className="w-16 h-16">
                <circle cx="0" cy="0" r="2.05" fill="currentColor"/>
                <g stroke="currentColor" strokeWidth="1" fill="none">
                    <ellipse rx="11" ry="4.2"/>
                    <ellipse rx="11" ry="4.2" transform="rotate(60)"/>
                    <ellipse rx="11" ry="4.2" transform="rotate(120)"/>
                </g>
            </svg>
        ),
        description: "Building modern, responsive web applications with React. Experience with hooks, context, and state management. Creating reusable components and implementing complex user interfaces."
    },
    {
        id: 2,
        title: "Next.js",
        icon: (
            <svg viewBox="0 0 180 180" className="w-16 h-16">
                <mask id="mask0_408_139" style={{ maskType: "alpha" }} maskUnits="userSpaceOnUse" x="0" y="0" width="180" height="180">
                    <circle cx="90" cy="90" r="90" fill="currentColor"/>
                </mask>
                <g mask="url(#mask0_408_139)">
                    <circle cx="90" cy="90" r="87" fill="currentColor" stroke="currentColor" strokeWidth="6"/>
                    <path d="M149.508 157.52L69.142 54H54V125.97H66.1136V69.3836L139.999 164.845C143.333 162.614 146.509 160.165 149.508 157.52Z" fill="url(#paint0_linear_408_139)"/>
                    <rect x="115" y="54" width="12" height="72" fill="url(#paint1_linear_408_139)"/>
                </g>
                <defs>
                    <linearGradient id="paint0_linear_408_139" x1="109" y1="116.5" x2="144.5" y2="160.5" gradientUnits="userSpaceOnUse">
                        <stop stopColor="var(--background)"/>
                        <stop offset="1" stopColor="var(--background)" stopOpacity="0"/>
                    </linearGradient>
                    <linearGradient id="paint1_linear_408_139" x1="121" y1="54" x2="120.799" y2="106.875" gradientUnits="userSpaceOnUse">
                        <stop stopColor="var(--background)"/>
                        <stop offset="1" stopColor="var(--background)" stopOpacity="0"/>
                    </linearGradient>
                </defs>
            </svg>
        ),
        description: "Developing full-stack applications with Next.js. Implementing server-side rendering, API routes, and optimized performance. Building scalable and SEO-friendly web applications.",
    },
    {
        id: 3,
        title: "Flutter",
        icon: (
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-16 h-16">
                <path d="M14.314 0L2.3 12 6 15.7 21.684.013h-7.357zm.014 11.072L7.857 17.53l6.47 6.47H21.7l-6.47-6.468 6.46-6.46h-7.37z"/>
            </svg>
        ),
        description: "Creating cross-platform mobile applications with Flutter. Building beautiful, natively compiled applications for mobile, web, and desktop from a single codebase.",
    },
    {
        id: 4,
        title: "C++ & Arduino",
        icon: (
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-16 h-16">
                <path d="M22.394 6c-.167-.29-.398-.543-.652-.69L12.926.22c-.509-.294-1.34-.294-1.848 0L2.26 5.31c-.508.293-.923 1.013-.923 1.6v10.18c0 .294.104.62.271.91.167.29.398.543.652.69l8.816 5.09c.508.293 1.34.293 1.848 0l8.816-5.09c.254-.147.485-.4.652-.69.167-.29.27-.616.27-.91V6.91c.003-.294-.1-.62-.268-.91zM12 19.11c-3.92 0-7.109-3.19-7.109-7.11 0-3.92 3.19-7.11 7.11-7.11a7.133 7.133 0 016.156 3.553l-3.076 1.78a3.567 3.567 0 00-3.08-1.78A3.56 3.56 0 008.444 12 3.56 3.56 0 0012 15.555a3.57 3.57 0 003.08-1.778l3.078 1.777A7.135 7.135 0 0112 19.11zm7.11-6.715h-.79v.79h-.79v-.79h-.79v-.79h.79v-.79h.79v.79h.79zm2.962 0h-.79v.79h-.79v-.79h-.79v-.79h.79v-.79h.79v.79h.79z"/>
            </svg>
        ),
        description: "Developing embedded systems and IoT applications using C++ and Arduino. Creating hardware interfaces, sensor integrations, and microcontroller programming for various projects.",
    }
    
];

const multimediaSkills = [
    {
        id: 1,
        title: "Photoshop",
        icon: (
            <svg viewBox="0 0 240 234" className="w-16 h-16" fill="currentColor">
                <path d="M42.5,0h155C221,0,240,19,240,42.5v149c0,23.5-19,42.5-42.5,42.5h-155C19,234,0,215,0,191.5v-149C0,19,19,0,42.5,0z" className="text-[var(--background)]"/>
                <path d="M54,164.1V61.2c0-0.7,0.3-1.1,1-1.1c1.7,0,3.3,0,5.6-0.1c2.4-0.1,4.9-0.1,7.6-0.2c2.7-0.1,5.6-0.1,8.7-0.2c3.1-0.1,6.1-0.1,9.1-0.1c8.2,0,15,1,20.6,3.1c5,1.7,9.6,4.5,13.4,8.2c3.2,3.2,5.7,7.1,7.3,11.4c1.5,4.2,2.3,8.5,2.3,13c0,8.6-2,15.7-6,21.3c-4,5.6-9.6,9.8-16.1,12.2c-6.8,2.5-14.3,3.4-22.5,3.4c-2.4,0-4,0-5-0.1c-1-0.1-2.4-0.1-4.3-0.1v32.1c0.1,0.7-0.4,1.3-1.1,1.4c-0.1,0-0.2,0-0.4,0H55.2C54.4,165.4,54,165,54,164.1z M75.8,79.4V113c1.4,0.1,2.7,0.2,3.9,0.2H85c3.9,0,7.8-0.6,11.5-1.8c3.2-0.9,6-2.8,8.2-5.3c2.1-2.5,3.1-5.9,3.1-10.3c0.1-3.1-0.7-6.2-2.3-8.9c-1.7-2.6-4.1-4.6-7-5.7c-3.7-1.5-7.7-2.1-11.8-2c-2.6,0-4.9,0-6.8,0.1C77.9,79.2,76.5,79.3,75.8,79.4L75.8,79.4z" className="text-[var(--accent)]"/>
                <path d="M192,106.9c-3-1.6-6.2-2.7-9.6-3.4c-3.7-0.8-7.4-1.3-11.2-1.3c-2-0.1-4.1,0.2-6,0.7c-1.3,0.3-2.4,1-3.1,2c-0.5,0.8-0.8,1.8-0.8,2.7c0,0.9,0.4,1.8,1,2.6c0.9,1.1,2.1,2,3.4,2.7c2.3,1.2,4.7,2.3,7.1,3.3c5.4,1.8,10.6,4.3,15.4,7.3c3.3,2.1,6,4.9,7.9,8.3c1.6,3.2,2.4,6.7,2.3,10.3c0.1,4.7-1.3,9.4-3.9,13.3c-2.8,4-6.7,7.1-11.2,8.9c-4.9,2.1-10.9,3.2-18.1,3.2c-4.6,0-9.1-0.4-13.6-1.3c-3.5-0.6-7-1.7-10.2-3.2c-0.7-0.4-1.2-1.1-1.1-1.9v-17.4c0-0.3,0.1-0.7,0.4-0.9c0.3-0.2,0.6-0.1,0.9,0.1c3.9,2.3,8,3.9,12.4,4.9c3.8,1,7.8,1.5,11.8,1.5c3.8,0,6.5-0.5,8.3-1.4c1.6-0.7,2.7-2.4,2.7-4.2c0-1.4-0.8-2.7-2.4-4c-1.6-1.3-4.9-2.8-9.8-4.7c-5.1-1.8-9.8-4.2-14.2-7.2c-3.1-2.2-5.7-5.1-7.6-8.5c-1.6-3.2-2.4-6.7-2.3-10.2c0-4.3,1.2-8.4,3.4-12.1c2.5-4,6.2-7.2,10.5-9.2c4.7-2.4,10.6-3.5,17.7-3.5c4.1,0,8.3,0.3,12.4,0.9c3,0.4,5.9,1.2,8.6,2.3c0.4,0.1,0.8,0.5,1,0.9c0.1,0.4,0.2,0.8,0.2,1.2v16.3c0,0.4-0.2,0.8-0.5,1C192.9,107.1,192.4,107.1,192,106.9z" className="text-[var(--accent)]"/>
            </svg>
        ),
        description: "Expert in photo manipulation, digital art, and graphic design using Adobe Photoshop. Creating complex compositions, retouching, and digital painting.",
    },
    {
        id: 2,
        title: "Premiere Pro",
        icon: (
            <svg viewBox="0 0 240 234" className="w-16 h-16" fill="currentColor">
                <path d="M42.5,0h155C221,0,240,19,240,42.5v149c0,23.5-19,42.5-42.5,42.5h-155C19,234,0,215,0,191.5v-149C0,19,19,0,42.5,0z" className="text-[var(--background)]"/>
                <path d="m57 164v-103c0-0.7 0.3-1.1 1-1.1 1.7 0 3.3 0 5.6-0.1 2.4-0.1 4.9-0.1 7.6-0.2s5.6-0.1 8.7-0.2 6.1-0.1 9.1-0.1c8.2 0 15 1 20.6 3.1 5 1.7 9.6 4.5 13.4 8.2 3.2 3.2 5.7 7.1 7.3 11.4 1.5 4.2 2.3 8.5 2.3 13 0 8.6-2 15.7-6 21.3s-9.6 9.8-16.1 12.2c-6.8 2.5-14.3 3.4-22.5 3.4-2.4 0-4 0-5-0.1s-2.4-0.1-4.3-0.1v32.1c0.1 0.7-0.4 1.3-1.1 1.4h-0.4-19c-0.8 0-1.2-0.4-1.2-1.3zm21.8-84.7v33.6c1.4 0.1 2.7 0.2 3.9 0.2h5.3c3.9 0 7.8-0.6 11.5-1.8 3.2-0.9 6-2.8 8.2-5.3 2.1-2.5 3.1-5.9 3.1-10.3 0.1-3.1-0.7-6.2-2.3-8.9-1.7-2.6-4.1-4.6-7-5.7-3.7-1.5-7.7-2.1-11.8-2-2.6 0-4.9 0-6.8 0.1-2-0.1-3.4 0-4.1 0.1z" className="text-[var(--accent)]"/>
                <path d="m147 85.2h17.5c1 0 1.8 0.7 2.1 1.6 0.3 0.8 0.5 1.6 0.6 2.5 0.2 1 0.4 2.1 0.5 3.1 0.1 1.1 0.2 2.3 0.2 3.6 3-3.5 6.6-6.4 10.7-8.6 4.6-2.6 9.9-3.9 15.2-3.9 0.7-0.1 1.3 0.4 1.4 1.1v0.4 19.5c0 0.8-0.5 1.1-1.6 1.1-3.6-0.1-7.3 0.2-10.8 1-2.9 0.6-5.7 1.5-8.4 2.7-1.9 0.9-3.7 2.1-5.1 3.7v51c0 1-0.4 1.4-1.3 1.4h-19.7c-0.8 0.1-1.5-0.4-1.6-1.2v-0.4-55.4c0-2.4 0-4.9-0.1-7.5s-0.1-5.2-0.2-7.8c0-2.3-0.2-4.5-0.4-6.8-0.1-0.5 0.2-1 0.7-1.1 0-0.1 0.2-0.1 0.3 0z" className="text-[var(--accent)]"/>
            </svg>
        ),
        description: "Professional video editing and post-production with Adobe Premiere Pro. Creating engaging video content, color grading, and motion graphics integration.",
    },
    {
        id: 3,
        title: "Illustrator",
        icon: (
            <svg viewBox="0 0 240 234" className="w-16 h-16" fill="currentColor">
                <path d="M42.5 0h155C221 0 240 19 240 42.5v149c0 23.5-19 42.5-42.5 42.5h-155C19 234 0 215 0 191.5v-149C0 19 19 0 42.5 0z" className="text-[var(--background)]"/>
                <path d="M116 140H78.8l-7.6 23.5c-.2.9-1 1.5-1.9 1.4H50.5c-1.1 0-1.4-.6-1.1-1.8l32.2-92.7c.3-1 .6-2.1 1-3.3.4-2.1.6-4.3.6-6.5-.1-.5.3-1 .8-1.1h25.9c.8 0 1.2.3 1.3.8l36.5 103c.3 1.1 0 1.6-1 1.6h-20.9c-.7.1-1.4-.4-1.6-1.1L116 140zm-31.4-20.3H110c-.6-2.1-1.4-4.6-2.3-7.2-.9-2.7-1.8-5.6-2.7-8.6-1-3.1-1.9-6.1-2.9-9.2s-1.9-6-2.7-8.9c-.8-2.8-1.5-5.4-2.2-7.8H97c-.9 4.3-2 8.6-3.4 12.9-1.5 4.8-3 9.8-4.6 14.8-1.4 5.1-2.9 9.8-4.4 14zM170 77c-3.3.1-6.5-1.2-8.9-3.5-2.3-2.5-3.5-5.8-3.4-9.2-.1-3.4 1.2-6.6 3.6-8.9s5.6-3.5 8.9-3.5c3.9 0 6.9 1.2 9.1 3.5 2.2 2.4 3.4 5.6 3.3 8.9.1 3.4-1.1 6.7-3.5 9.2-2.3 2.4-5.7 3.7-9.1 3.5zm-11.2 86.8v-77c0-1 .4-1.4 1.3-1.4h19.8c.9 0 1.3.5 1.3 1.4v77c0 1.1-.4 1.6-1.3 1.6h-19.6c-1 0-1.5-.6-1.5-1.6z" className="text-[var(--accent)]"/>
            </svg>
        ),
        description: "Creating vector graphics, illustrations, and logos with Adobe Illustrator. Designing scalable graphics and custom typography for various applications.",
    },
    {
        id: 4,
        title: "After Effects",
        icon: (
            <svg viewBox="0 0 240 234" className="w-16 h-16" fill="currentColor">
                <path d="M42.5,0h155C221,0,240,19,240,42.5v149c0,23.5-19,42.5-42.5,42.5h-155C19,234,0,215,0,191.5v-149C0,19,19,0,42.5,0z" className="text-[var(--background)]"/>
                <path d="m96.4 140h-37.2l-7.6 23.6c-0.2 0.9-1 1.5-1.9 1.4h-18.8c-1.1 0-1.4-0.6-1.1-1.8l32.2-92.3c0.3-1 0.6-1.9 1-3.1 0.4-2.1 0.6-4.3 0.6-6.5-0.1-0.5 0.3-1 0.8-1.1h0.3 25.6c0.7 0 1.2 0.3 1.3 0.8l36.5 102c0.3 1.1 0 1.6-1 1.6h-20.9c-0.7 0.1-1.4-0.4-1.6-1.1l-8.2-24zm-31.4-19.9h25.4c-0.6-2.1-1.4-4.6-2.3-7.2-0.9-2.7-1.8-5.6-2.7-8.6-1-3.1-1.9-6.1-2.9-9.2s-1.9-6-2.7-8.9c-0.8-2.8-1.5-5.4-2.2-7.8h-0.2c-0.9 4.3-2 8.6-3.4 12.9-1.5 4.8-3 9.8-4.6 14.8-1.3 5.1-2.9 9.8-4.4 14z" className="text-[var(--accent)]"/>
                <path d="m187 131h-31.7c0.4 3.1 1.4 6.2 3.1 8.9 1.8 2.7 4.3 4.8 7.3 6 4 1.7 8.4 2.6 12.8 2.5 3.5-0.1 7-0.4 10.4-1.1 3.1-0.4 6.1-1.2 8.9-2.3 0.5-0.4 0.8-0.2 0.8 0.8v15.3c0 0.4-0.1 0.8-0.2 1.2-0.2 0.3-0.4 0.5-0.7 0.7-3.2 1.4-6.5 2.4-10 3-4.7 0.9-9.4 1.3-14.2 1.2-7.6 0-14-1.2-19.2-3.5-4.9-2.1-9.2-5.4-12.6-9.5-3.2-3.9-5.5-8.3-6.9-13.1-1.4-4.7-2.1-9.6-2.1-14.6 0-5.4 0.8-10.7 2.5-15.9 1.6-5 4.1-9.6 7.5-13.7 3.3-4 7.4-7.2 12.1-9.5s10.3-3.1 16.7-3.1c5.3-0.1 10.6 0.9 15.5 3.1 4.1 1.8 7.7 4.5 10.5 8 2.6 3.4 4.7 7.2 6 11.4 1.3 4 1.9 8.1 1.9 12.2 0 2.4-0.1 4.5-0.2 6.4-0.2 1.9-0.3 3.3-0.4 4.2-0.1 0.7-0.7 1.3-1.4 1.3-0.6 0-1.7 0.1-3.3 0.2-1.6 0.2-3.5 0.3-5.8 0.3s-4.7-0.4-7.3-0.4zm-31.7-14.6h21.1c2.6 0 4.5 0 5.7-0.1 0.8-0.1 1.6-0.3 2.3-0.8v-1c0-1.3-0.2-2.5-0.6-3.7-1.8-5.6-7.1-9.4-13-9.2-5.5-0.3-10.7 2.6-13.3 7.6-1.2 2.3-1.9 4.7-2.2 7.2z" className="text-[var(--accent)]"/>
            </svg>
        ),
        description: "Creating dynamic motion graphics and visual effects with Adobe After Effects. Developing animations, compositing, and special effects for video content.",
    }
];

export default function Skills() {
    const [activeCategory, setActiveCategory] = useState<'programming' | 'multimedia'>('programming');

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                duration: 0.3
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.3
            }
        }
    };

    return (
        <motion.section 
            className="min-h-screen py-20 px-76 relative"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
        >
            <div className="flex justify-center mb-12">
                <div className="bg-[var(--background)] p-1 rounded-full border border-[var(--accent)]/20">
                    <button
                        onClick={() => setActiveCategory('programming')}
                        className={`px-8 py-3 rounded-full transition-all duration-300 ${
                            activeCategory === 'programming'
                                ? 'bg-[var(--accent)] text-white'
                                : 'text-[var(--foreground)] hover:bg-[var(--accent)]/10'
                        }`}
                    >
                        Programming
                    </button>
                    <button
                        onClick={() => setActiveCategory('multimedia')}
                        className={`px-8 py-3 rounded-full transition-all duration-300 ${
                            activeCategory === 'multimedia'
                                ? 'bg-[var(--accent)] text-white'
                                : 'text-[var(--foreground)] hover:bg-[var(--accent)]/10'
                        }`}
                    >
                        Multimedia
                    </button>
                </div>
            </div>

            <motion.div 
                key={activeCategory}
                initial="hidden"
                animate="visible"
                variants={containerVariants}
                className="relative"
            >
                <div className="flex gap-8 overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-hide">
                    {activeCategory === 'programming' ? (
                        programmingSkills.map((skill) => (
                            <motion.div 
                                key={`programming-skill-${skill.id}`} 
                                className="snap-center flex-shrink-0"
                                variants={itemVariants}
                            >
                                <SkillCard {...skill} category="programming" />
                            </motion.div>
                        ))
                    ) : (
                        multimediaSkills.map((skill) => (
                            <motion.div 
                                key={`multimedia-skill-${skill.id}`} 
                                className="snap-center flex-shrink-0"
                                variants={itemVariants}
                            >
                                <SkillCard {...skill} category="multimedia" />
                            </motion.div>
                        ))
                    )}
                </div>
            </motion.div>

            <motion.div 
                className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-[var(--foreground)]/50"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                    duration: 1,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut"
                }}
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M7 13l5 5 5-5M7 6l5 5 5-5"/>
                </svg>
            </motion.div>
        </motion.section>
    );
}
