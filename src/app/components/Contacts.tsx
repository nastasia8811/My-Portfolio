'use client'

import { useTheme } from '@/app/context/ThemeContext'
import { FaLinkedin, FaGithub } from 'react-icons/fa'
import { MdEmail } from 'react-icons/md'

const Contacts = () => {
  const { colors } = useTheme()

  return (
    <div
      className='min-h-screen flex flex-col items-center justify-center px-4 text-center'
      style={{ background: colors.background }}
    >
      <h2 className='text-3xl font-semibold mb-8' style={{ color: colors.primary }}>
        Contact Me
      </h2>

      <p className='mb-24' style={{ color: colors.secondaryText }}>
        Let’s build something great together. Get in touch with me!
      </p>

      <div className='flex flex-col md:flex-row items-center justify-center gap-6'>
        <a
          href='https://www.linkedin.com/in/anastasiia-melnyk-frontend'
          target='_blank'
          className='flex items-center gap-2 px-4 py-2 rounded-xl transition
            transform hover:scale-105 hover:shadow-lg'
          style={{
            background: colors.buttonBackground,
            color: colors.buttonText
          }}
        >
          <FaLinkedin size={20} />
          <span>LinkedIn</span>
        </a>

        <a
          href='https://github.com/nastasia8811'
          target='_blank'
          className='flex items-center gap-2 px-4 py-2 rounded-xl transition
            transform hover:scale-105 hover:shadow-lg'
          style={{
            background: colors.buttonBackground,
            color: colors.buttonText
          }}
        >
          <FaGithub size={20} />
          <span>GitHub</span>
        </a>

        <a
          href='mailto:melnykk.ana@gmail.com'
          className='flex items-center gap-2 px-4 py-2 rounded-xl transition
            transform hover:scale-105 hover:shadow-lg'
          style={{
            background: colors.buttonBackground,
            color: colors.buttonText
          }}
        >
          <MdEmail size={22} />
          <span>Send Email</span>
        </a>
      </div>
    </div>
  )
}

export default Contacts
