import React from 'react'
import './App.css'
import Navbar from './components/Navbar'
import About from './components/About'
import EducationTimeline from './components/Education'
import Skills from './components/Skills'
import Experience from './components/Experience'
import ProjectCube from './components/Projects'
import Stats from './components/Stats'
import Contact from './components/Contact'
import Footer from './components/Footer'
import ScrollToTopButton from './components/ScrollToTop'

function App() {
  return (
    <>
      {/* Navbar moved outside main background wrapper to avoid stacking context issues */}
      <Navbar />

      {/* Fullscreen background container */}
      <div className="bg-gray-50 dark:bg-black bg-cover backdrop-blur-lg bg-center min-h-screen transition-colors duration-300">
        <About/>
        <EducationTimeline/>
        <Skills/>
        <Experience/>
  <Stats/>
  <ProjectCube/>
        <Contact/>
        <Footer/>
        <ScrollToTopButton/>
      </div>
    </>
  )
}

export default App
