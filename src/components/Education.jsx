import React, { useState, useEffect, useRef } from 'react';
import { BookOpen, Calendar, MapPin } from 'lucide-react';

// Placeholder data - replace image paths with your actual logos
const educationData = [
  {
    id: 1,
    degree: "Class 12th",
    institution: "Army Public School, Kirkee",
    location: "Pune, IN",
    duration: "2021 - 2023",
    description: "Completed secondary schooling.",
    achievements: ["80.02% in Board Examination", "90.07 Percentile in JEE Mains"],
    image: '/apskirkee.jpg',
    imagePosition: 'right center',
  },
  {
    id: 2,
    degree: "Bachelor of Technology in Computer Science Engineering",
    institution: "MIT Art, Design and Technology University",
    location: "Pune, IN",
    duration: "2023 - 2027",
    description: "Software Development, Operating Systems, Software Product Engineering in association with Kalvium.",
    achievements: ["CGPA First Sem: 8.50", "CGPA Second Sem: 8.30", "CGPA Third Sem: 9.41"],
    image: '/mitadtuniversity.jpg',
  },
  {
    id: 3,
    degree: "Certificate: Prompt Engineering for ChatGPT",
    institution: "Vanderbilt University",
    location: "Online",
    duration: "Nov 2023 - Feb 2024",
    description: "A course to learn to interact with AI models and generate precise content.",
    achievements: ["Perfect Attendance"],
    image: '/vanderbilt.jpg',
  }
];

