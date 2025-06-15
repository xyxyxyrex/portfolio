'use client';

import { useEffect, useRef } from 'react';

interface GradientMeshProps {
    colors?: string[];
    opacity?: number;
    speed?: number;
}

export default function GradientMesh({ 
    colors = ['#ff6b6b', '#4ecdc4', '#45b7d1'],
    opacity = 0.15,
    speed = 0.5 
}: GradientMeshProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const mouseRef = useRef({ x: 0, y: 0 });

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        // Mouse move handler
        const handleMouseMove = (e: MouseEvent) => {
            mouseRef.current = {
                x: e.clientX,
                y: e.clientY
            };
        };
        window.addEventListener('mousemove', handleMouseMove);

        // Animation
        let animationFrameId: number;
        const animate = () => {
            if (!ctx || !canvas) return;

            // Clear canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Create gradient
            const gradient = ctx.createRadialGradient(
                mouseRef.current.x,
                mouseRef.current.y,
                0,
                mouseRef.current.x,
                mouseRef.current.y,
                300
            );

            // Add color stops with theme-aware colors
            gradient.addColorStop(0, `${colors[0]}${Math.round(opacity * 255).toString(16).padStart(2, '0')}`);
            gradient.addColorStop(0.5, `${colors[1]}${Math.round(opacity * 0.5 * 255).toString(16).padStart(2, '0')}`);
            gradient.addColorStop(1, `${colors[2]}00`);

            // Fill with gradient
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Draw mesh points
            const gridSize = 50;
            const points: { x: number; y: number }[] = [];

            for (let x = 0; x < canvas.width; x += gridSize) {
                for (let y = 0; y < canvas.height; y += gridSize) {
                    const distance = Math.hypot(
                        x - mouseRef.current.x,
                        y - mouseRef.current.y
                    );
                    const maxDistance = 300;
                    const influence = Math.max(0, 1 - distance / maxDistance);

                    points.push({
                        x: x + (mouseRef.current.x - x) * influence * speed,
                        y: y + (mouseRef.current.y - y) * influence * speed
                    });
                }
            }

            // Draw connections with theme-aware color
            ctx.strokeStyle = `${colors[0]}${Math.round(opacity * 255).toString(16).padStart(2, '0')}`;
            ctx.lineWidth = 0.5;

            points.forEach((point, i) => {
                points.slice(i + 1).forEach(otherPoint => {
                    const distance = Math.hypot(
                        point.x - otherPoint.x,
                        point.y - otherPoint.y
                    );
                    if (distance < gridSize * 1.5) {
                        ctx.beginPath();
                        ctx.moveTo(point.x, point.y);
                        ctx.lineTo(otherPoint.x, otherPoint.y);
                        ctx.stroke();
                    }
                });
            });

            animationFrameId = requestAnimationFrame(animate);
        };

        animate();

        // Cleanup
        return () => {
            window.removeEventListener('resize', resizeCanvas);
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animationFrameId);
        };
    }, [colors, opacity, speed]);

    return (
        <canvas
            ref={canvasRef}
            className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
        />
    );
} 