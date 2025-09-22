'use client'

import { useTheme } from '@/app/context/ThemeContext'

const About = () => {
  const { colors } = useTheme()
  return (
    <div className='max-w-screen-xl mx-auto px-4 grid md:grid-cols-2 gap-8 items-start'>
      <div>
        <h2 className='text-3xl font-semibold mb-4' style={{ color: colors.primary }}>
          About me
        </h2>
        <p className='leading-7' style={{ color: colors.secondaryText }}>
          I specialize in React and Next.js. My experience includes building design systems,
          performant SPA/SSR applications, and ensuring accessibility (a11y). I love writing tests,
          exploring great DX tools, and collaborating on projects that make a real impact
        </p>
      </div>
      <div
        className='rounded-3xl p-6 shadow'
        style={{ background: colors.cardBackground, color: colors.buttonText }}
      >
        <ul className='list-disc pl-6 space-y-1'>
          <li>Languages: JavaScript, TypeScript</li>
          <li>Frameworks & Libraries: React, Next.js (App Router, API, Auth)</li>
          <li>UI Libraries: Material UI, Tailwind CSS, Bootstrap</li>
          <li>Data Handling & Forms: Axios, Fetch API, Formik, Yup, Zod</li>
          <li>Development Tools: Webpack, Gulp, Husky (Git hooks & linting), Git, JIRA</li>
          <li>Backend & Databases (basic): Node.js, Express.js, MongoDB</li>
          <li>Containerization & Orchestration: familiar with Kubernetes, Docker</li>
        </ul>
      </div>
    </div>
  )
}

export default About
