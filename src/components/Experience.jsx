import React, { useEffect, useState } from "react";

const Experience = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const section = document.getElementById("experience");
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

  const experiences = [
    {
      company: "Aspivision Solutions",
      role: "Software Engineer Intern",
      period: "June 2023 - June 2024",
      description: `Developed and maintained 10+ full-stack applications using HTML, CSS, JavaScript, React.js, Node.js, and .NET. Collaborated effectively with a remote team of 10+ members to deliver high-quality software solutions. Optimized application performance and implemented responsive UI components for improved user experience.`,
      tech: ["React", "Node.js", ".NET", "HTML", "CSS", "JavaScript"]
    },
    {
      company: "Morgan Stanley",
      role: "Analyst",
      period: "July 2024 - July 2025",
      description: `Worked remotely on enterprise-level applications built with React, .NET, Node.js, and Java. Contributed as part of a large team of 50+ members to implement scalable and efficient software solutions. Assisted in designing and integrating new features while maintaining code quality and adherence to best practices.`,
      tech: ["React", ".NET", "Node.js", "Java"]
    },
    {
      company: "Cognivra Technologies",
      role: "Software Engineer Intern",
      period: "August 2025 - Present",
      description: `Currently working on developing and maintaining React, Node.js, and Java applications. Focused on building efficient, scalable, and user-friendly web solutions for enterprise clients. Collaborating with cross-functional teams to deliver feature-rich applications and troubleshoot technical issues.`,
      tech: ["React", "Node.js", "Java"]
    }
  ];

  return (
    <section id="experience" className="min-h-screen py-24 px-4 relative overflow-hidden bg-white dark:bg-transparent transition-colors duration-300">
      <div className="container mx-auto relative z-10">
        {/* Section Title */}
        <div className="mb-16 text-center">
        <h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white relative inline-block">
            <span className="relative z-10">Work Experience</span>
          </h2>
          <div className="w-24 h-1 bg-blue-500 mx-auto rounded-full mb-6"></div>
          
        </div>

        {/* Diagonal Timeline Container */}
        <div className="relative">
          {/* Main timeline diagonal line */}
          {/* <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-400 via-blue-500 to-blue-600 transform -translate-x-1/2 md:rotate-12 md:h-full"></div> */}
          
          {/* Experience cards */}
          <div className="relative z-10 space-y-24">
            {experiences.map((exp, index) => (
              <div 
                key={index} 
                className={`flex flex-col md:flex-row items-start transition-all duration-1000 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
                }`} 
                style={{ transitionDelay: `${index * 300}ms` }}
              >
                {/* Timeline Node */}
                <div className="flex flex-row md:flex-col items-center relative mb-6 md:mb-0">
                  <div className="w-16 h-16 rounded-full bg-blue-500 shadow-lg shadow-blue-500/30 flex items-center justify-center text-white text-xl font-bold mr-6 md:mr-0 md:mb-4 z-10">
                    {index + 1}
                  </div>
                  <div className="hidden md:block w-px h-16 bg-blue-400/50 absolute top-16 left-1/2 transform -translate-x-1/2"></div>
                  <div className="text-blue-300 font-medium whitespace-nowrap">{exp.period}</div>
                </div>
                
                {/* Content card - position alternating on desktop */}
                <div className={`bg-gray-50 dark:bg-transparent hover:bg-blue-50 dark:hover:bg-blue-500/10 transition-all duration-300 backdrop-blur-sm shadow-md rounded-2xl p-8 shadow-xl border-[2px] border-blue-500/10 ml-22 md:ml-0 md:w-5/6 ${
                  index % 2 === 0 
                    ? "md:ml-auto md:mr-16" 
                    : "md:ml-16"
                }`}>
                  {/* Company and role */}
                  <div className="flex flex-col mb-4">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{exp.company}</h3>
                    <div className="inline-flex items-center">
                      <div className="w-2 h-6 bg-blue-500 rounded-full mr-3"></div>
                      <h4 className="text-lg font-semibold text-blue-600 dark:text-blue-200">{exp.role}</h4>
                    </div>
                  </div>
                  
                  {/* Description */}
                  <p className="text-gray-600 dark:text-gray-300 mb-6">{exp.description}</p>
                  
                  {/* Tech stack pills */}
                  <div className="flex flex-wrap gap-2">
                    {exp.tech.map((tech, i) => (
                      <span 
                        key={i} 
                        className="px-3 py-1 rounded-full text-sm bg-blue-500/10 text-blue-600 dark:text-blue-300 border border-blue-500/20"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  {/* Decorative elements */}
                  <div className={`absolute ${
                    index % 2 === 0 
                      ? "left-0 bottom-0 rounded-bl-2xl" 
                      : "right-0 bottom-0 rounded-br-2xl"
                  } w-20 h-20 opacity-10 bg-blue-500/20`}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Background circuitry pattern */}
      <div className="absolute inset-0 overflow-hidden opacity-5">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="circuit" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <path d="M0 50 L30 50 L35 45 L40 55 L45 45 L50 55 L55 45 L60 55 L65 50 L100 50" 
                    stroke="#3b82f6" strokeWidth="1" fill="none" />
              <path d="M50 0 L50 30 L45 35 L55 40 L45 45 L55 50 L45 55 L55 60 L50 65 L50 100" 
                    stroke="#3b82f6" strokeWidth="1" fill="none" />
              <circle cx="50" cy="50" r="3" fill="#3b82f6" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#circuit)" />
        </svg>
      </div>
    </section>
  );
};

export default Experience;