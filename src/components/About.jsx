import React from "react";
import { ChevronDown } from "lucide-react";

const About = () => {
    const scrollToNextSection = () => {
        // Scroll to the next section smoothly
        window.scrollBy({
            top: window.innerHeight,
            behavior: 'smooth'
        });
    };

    return (
        <section id="about" className="relative min-h-screen w-full flex flex-col items-center justify-center px-4 py-16 md:py-24  overflow-hidden pt-24">
            {/* Added extra top padding (pt-24) to account for navbar above */}
            <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-12 lg:gap-20">
                {/* Image container */}
                <div className="w-full md:w-2/5 flex justify-center items-center">
                    <div className="w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden shadow-[0_0_30px_10px_rgba(59,130,246,0.3)] transition-all duration-500 hover:shadow-[0_0_40px_15px_rgba(59,130,246,0.5)]">
                        <img
                            src="./aboutimg.png"
                            alt="Bhagirath Auti"
                            className="w-full h-full object-cover object-top"
                        />
                    </div>
                </div>

                {/* Text content */}
                <div className="w-full md:w-3/5 flex flex-col justify-center items-center md:items-start space-y-6 text-center md:text-left">
                    <h1 className="text-4xl sm:text-5xl md:text-5xl lg:text-5xl text-blue-500 font-extrabold tracking-tight">
                        <span className="inline-block relative">
                            Bhagirath Auti
                            <span className="absolute -bottom-1 left-0 w-full h-1 bg-blue-500 rounded"></span>
                        </span>
                    </h1>

                    <h2 className="text-lg md:text-xl lg:text-2xl text-cyan-100 font-medium leading-relaxed max-w-2xl">
                        MERN stack developer passionate about building efficient, user-friendly applications. Detail-oriented, creative, and always eager to learn and innovate with clean code and modern UI experiences.
                    </h2>

                    <div className="pt-6">
                        <a href="#contact">
                            <button
                                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
                            >
                                View My Work
                                <ChevronDown size={20} />
                            </button>
                        </a>

                    </div>
                </div>
            </div>

            {/* Scroll down button */}
            <button
                onClick={scrollToNextSection}
                className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce"
                aria-label="Scroll to next section"
            >
                <div className="flex flex-col items-center gap-2">
                    <span className="text-cyan-100 text-sm font-medium">Scroll Down</span>
                    <div className="bg-blue-500 p-3 rounded-full shadow-lg shadow-blue-500/30">
                        <ChevronDown size={24} className="text-white" />
                    </div>
                </div>
            </button>
        </section>
    );
};

export default About;