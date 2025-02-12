'use client'

import Hero from '../components/Hero'
import Features from '../components/Features'
import Services from '../components/Services'
import CaseStudies from '../components/CaseStudies'
import Team from '../components/Team'
import Contact from '../components/Contact'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <Features />
      <Services />
      <CaseStudies />
      <Team />
      <Contact />
      <Footer />
    </main>
  )
}
