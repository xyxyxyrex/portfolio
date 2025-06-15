'use client';

import Typewriter from './Typewriter';
import GradientMesh from './GradientMesh';

export default function Hero() {
    return (
        <>
            <GradientMesh />
            <section className="min-h-[calc(100vh-4rem)] flex items-center justify-between px-100 py-0 relative z-10">
                <div className="flex-1 max-w-2xl">
                    <h1 className="text-5xl font-bold mb-6">
                        Hi! I'm <span className="text-[var(--accent)]">Xyrex Kyle Salazar.</span>
                    </h1>
                    <p className="text-2xl mb-8 text-[var(--foreground)]/80">
                        <Typewriter 
                            text="A Web Developer and Multimedia Artist."
                            delay={1000}
                            speed={50}
                        />
                    </p>
                    
                    <div className="flex gap-6 mb-8">
                        <a 
                            href="https://github.com/yourusername" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-[var(--foreground)] hover:text-[var(--accent)] transition-colors"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                            </svg>
                        </a>
                        <a 
                            href="https://linkedin.com/in/yourusername" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-[var(--foreground)] hover:text-[var(--accent)] transition-colors"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                            </svg>
                        </a>
                        <a 
                            href="https://facebook.com/yourusername" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-[var(--foreground)] hover:text-[var(--accent)] transition-colors"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
                            </svg>
                        </a>
                    </div>

                    <button className="px-8 py-3 bg-[var(--accent)] text-white rounded-lg hover:bg-[var(--accent)]/90 transition-all transform hover:scale-105">
                        View My Work
                    </button>
                </div>
                <div className="flex-1 flex justify-end items-center">
                    <div className="relative w-[400px] h-[400px] rounded-full overflow-hidden border-4 border-[var(--accent)]">
                        <img
                            src="/profile.jpg"
                            alt="Xyrex Kyle Salazar"
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>
        </section>
        </>
    );
}