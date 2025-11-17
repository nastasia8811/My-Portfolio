import HeroParallax from '@/app/components/HeroParallax'
import About from '@/app/components/About'
import Projects from '@/app/components/Projects'
import Contacts from '@/app/components/Contacts'

const HomePage = () => {
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
    </div>
  )
}

export default HomePage
