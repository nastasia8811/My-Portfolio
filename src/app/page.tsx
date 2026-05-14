import HeroParallax from '@/app/components/HeroParallax'
import About from '@/app/components/About'
import Projects from '@/app/components/Projects'
import Contacts from '@/app/components/Contacts'
import PortfolioChat from '@/app/components/PortfolioChat'
import { getProjects } from '@/lib/data'

const HomePage = () => {
  const projects = getProjects()

  return (
    <div>
      <HeroParallax />
      <section id='projects'>
        <Projects />
      </section>
      <section id='about'>
        <About />
      </section>
      <section id='contact'>
        <Contacts />
      </section>
      <PortfolioChat projects={projects} />
    </div>
  )
}

export default HomePage
