import Link from 'next/link'
import * as React from 'react'

const Navigation = () => {
  return (
    <nav className='gap-4 inline-flex items-center rounded-[--radius-md] px-3 py-2 text-sm font-medium '>
      <Link
        href='/about'
        shallow={false}
        className='hover:text-accent transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110'
      >
        About me
      </Link>
      <Link
        href='/projects'
        className='hover:text-accent transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110'
      >
        My Projects
      </Link>
      <Link
        href='/contact'
        className='hover:text-accent transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110'
      >
        Contact
      </Link>
    </nav>
  )
}

export default Navigation