const EducationTimeline = () => {
  // hover state not required — keeping visual hover purely via CSS
  const [inView, setInView] = useState({});
  const imageRefs = useRef([]);
  const containerRefs = useRef([]);
  const loadedRef = useRef([]);
  const [isMobile, setIsMobile] = useState(false);

  // IntersectionObserver for reveal animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.getAttribute('data-id');
          if (entry.isIntersecting) {
            setInView((s) => ({ ...s, [id]: true }));
          }
        });
      },
      { threshold: 0.15 }
    );

    containerRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Preload background images so parallax is applied only after they're ready
  useEffect(() => {
    loadedRef.current = [];
    educationData.forEach((item, i) => {
      const img = new Image();
      img.src = item.image;
      img.onload = () => {
        loadedRef.current[i] = true;
        // when an image loads, ensure parallax updates for it using the same local-only, clamped formula
        if (typeof window !== 'undefined') requestAnimationFrame(() => {
          const el = imageRefs.current[i];
          if (!el) return;
          const rect = el.getBoundingClientRect();
          const windowH = window.innerHeight;
          const elementCenter = rect.top + rect.height / 2;
          const distanceFromCenter = elementCenter - windowH / 2;
          const localFactor = 0.06; // local parallax strength
          const maxOffset = 48; // pixels - prevents the image from moving too far
          let offset = -distanceFromCenter * localFactor;
          // clamp to avoid vanishing images
          offset = Math.max(Math.min(offset, maxOffset), -maxOffset);
          el.style.transform = `translate3d(0, ${offset}px, 0)`;
        });
      };
      img.onerror = () => {
        // still mark as loaded to avoid blocking
        loadedRef.current[i] = true;
      };
    });
  }, []);

  // Parallax effect for images using requestAnimationFrame for smoothness
  useEffect(() => {
    let ticking = false;

    const update = () => {
      imageRefs.current.forEach((img, i) => {
        if (!img) return;
        if (!loadedRef.current[i]) return; // wait until image is loaded
        const rect = img.getBoundingClientRect();
        const windowH = window.innerHeight;
        const elementCenter = rect.top + rect.height / 2;
        const distanceFromCenter = elementCenter - windowH / 2;

    // Use a local-only parallax based on distance from viewport center.
    // This avoids accumulating a large global offset as the page scrolls which
    // could push the background far out of its overflow-hidden container.
    const localFactor = 0.06; // tuned strength
    const maxOffset = 48; // prevent the image from moving outside the visible area
    let offset = -distanceFromCenter * localFactor;
    offset = Math.max(Math.min(offset, maxOffset), -maxOffset);
    img.style.transform = `translate3d(0, ${offset}px, 0)`;
      });
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    // initial update in case images are already cached
    if (typeof window !== 'undefined') requestAnimationFrame(update);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  // detect mobile (below md breakpoint)
  useEffect(() => {
    const onResize = () => {
      if (typeof window === 'undefined') return;
      setIsMobile(window.innerWidth < 768);
    };
    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // no-op: hover handled via CSS; removed unused handlers to satisfy linter

  return (
    <section id="education" className="py-16 bg-white dark:bg-transparent rounded-xl transition-colors duration-300">
      <div className=" mx-auto px-4">
        {/* Section Header */}
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white relative inline-block">
            <span className="relative z-10">Education & Certifications</span>
            
          </h2>
          <div className="w-24 h-1 bg-blue-500 mx-auto rounded-full mb-6"></div>
          <p className="text-gray-700 dark:text-cyan-100 max-w-2xl mx-auto">My academic journey and certifications.</p>
        </div>

        {/* Cards */}
        <div className="flex flex-col gap-12">
          {isMobile ? (
            educationData.map((item) => (
              <div key={item.id} className="w-full rounded-xl overflow-hidden shadow-sm">
                <img src={item.image} alt={item.institution} className="w-full h-56 object-cover" />
                <div className="p-4 bg-white dark:bg-slate-900">
                  <h3 className="text-lg font-bold mb-1 text-gray-900 dark:text-white">{item.degree}</h3>
                  <p className="text-sm text-gray-700 dark:text-cyan-100 mb-2">{item.institution}</p>
                  <div className="text-sm text-gray-600 dark:text-cyan-100 mb-2">{item.duration} • {item.location}</div>
                  {item.description && <p className="text-sm mb-2 text-gray-600 dark:text-cyan-100">{item.description}</p>}
                  {item.achievements && (
                    <div className="flex flex-wrap gap-2">
                      {item.achievements.map((ach, i) => (
                        <span key={i} className="px-3 py-1 bg-white text-blue-700 rounded-full text-xs shadow-sm">{ach}</span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))
          ) : (
            educationData.map((item, index) => {
              const isEven = index % 2 === 0;
              return (
                <div
                  key={item.id}
                  data-id={item.id}
                  ref={(el) => (containerRefs.current[index] = el)}
                  className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-6 md:gap-12 transition-all duration-700 transform ${inView[item.id] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                >
                  <div className="w-full md:w-full h-full relative">
                      <div className="relative w-full h-full md:h-96 rounded-2xl overflow-hidden shadow-md backdrop-blur-sm bg-transparent dark:bg-transparent hover:bg-blue-50 dark:hover:bg-blue-500/10 transition-all duration-300 transform border-[2px] border-blue-500/10 group">
                      {/* Image half (left or right depending on isEven) */}
                      <div className={`${isEven ? 'left-0' : 'right-0'} absolute top-0 h-full w-[60%] overflow-hidden`} style={{ zIndex: 0 }}>
                        <div
                          ref={(el) => (imageRefs.current[index] = el)}
                          className="absolute left-0 w-full h-[150%]"
                          style={{
                            top: '-25%',
                            backgroundImage: `url(${item.image})`,
                            backgroundSize: 'cover',
                            backgroundPosition: item.imagePosition || (isEven ? '20% center' : '80% center'),
                            backgroundRepeat: 'no-repeat',
                            willChange: 'transform',
                            pointerEvents: 'none',
                            transform: 'translate3d(0,0,0)',
                          }}
                        />
                        {/* Decorative element (subtle corner accent like Experience cards) */}
                        <div className={`absolute ${isEven ? 'left-0 bottom-0 rounded-bl-2xl' : 'right-0 bottom-0 rounded-br-2xl'} w-20 h-20 opacity-10 bg-blue-500/20`}></div>
                      </div>

                      {/* Info half (opposite side) */}
                      <div className={`${isEven ? 'right-0' : 'left-0'} absolute top-0 h-full w-[40%] flex items-center`} style={{ zIndex: 40 }}>
                        <div className={`w-full h-full p-6 sm:p-10 ${isEven ? 'pl-8 pr-6' : 'pr-8 pl-6'} backdrop-blur-sm relative z-50 flex flex-col justify-center transition-all duration-300`}>
                          <h3 className={`text-3xl sm:text-2xl lg:text-3xl font-extrabold leading-tight mb-2 ${isEven ? 'text-right' : 'text-left'} text-gray-900 dark:text-white`}>{item.degree}</h3>
                          <p className={`text-sm sm:text-base font-medium mb-3 ${isEven ? 'text-right' : 'text-left'} text-gray-700 dark:text-cyan-100`}>{item.institution}</p>

                          <div className={`flex items-center text-sm sm:text-sm mb-3 gap-3 ${isEven ? 'justify-end text-gray-600 dark:text-cyan-100' : 'justify-start text-gray-600 dark:text-cyan-100'}`}>
                            <div className="flex items-center opacity-95">
                              <Calendar className="mr-2" size={14} />
                              <span>{item.duration}</span>
                            </div>
                            <div className="flex items-center opacity-95">
                              <MapPin className="mr-2" size={14} />
                              <span>{item.location}</span>
                            </div>
                          </div>

                          {item.description && <p className={`text-sm sm:text-sm mb-4 ${isEven ? 'text-right text-gray-600 dark:text-cyan-100' : 'text-left text-gray-600 dark:text-cyan-100'}`}>{item.description}</p>}

                          {item.achievements && (
                            <div className="mt-2">
                              <h4 className={`font-semibold text-sm mb-2 ${isEven ? 'text-right text-gray-800 dark:text-cyan-100' : 'text-left text-gray-800 dark:text-cyan-100'}`}>Highlights</h4>
                              <div className={`flex flex-wrap gap-2 ${isEven ? 'justify-end' : 'justify-start'}`}>
                                {item.achievements.map((ach, i) => (
                                  <span
                                    key={i}
                                    className={`px-3 py-1 rounded-full text-xs shadow-sm bg-white text-blue-700 dark:bg-white/10 dark:text-cyan-100 transition-colors duration-200`}
                                    title={ach}
                                  >
                                    {ach}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    </div>
                    </div>
                  );
            })
          )}
        </div>
      </div>
    </section>
  );
};

export default EducationTimeline;
