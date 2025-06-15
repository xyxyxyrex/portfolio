'use client';

import { useState, useEffect } from 'react';

interface TypewriterProps {
    text: string;
    className?: string;
    delay?: number;
    speed?: number;
}

export default function Typewriter({ 
    text, 
    className = "", 
    delay = 0, 
    speed = 50 
}: TypewriterProps) {
    const [displayText, setDisplayText] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isStarted, setIsStarted] = useState(false);

    useEffect(() => {
        const startTimeout = setTimeout(() => {
            setIsStarted(true);
        }, delay);

        return () => clearTimeout(startTimeout);
    }, [delay]);

    useEffect(() => {
        if (!isStarted) return;

        if (currentIndex < text.length) {
            const timeout = setTimeout(() => {
                setDisplayText(prev => prev + text[currentIndex]);
                setCurrentIndex(prev => prev + 1);
            }, speed);

            return () => clearTimeout(timeout);
        }
    }, [currentIndex, text, speed, isStarted]);

    return (
        <span className={className}>
            {displayText}
            <span className="animate-blink text-[var(--accent)]">|</span>
        </span>
    );
} 