import Link from 'next/link'

const navLinks = [
  { label: 'Playground', href: '#playground' },
  { label: 'My Projects', href: '#projects' },
  { label: 'About', href: '#about' },
  { label: 'Contact me', href: '#contact' }
]

interface NavLinksProps {
  onClick?: () => void
}

// Text color is inherited from the parent so the same links work on the
// dark hero (desktop header) and on the theme-colored mobile menu.
const NavLinks = ({ onClick }: NavLinksProps) => {
  return navLinks.map(({ label, href }) => (
    <Link
      key={label}
      href={href}
      onClick={onClick}
      className='relative text-inherit uppercase transition-colors duration-300 ease-out hover:text-accent focus-visible:text-accent after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-full after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-300 after:ease-out hover:after:scale-x-100 focus-visible:after:scale-x-100 motion-reduce:after:transition-none'
    >
      {label}
    </Link>
  ))
}

export default NavLinks
