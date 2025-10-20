import React, { useState, useEffect } from "react";

import { SiReact, SiHtml5, SiCss3, SiJavascript, SiAngular, SiNodedotjs, SiExpress, SiMongodb, SiMysql, SiPostman, SiTailwindcss, SiBootstrap, SiChakraui } from 'react-icons/si';
import { FaGithub, FaGitAlt, FaFigma } from 'react-icons/fa';
import { FiDatabase } from 'react-icons/fi';

// Small icon badge component used as a lightweight fallback
const IconBadge = ({ label, bg = '#60a5fa', className = '' }) => (
  <div
    className={`${className} flex items-center justify-center rounded-full text-white`} 
    style={{ background: bg, width: 36, height: 36 }}
    aria-hidden
  >
    <span className="text-sm font-semibold leading-none">{label}</span>
  </div>
);

// Inline Java icon
const JavaIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M7 3s5 1 9 0c0 0-1 3-5 4 4 1 5 6 0 9 0 0 1 1 3 1-5 3-10 0-10-6 0-6 6-8 6-8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M6 21s3-1 6-1 6 1 6 1" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// Inline Material icon fallback
const MaterialIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M3 3v18h4V8l5 11 5-11v13h4V3h-4l-5 11L7 3H3z" fill="currentColor" />
  </svg>
);

// helper to safely use an imported icon or fallback to IconBadge
const getIcon = (IconComponent, fallbackLabel, fallbackColor) => {
  return IconComponent ? (props) => <IconComponent {...props} /> : (props) => <IconBadge {...props} label={fallbackLabel} bg={fallbackColor} />;
};

// Floating animation CSS (injected once)
const globalCssForAnimation = `
@keyframes float {
  0% { transform: translate(0, 0) rotate(0deg); opacity: 0; }
  20% { opacity: 0.5; }
  50% { transform: translate(100px, -100px) rotate(180deg); opacity: 0.2; }
  80% { opacity: 0.5; }
  100% { transform: translate(0, 0) rotate(360deg); opacity: 0; }
}

.animate-float {
  animation: float linear infinite;
}
`;

