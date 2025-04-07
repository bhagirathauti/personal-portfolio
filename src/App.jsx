import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import About from './components/About'
import EducationTimeline from './components/Education'
import Skills from './components/Skills'
import Experience from './components/Experience'
import ProjectCube from './components/Projects'
import Contact from './components/Contact'
import Footer from './components/Footer'
import ScrollToTopButton from './components/ScrollToTop'

function App() {
  return (
    <>
      {/* Fullscreen background container */}
      <div className=" bg-black bg-cover backdrop-blur-lg  bg-center">
        <Navbar />
        <About/>
        <EducationTimeline/>
        <Skills/>
        <Experience/>
        <ProjectCube/>
        <Contact/>
        <Footer/>
        <ScrollToTopButton/>
      </div>
    </>
  )
}

export default App
