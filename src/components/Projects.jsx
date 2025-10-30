import React from 'react';

const Projects = () => {
  const projects = [
    {
      id: 1,
      name: 'Aspivision Solutions',
      image: './aspivisionsolutions.png',
      link: 'https://aspivision.in',
      short: 'Professional website for Aspivision Solutions built with React and TailwindCSS.',
      tech: ['React', 'TailwindCSS', 'Email.js']
    },
    {
      id: 2,
      name: 'GNR Recycle',
      image: './gnrrecycle.png',
      link: 'https://gnrrecycle.com',
      short: 'Corporate website for GNR Recycling India with Google Sheets integration for contact forms.',
      tech: ['React', 'TailwindCSS', 'Google Sheets API']
    },
    {
      id: 3,
      name: 'Mobikoo.com',
      image: './mobikoo.png',
      link: 'https://mobikoo.com',
      short: 'Full-stack insurance portal (MERN) with payment gateway integration (Cashfree).',
      tech: ['MongoDB', 'Express', 'React', 'Node', 'AWS', 'Cashfree']
    }
  ];

  return (
    <section id="projects" className="py-16 bg-gray-50 dark:bg-transparent rounded-xl transition-colors duration-300">
  <div className="max-w-7xl mx-auto px-4">
        <div className="mb-8 text-center">
          <h2 className="text-4xl font-bold mb-3 text-gray-900 dark:text-white inline-block">My Projects</h2>
          <div className="w-20 h-1 bg-blue-500 mx-auto rounded-full mb-4" />
          <p className="text-gray-700 dark:text-cyan-100 max-w-2xl mx-auto">A selection of projects I built — websites and full-stack apps showcasing frontend and backend work.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p) => (
            <article
              key={p.id}
              className="relative bg-white dark:bg-transparent hover:bg-blue-50 dark:hover:bg-blue-500/10 border-[2px] border-blue-500/10 p-3 sm:p-6 rounded-xl hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 group overflow-hidden flex flex-col"
            >
              <div className="h-40 w-full overflow-hidden rounded-t-lg bg-gray-100 dark:bg-slate-800">
                <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
              </div>

              <div className="flex-1 pt-4 pb-12">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 line-clamp-1">{p.name}</h3>
                <p className="text-sm text-gray-600 dark:text-cyan-100 mb-3 max-h-12 overflow-hidden text-ellipsis">{p.short}</p>

                <div className="flex flex-wrap mb-4 gap-2">
                  {p.tech.map((t) => (
                    <span
                      key={t}
                      className="text-xs mr-2 mb-2 px-2 py-1 rounded-full bg-gray-100 dark:bg-slate-800 text-gray-800 dark:text-gray-200"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* Decorative accents - hide on small screens */}
                <div className="hidden sm:block absolute -right-12 -top-12 w-20 h-20 rounded-full bg-blue-500/10 group-hover:bg-blue-500/20 transition-all duration-300" />
                <div className="hidden sm:block absolute -left-16 -bottom-16 w-28 h-28 rounded-full bg-blue-500/5 group-hover:bg-blue-500/10 transition-all duration-500" />
              </div>

              {/* Bottom-left action area */}
              <div className="absolute left-4 bottom-4">
                <a
                  href={p.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-blue-500 text-white text-sm hover:bg-blue-400 transition-colors"
                >
                  Visit
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;