'use client'

import { useTheme } from '@/app/context/ThemeContext'
import PageTitle from '@/app/componentsReused/PageTitle'

const About = () => {
  const { colors } = useTheme()
  return (
    <div
      aria-labelledby='about-heading'
      className='min-h-screen flex flex-col items-center justify-center px-4'
      style={{ background: colors.background }}
    >
      <PageTitle id='about-heading' title='About me' />

      <div className='max-w-screen-xl mx-auto px-4 grid grid-cols-1 gap-8 md:grid-cols-2'>
        <p className='leading-7' style={{ color: colors.secondaryText }}>
          Frontend Developer with 2+ years of hands-on experience building responsive, user-centric
          web applications. Skilled in creating reusable UI components, integrating RESTful APIs,
          and ensuring cross-browser compatibility. Adept at optimizing performance and enhancing
          user experience through clean code and innovative solutions. Strong team player who
          collaborates seamlessly with backend, design, and QA teams, while continuously adapting to
          new technologies and challenges.
        </p>

        <div
          className='rounded-3xl p-6 shadow'
          style={{ background: colors.cardBackground, color: colors.buttonText }}
        >
          <ul className='list-disc pl-6 space-y-1'>
            <li>Languages: JavaScript, TypeScript</li>
            <li>Frameworks & Libraries: React, Next.js, Vue.js </li>
            <li>UI Libraries: Material UI, Tailwind CSS, Bootstrap</li>
            <li>Backend & Databases (basic): Node.js, Express.js, MongoDB</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default About
