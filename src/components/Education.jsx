import React, { useState, useEffect } from 'react';
import { BookOpen, Award, Calendar, MapPin } from 'lucide-react';

const EducationTimeline = () => {
  const [activeId, setActiveId] = useState(null);
  const [visibleItems, setVisibleItems] = useState({});

  const educationData = [
    {
      id: 1,
      degree: "Class 12th",
      institution: "Army Public School, Kirkee",
      location: "Pune, IN",
      duration: "2021 - 2023",
      description: "Completed secondary schooling ",
      achievements: ["80.02% in Board Examination", "90.07 Percentile in JEE Mains"],
    },
    {
      id: 2,
      degree: "Bachelor of Technology in Computer Science Engineering",
      institution: "MIT Art, Design and Technology University",
      location: "Pune, IN",
      duration: "2023 - 2027",
      description: "Software Development, Operating Systems, Software Product Enginnering in association with Kalvium",
      achievements: ["CGPA First Sem: 8.50", "CGPA Second Sem: 8.30", "CGPA Third Sem: 9.41"],
    },
    {
      id: 3,
      degree: "Certificate: Prompt Engineering for ChatGPT",
      institution: "Vanderbilt University",
      location: "Online",
      duration: "November 2023-February 2024",
      description: "3 month course to learn to interact with ai models and generate precise content",
      achievements: ["Perfect Attendance"],
    }
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      const newVisible = {};
      educationData.forEach((item) => {
        newVisible[item.id] = true;
      });
      setVisibleItems(newVisible);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  const handleMouseEnter = (id) => setActiveId(id);
  const handleMouseLeave = () => setActiveId(null);

  return (
    <section id="education" className="py-16 bg-transparent rounded-xl">
      <div className="max-w-6xl mx-auto px-4">
        {/* Section Header */}
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-bold mb-4 text-white relative inline-block">
            <span className="relative z-10">Education</span>
            <span className="absolute bottom-0 left-0 w-full h-3 bg-cyan-100 opacity-20 rounded"></span>
          </h2>
          <div className="w-24 h-1 bg-blue-500 mx-auto rounded-full mb-6"></div>
          <p className="text-cyan-100 max-w-2xl mx-auto">My academic journey and qualifications that have shaped my professional path.</p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-blue-500 rounded opacity-50"></div>

          {educationData.map((item, index) => {
            const isEven = index % 2 === 0;

            return (
              <div
                key={item.id}
                className={`flex flex-col  md:flex-row items-center mb-16 md:mb-8 ${isEven ? '' : 'md:flex-row-reverse'}`}
              >
                {/* Timeline dot */}
                <div className="absolute left-1/2 transform -translate-x-1/2 z-10">
                  <div
                    className={`w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center border-4 border-gray-900 
                    transition-all duration-300 ${activeId === item.id ? 'scale-125 shadow-lg shadow-blue-500/50' : ''}`}
                  >
                    <BookOpen size={16} className="text-white" />
                  </div>
                </div>

                {/* Content */}
                <div
                  className={`w-full md:w-1/2 ${isEven ? 'md:pr-12 md:text-right' : 'md:pl-12'} 
                  transform transition-all duration-700 ${visibleItems[item.id] ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
                  onMouseEnter={() => handleMouseEnter(item.id)}
                  onMouseLeave={handleMouseLeave}
                >
                  <div
                    className={`p-6 rounded-xl border-[2px] border-blue-500/20 ${
                      activeId === item.id ? 'bg-blue-500/10' : 'bg-transparent'
                    } hover:bg-blue-500/10 transition-all duration-300 backdrop-blur-sm shadow-md`}
                  >
                    <h3 className="text-xl font-bold text-white mb-2">{item.degree}</h3>
                    <p className="text-cyan-100 font-medium">{item.institution}</p>

                    <div className={`flex items-center text-cyan-100 text-sm mt-2 ${isEven ? 'md:justify-end' : ''}`}>
                      <Calendar className="mr-2" size={14} />
                      <span>{item.duration}</span>
                      <span className="mx-2">•</span>
                      <MapPin className="mr-1" size={14} />
                      <span>{item.location}</span>
                    </div>

                    <p className="text-cyan-100 mt-4 text-sm">{item.description}</p>

                    <div className="mt-4">
                      <h4 className="text-white font-semibold text-sm mb-2">Achievements</h4>
                      <div className={`flex flex-wrap gap-2 ${isEven ? 'md:justify-end' : ''}`}>
                        {item.achievements.map((achievement, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 bg-blue-500 text-blue-300 rounded-full text-xs"
                          >
                            {achievement}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Year bubble */}
                <div
                  className={`hidden md:block absolute left-1/2 transform ${
                    isEven ? 'translate-x-16' : '-translate-x-24'
                  } transition-all duration-300 ${activeId === item.id ? 'scale-110' : ''}`}
                >
                  <div className="px-4 py-1 bg-blue-500 text-white rounded-full text-sm font-medium">
                    {item.duration.split(' - ')[0]}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default EducationTimeline;
