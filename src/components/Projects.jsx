import React, { useState, useEffect, useRef } from 'react';

const ProjectCube = () => {
  const [currentFace, setCurrentFace] = useState(0);
  const [startX, setStartX] = useState(0);
  const [isSwiping, setIsSwiping] = useState(false);
  const cubeRef = useRef(null);

  // Sample project data
  const projects = [
    {
      id: 1,
      name: "Aspivision Solutions",
      image: "./aspivisionsolutions.png",
      link: "https://aspivision.in",
      description: [
        "Tech Stack: React.js, Tailwindcss, Email.js.",
        "Professional website for Aspivision Solutions.",
        "Shows services, portfolio, contacts,etc about Aspivsion Solutions."
      ]
    },
    {
      id: 2,
      name: "GNR Recycle",
      image: "./gnrrecycle.png",
      link: "https://gnrrecycle.com",
      description: [
        "Tech Stack: React.js, Tailwindcss, Google Sheets API.",
        "Professional website for GNR Recycling India.",
        "Added Google Sheets API to store data from the contact us form."
      ]
    },
    {
      id: 3,
      name: "Mobikoo.com",
      image: "./mobikoo.png",
      link: "https://mobikoo.com",
      description: [
        "Tech Stack: MongoDB, Express.js, React.js, Node.js, AWS, Cashfree.",
        "Full stack website for a Insurance company.",
        "Implemented Payment Gateway."
      ]
    },
    {
      id: 4,
      name: "Aspivision Solutions",
      image: "./aspivisionsolutions.png",
      link: "https://aspivision.in",
      description: [
        "Tech Stack: React.js, Tailwindcss, Email.js.",
        "Professional website for Aspivision Solutions.",
        "Shows services, portfolio, contacts,etc about Aspivsion Solutions."
      ]
    },
    {
      id: 5,
      name: "GNR Recycle",
      image: "./gnrrecycle.png",
      link: "https://gnrrecycle.com",
      description: [
        "Tech Stack: React.js, Tailwindcss, Google Sheets API.",
        "Professional website for GNR Recycling India.",
        "Added Google Sheets API to store data from the contact us form."
      ]
    },
    {
      id: 6,
      name: "Mobikoo.com",
      image: "./mobikoo.png",
      link: "https://mobikoo.com",
      description: [
        "Tech Stack: MongoDB, Express.js, React.js, Node.js, AWS, Cashfree.",
        "Full stack website for a Insurance company.",
        "Implemented Payment Gateway."
      ]
    }
  ];

  // Electric blue color for Tailwind custom styles
  const electricBlue = "#00BFFF";

  // Handle next/previous face navigation
  const navigateCube = (direction) => {
    const totalFaces = 6;
    if (direction === 'next') {
      setCurrentFace((prev) => (prev + 1) % totalFaces);
    } else {
      setCurrentFace((prev) => (prev - 1 + totalFaces) % totalFaces);
    }
  };

  // Handle touch events for mobile swipe
  const handleTouchStart = (e) => {
    setStartX(e.touches[0].clientX);
    setIsSwiping(true);
  };

  const handleTouchMove = (e) => {
    if (!isSwiping) return;
    
    const currentX = e.touches[0].clientX;
    const diff = startX - currentX;
    
    if (Math.abs(diff) > 50) {
      setIsSwiping(false);
      if (diff > 0) {
        navigateCube('next');
      } else {
        navigateCube('prev');
      }
    }
  };

  const handleTouchEnd = () => {
    setIsSwiping(false);
  };

  // Get transform for current face
  const getCubeTransform = () => {
    switch (currentFace) {
      case 0: return 'rotateY(0deg)';
      case 1: return 'rotateY(-90deg)';
      case 2: return 'rotateY(-180deg)';
      case 3: return 'rotateY(-270deg)';
      case 4: return 'rotateX(-90deg)';
      case 5: return 'rotateX(90deg)';
      default: return 'rotateY(0deg)';
    }
  };

  return (
    <section id="projects" className="py-16 bg-transparent rounded-xl">
      <div className="max-w-6xl mx-auto px-4">
        {/* Section Header */}
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-bold mb-4 text-white relative inline-block">
            <span className="relative z-10">My Projects</span>
            <span className="absolute bottom-0 left-0 w-full h-3 bg-cyan-100 opacity-20 rounded"></span>
          </h2>
          <div className="w-24 h-1 bg-blue-500 mx-auto rounded-full mb-6"></div>
          <p className="text-cyan-100 max-w-2xl mx-auto">My academic journey and qualifications that have shaped my professional path.</p>
        </div>

        <div className="flex flex-col items-center mx-10">
        {/* 3D Cube Container */}
        <div 
          className="w-full max-w-md h-96 relative perspective-1000 my-8 mx-10"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div 
            ref={cubeRef}
            className="w-full h-full relative transform-style-3d transition-transform duration-700"
            style={{ transform: getCubeTransform() }}
          >
            {projects.map((project, index) => (
              <div 
                key={project.id}
                className="absolute w-full h-full p-6 rounded-lg shadow-xl border-[2px] shadow-md hover:bg-blue-500/10 transition-all duration-300 backdrop-blur-sm shadow-md border-blue-500/20 flex flex-col backface-hidden"
                style={{ 
                  transform: index === 0 ? 'rotateY(0deg) translateZ(12rem)' :
                            index === 1 ? 'rotateY(90deg) translateZ(12rem)' :
                            index === 2 ? 'rotateY(180deg) translateZ(12rem)' :
                            index === 3 ? 'rotateY(270deg) translateZ(12rem)' :
                            index === 4 ? 'rotateX(90deg) translateZ(12rem)' :
                            'rotateX(-90deg) translateZ(12rem)'
                }}
              >
                <img 
                  src={project.image} 
                  alt={project.name} 
                  className="w-full h-40 object-cover rounded-lg mb-4" 
                />
                <h3 className="text-2xl font-bold text-blue-500  mb-2">
                  {project.name}
                </h3>
                <a 
                  href={project.link} 
                  target="_blank"
                  rel="noopener noreferrer" 
                  className="text-sm mb-4 text-blue-500 underline"
                >
                  View Project
                </a>
                <ul className="list-disc pl-5 mb-4 text-sm text-cyan-100">
                  {project.description.map((item, i) => (
                    <li key={i} className="mb-1">{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Controls */}
        <div className="flex justify-center gap-4 mt-8">
          <button 
            onClick={() => navigateCube('prev')}
            className="px-6 py-2 rounded-full shadow-md text-blue-500 border-blue-500 transition-colors duration-300 hover:bg-blue-100"
            style={{ backgroundColor: 'white', borderWidth: '2px' }}
          >
            Previous
          </button>
          <button 
            onClick={() => navigateCube('next')}
            className="px-6 py-2 rounded-full shadow-md bg-blue-500 text-white transition-colors duration-300 hover:bg-blue-400"
          >
            Next
          </button>
        </div>

        {/* Current Project Indicator */}
        <div className="flex justify-center gap-2 mt-6">
          {projects.map((_, index) => (
            <div 
              key={index}
              className={`w-3 h-3 rounded-full transition-colors duration-300 ${currentFace === index ? 'bg-blue-500' : 'bg-gray-300'}`}
              style={{ backgroundColor: currentFace === index ? electricBlue : undefined }}
            />
          ))}
        </div>
      </div>

      <style jsx>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .transform-style-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
      `}</style>

        </div>
        </section>
  );
};

export default ProjectCube;