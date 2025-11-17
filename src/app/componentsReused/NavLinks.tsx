import Link from 'next/link'

const navLinks = [
  { label: 'My Projects', href: '#projects' },
  { label: 'About me', href: '#about' },
  { label: 'Contact me', href: '#contact' }
]

interface NavLinksProps {
  onClick?: () => void
}

const NavLinks = ({ onClick }: NavLinksProps) => {
  return navLinks.map(({ label, href }) => (
    <Link
      key={label}
      href={href}
      onClick={onClick}
      className='hover:text-accent transition  duration-200 ease-in-out hover:-translate-y-1 hover:scale-110 text-white'
    >
      {label}
    </Link>
  ))
}

export default NavLinks
