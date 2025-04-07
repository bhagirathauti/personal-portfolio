import React, { useState, useEffect } from "react";

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const section = document.getElementById("skills");
      if (section) {
        const sectionTop = section.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (sectionTop < windowHeight * 0.75) {
          setIsVisible(true);
        }
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check on initial load
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const skills = {
    frontend: [
      { name: "React", rating: 5 },
      { name: "HTML", rating: 5 },
      { name: "CSS", rating: 5 },
      { name: "JavaScript", rating: 5 },
      { name: "AngularJS", rating: 3 }
    ],
    backend: [
      { name: "NodeJS", rating: 5 },
      { name: ".NET Core", rating: 3 }
    ],
    database: [
      { name: "MongoDB", rating: 5 },
      { name: "MySQL", rating: 5 }
    ],
    uiLibraries: [
      { name: "Material UI", rating: 5 },
      { name: "Tailwind CSS", rating: 5 },
      { name: "Bootstrap", rating: 5 },
      { name: "Chakra UI", rating: 5 }
    ]
  };

  // Function to render star rating with golden color
  const renderStarRating = (rating) => {
    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            xmlns="http://www.w3.org/2000/svg"
            className={`h-6 w-6 transition-all duration-300 ${
              i < rating ? "fill-yellow-500 text-yellow-500" : "fill-gray-700 text-gray-700"
            } ${i < rating ? "scale-110" : "scale-100"}`}
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
            />
          </svg>
        ))}
      </div>
    );
  };

  const allSkills = [
    ...skills.frontend.map(skill => ({ ...skill, category: "Frontend" })),
    ...skills.backend.map(skill => ({ ...skill, category: "Backend" })),
    ...skills.database.map(skill => ({ ...skill, category: "Database" })),
    ...skills.uiLibraries.map(skill => ({ ...skill, category: "UI Libraries" }))
  ];

  const filteredSkills = activeCategory === "all" 
    ? allSkills 
    : allSkills.filter(skill => skill.category.toLowerCase() === activeCategory);

  return (
    <section id="skills" className="min-h-screen py-24 px-4">
      <div className="container mx-auto">
        {/* Section Title with animated underline */}
        <div className="mb-16 text-center">
        <h2 className="text-4xl font-bold mb-4 text-white relative inline-block">
            <span className="relative z-10">Skills</span>
            <span className="absolute bottom-0 left-0 w-full h-3 bg-cyan-100 opacity-20 rounded"></span>
          </h2>
          <div className="w-24 h-1 bg-blue-500 mx-auto rounded-full mb-6"></div>
          <p className="text-cyan-100 max-w-2xl mx-auto">Skills that I have attained till now.</p>
        </div>

        {/* Custom Category Selector */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {["all", "frontend", "backend", "database", "ui libraries"].map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-3 uppercase font-bold tracking-wider transition-all duration-300 border-2 ${
                activeCategory === category
                  ? "bg-blue-500 border-blue-500 text-white shadow-lg shadow-blue-500/30"
                  : "bg-transparent border-blue-500/30 text-blue-500 hover:border-blue-500"
              } rounded-lg relative overflow-hidden`}
            >
              {category === "all" ? "All Skills" : category}
              {activeCategory === category && (
                <span className="absolute inset-0 bg-white/10 animate-pulse"></span>
              )}
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <div 
          className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
          }`}
        >
          {filteredSkills.map((skill, index) => (
            <div 
              key={`${skill.category}-${skill.name}`}
              className={`transition-all duration-500`}
              style={{ transitionDelay: `${(index % 9) * 100}ms` }}
            >
              <div className="relative bg-transparent hover:bg-blue-500/10 border-[2px] border-blue-500/10 p-6 rounded-xl hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 group overflow-hidden">
                {/* Background decoration */}
                <div className="absolute -right-12 -top-12 w-32 h-32 rounded-full bg-blue-500/10 group-hover:bg-blue-500/20 transition-all duration-300"></div>
                <div className="absolute -left-16 -bottom-16 w-40 h-40 rounded-full bg-blue-500/5 group-hover:bg-blue-500/10 transition-all duration-500"></div>
                
                {/* Category badge */}
                <div className="inline-block px-3 py-1 mb-4 text-xs font-semibold text-blue-500 bg-blue-500/10 rounded-full">
                  {skill.category}
                </div>
                
                {/* Skill content */}
                <div className="flex flex-col gap-2">
                  <h3 className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors duration-300">
                    {skill.name}
                  </h3>
                  
                  {/* Golden star rating */}
                  <div className="flex items-center">
                    {renderStarRating(skill.rating)}
                  </div>
                </div>
                
                {/* Skill description line - subtle tech pattern */}
                <div className="mt-6 h-px w-full bg-gradient-to-r from-transparent via-blue-500/30 to-transparent"></div>
                
                {/* Decorative tech elements */}
                <div className="absolute bottom-3 right-3 opacity-20 group-hover:opacity-40 transition-opacity duration-300">
                  <svg className="h-8 w-8 text-blue-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 6V2M12 6C10.3431 6 9 7.34315 9 9C9 10.6569 10.3431 12 12 12M12 6C13.6569 6 15 7.34315 15 9C15 10.6569 13.6569 12 12 12M12 12V22M7 19H3M4 16H3M5 13H3M21 19H17M21 16H20M21 13H19" 
                      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Floating coding symbols background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {["</>", "{}", "[]", "//", "**", "==", "=>", "+=", "&&"].map((symbol, i) => (
          <div 
            key={i}
            className="absolute text-blue-500/10 font-mono animate-float"
            style={{
              fontSize: `${Math.random() * 40 + 20}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDuration: `${Math.random() * 20 + 10}s`,
              animationDelay: `${Math.random() * 10}s`,
              opacity: Math.random() * 0.5
            }}
          >
            {symbol}
          </div>
        ))}
      </div>
    </section>
  );
};

// CSS to add to your global styles for the floating animation
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

export default Skills;