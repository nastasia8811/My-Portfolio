import HeroParallax from '@/app/components/HeroParallax'
import Effects from '@/app/components/Effects'
import About from '@/app/components/About'
import Projects from '@/app/components/Projects'
import Contacts from '@/app/components/Contacts'
import PortfolioChat from '@/app/components/PortfolioChat'
import { getProjects } from '@/lib/data'

const HomePage = () => {
  const projects = getProjects()

  return (
    <main>
      <HeroParallax />
      <Effects />
      <Projects />
      <About />
      <Contacts />
      <PortfolioChat projects={projects} />
    </main>
  )
}

export default HomePage
