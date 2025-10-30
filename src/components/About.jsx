import React, { useEffect, useState } from "react";
import { ChevronDown, Github, Linkedin, Instagram, Code, Download } from "lucide-react";

const About = () => {
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY);
        };
        
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToNextSection = () => {
        // Scroll to the next section smoothly
        window.scrollBy({
            top: window.innerHeight,
            behavior: 'smooth'
        });
    };

    return (
        <section id="about" className="relative min-h-screen w-full flex flex-col items-center justify-center px-4 py-16 md:py-24 overflow-hidden pt-24">
            {/* Parallax Background Image */}
            <div 
                className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat z-0"
                style={{
                    backgroundImage: "url('./aboutimg.jpg')",
                    transform: `translateY(${scrollY * 0.5}px)`,
                    transition: 'transform 0.1s ease-out'
                }}
            />
            
            {/* Black Overlay */}
            <div className="absolute inset-0 w-full h-full bg-black/70 dark:bg-black/80 z-10" />
            
            {/* Content - positioned above overlay */}
            <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-12 lg:gap-20 relative z-20">
                {/* Text content */}
                <div className="w-full flex flex-col justify-center items-center space-y-6 text-center">
                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white font-extrabold tracking-tight drop-shadow-2xl">
                        <span className="inline-block relative">
                            Bhagirath Auti
                            <span className="absolute -bottom-2 left-0 w-full h-2 bg-blue-500 rounded"></span>
                        </span>
                    </h1>

                    <h2 className="text-base md:text-lg lg:text-xl text-gray-200 font-medium leading-relaxed max-w-2xl drop-shadow-lg">
                        I’m a Full Stack Developer with 2.5 years of experience working with startups and MNCs. I build efficient, scalable web applications and enjoy delivering user-friendly solutions while continuously learning and adapting to new technologies.
                    </h2>

                    <div className="pt-6 flex flex-col items-center space-y-4 gap-5">
                        
                        {/* Social icon links */}
                        <div className="flex items-center justify-center gap-4 mt-4">
                            <a
                                href="https://leetcode.com/u/bhagirathauti/"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="LeetCode"
                                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-blue-300"
                                title="leetcode profile"
                            >
                                <Code size={30} />
                            </a>

                            <a
                                href="https://www.instagram.com/bhagirathauti"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Instagram"
                                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-blue-300"
                                title="Instagram profile"
                            >
                                <Instagram size={30} />
                            </a>

                            <a
                                href="https://www.linkedin.com/in/bhagirathauti/"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="LinkedIn"
                                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-blue-300"
                                title="LinkedIn profile"
                            >
                                <Linkedin size={30} />
                            </a>

                            <a
                                href="https://github.com/bhagirathauti"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="GitHub"
                                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-blue-300"
                                title="GitHub profile"
                            >
                                <Github size={30} />
                            </a>

                            {/* Resume download icon */}
                            <a
                                href="/BhagirathAuti_resume.pdf"
                                download
                                aria-label="Download resume"
                                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-blue-300"
                                title="Download Resume"
                            >
                                <Download size={30} />
                            </a>
                        </div>
                        <a href="#projects">
                            <button
                                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg shadow-blue-500/40 flex items-center gap-2"
                            >
                                View My Work
                                <ChevronDown size={24} />
                            </button>
                        </a>

                    </div>
                </div>
            </div>

            {/* Scroll down button */}
            <button
                onClick={scrollToNextSection}
                className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-10"
                aria-label="Scroll to next section"
            >
                <div className="flex flex-col items-center gap-2">
                    <span className="text-gray-200 text-sm font-medium drop-shadow-lg">Scroll Down</span>
                    <div className="bg-blue-500 p-3 rounded-full shadow-lg shadow-blue-500/50">
                        <ChevronDown size={24} className="text-white" />
                    </div>
                </div>
            </button>
        </section>
    );
};

export default About;
