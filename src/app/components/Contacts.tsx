'use client'

import { useTheme } from '@/app/context/ThemeContext'

const Contacts = () => {
  const { colors } = useTheme()
  return (
    <div className='max-w-screen-sm mx-auto px-4 text-center'>
      <h2 className='text-3xl font-semibold mb-4' style={{ color: colors.primary }}>
        Contact Me
      </h2>
      <p className='mb-6' style={{ color: colors.secondaryText }}>
        Let’s build something great together. Get in touch with me!
      </p>
      <p>Linkedin</p>
      <p>GitHub</p>
      <p>Telegram</p>
      <a
        href='mailto:melnykk.ana@gmail.com'
        className='inline-block px-6 py-3 rounded-2xl shadow'
        style={{ background: colors.buttonBackground, color: colors.buttonText }}
      >
        Send Email
      </a>
    </div>
  )
}

export default Contacts
