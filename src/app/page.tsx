import HeroParallax from '@/app/components/HeroParallax'
import About from '@/app/components/About'
import Projects from '@/app/components/Projects'
import Contacts from '@/app/components/Contacts'

const HomePage = () => {
  return (
    <div>
      <HeroParallax />
      <section id='projects' className='py-16'>
        <Projects />
      </section>
      <section id='about' className='py-16'>
        <About />
      </section>
      <section id='contact' className='py-16'>
        <Contacts />
      </section>
    </div>
  )
}

export default HomePage