function useInjectGlobalCss(css) {
  useEffect(() => {
    if (typeof document === 'undefined') return;
    if (document.querySelector('style[data-injected="floating-animation"]')) return;
    const style = document.createElement('style');
    style.setAttribute('data-injected', 'floating-animation');
    style.innerHTML = css;
    document.head.appendChild(style);
  }, [css]);
}

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const section = document.getElementById("skills");
      if (section) {
        const sectionTop = section.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        if (sectionTop < windowHeight * 0.75) setIsVisible(true);
      }
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();

    const checkMobile = () => setIsMobile(typeof window !== 'undefined' && window.innerWidth < 640);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useInjectGlobalCss(globalCssForAnimation);

  const skills = {
    frontend: [
      { name: "React", rating: 5, Icon: SiReact },
      { name: "HTML", rating: 5, Icon: SiHtml5 },
      { name: "CSS", rating: 5, Icon: SiCss3 },
      { name: "JavaScript", rating: 5, Icon: SiJavascript },
      { name: "AngularJS", rating: 3, Icon: SiAngular }
    ],
    backend: [
      { name: "NodeJS", rating: 5, Icon: SiNodedotjs },
      { name: "Express.js", rating: 4, Icon: SiExpress },
      { name: "Java", rating: 4, Icon: JavaIcon },
      { name: ".NET Core", rating: 3 }
    ],
    database: [
      { name: "MongoDB", rating: 5, Icon: SiMongodb },
      { name: "MySQL", rating: 5, Icon: SiMysql }
    ],
    uiLibraries: [
      { name: "Material UI", rating: 5, Icon: getIcon(MaterialIcon, 'MUI', '#0ea5e9') },
      { name: "Tailwind CSS", rating: 5, Icon: getIcon(SiTailwindcss, 'TW', '#06b6d4') },
      { name: "Bootstrap", rating: 5, Icon: getIcon(SiBootstrap, 'BS', '#6b7280') },
      { name: "Chakra UI", rating: 5, Icon: getIcon(SiChakraui, 'CH', '#06b6d4') }
    ],
    tools: [
      { name: "Postman", rating: 5, Icon: SiPostman },
      { name: "Dbartisan", rating: 5, Icon: FiDatabase },
      { name: "Git", rating: 5, Icon: FaGitAlt },
      { name: "GitHub", rating: 5, Icon: FaGithub },
      { name: "Figma", rating: 5, Icon: FaFigma }
    ]
  };

  const renderStarRating = (rating) => (
    <div className="flex items-center gap-1">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          xmlns="http://www.w3.org/2000/svg"
          className={`h-4 w-4 sm:h-6 sm:w-6 transition-all duration-300 ${i < rating ? "fill-yellow-500 text-yellow-500" : "fill-gray-700 text-gray-700"} ${i < rating ? "scale-110" : "scale-100"}`}
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );

  const allSkills = [
    ...skills.frontend.map(skill => ({ ...skill, category: "Frontend" })),
    ...skills.backend.map(skill => ({ ...skill, category: "Backend" })),
    ...skills.database.map(skill => ({ ...skill, category: "Database" })),
    ...skills.uiLibraries.map(skill => ({ ...skill, category: "UI Libraries" })),
    ...skills.tools.map(skill => ({ ...skill, category: "Tools" }))
  ];

  const filteredSkills = isMobile ? allSkills : (activeCategory === "all" ? allSkills : allSkills.filter(skill => skill.category.toLowerCase() === activeCategory));

  return (
    <section id="skills" className="min-h-0 py-8 sm:py-12 px-3 sm:px-4 bg-gray-50 dark:bg-transparent transition-colors duration-300">
      <div className="container mx-auto">
        <div className="mb-12 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-gray-900 dark:text-white relative inline-block">
            <span className="relative z-10">Skills</span>
            <span className="absolute bottom-0 left-0 w-full h-3 bg-blue-100 dark:bg-cyan-100 opacity-20 rounded" />
          </h2>
          <div className="w-20 h-1 bg-blue-500 mx-auto rounded-full mb-4" />
          <p className="text-gray-700 dark:text-cyan-100 max-w-2xl mx-auto">Skills that I have attained till now.</p>
        </div>

        {!isMobile && (
          <div className="flex overflow-x-auto whitespace-nowrap gap-4 mb-8 justify-center hide-scrollbar">
            {["all", "frontend", "backend", "database", "ui libraries", "tools"].map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 sm:px-6 sm:py-3 uppercase font-bold tracking-wider transition-all duration-300 border-2 whitespace-nowrap flex-shrink-0 ${
                  activeCategory === category
                    ? "bg-blue-500 border-blue-500 text-white shadow-lg shadow-blue-500/30"
                    : "bg-transparent border-blue-500/30 text-blue-500 hover:border-blue-500"
                } rounded-lg relative overflow-hidden`}
              >
                {category === "all" ? "All Skills" : category}
                {activeCategory === category && <span className="absolute inset-0 bg-white/10 animate-pulse" />}
              </button>
            ))}
          </div>
        )}

        <div className={`grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          {filteredSkills.map((skill, index) => (
            <div key={`${skill.category}-${skill.name}`} className="transition-all duration-500" style={{ transitionDelay: `${(index % 9) * 70}ms` }}>
              <div className="relative bg-white dark:bg-transparent hover:bg-blue-50 dark:hover:bg-blue-500/10 border-[2px] border-blue-500/10 p-3 sm:p-6 rounded-xl hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 group overflow-hidden">
                <div className="absolute -right-12 -top-12 w-20 h-20 rounded-full bg-blue-500/10 group-hover:bg-blue-500/20 transition-all duration-300" />
                <div className="absolute -left-16 -bottom-16 w-28 h-28 rounded-full bg-blue-500/5 group-hover:bg-blue-500/10 transition-all duration-500" />

                <div className="inline-block px-3 py-1 mb-4 text-xs font-semibold text-blue-500 bg-blue-500/10 rounded-full">{skill.category}</div>

                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0 text-blue-500">
                    {skill.Icon ? <skill.Icon className="h-8 w-8 sm:h-10 sm:w-10" /> : <IconBadge label="?" />}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-400 transition-colors duration-300">{skill.name}</h3>
                    <div className="flex items-center mt-1 text-sm sm:text-base">{renderStarRating(skill.rating)}</div>
                  </div>
                </div>

                <div className="mt-4 sm:mt-6 h-px w-full bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Floating coding symbols background - hidden on small screens */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden hidden sm:block">
        {['</>', '{}', '[]', '//', '**', '==', '=>', '+=', '&&'].map((symbol, i) => (
          <div key={i} className="absolute text-blue-500/10 font-mono animate-float" style={{
            fontSize: `${Math.random() * 40 + 20}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDuration: `${Math.random() * 20 + 10}s`,
            animationDelay: `${Math.random() * 10}s`,
            opacity: Math.random() * 0.5
          }}>{symbol}</div>
        ))}
      </div>
    </section>
  );
};

export default Skills;