import { useTheme } from '@/app/context/ThemeContext'

interface PageTitleProps {
  title: string
  id: string
}

const PageTitle = ({ title, id }: PageTitleProps) => {
  const { colors } = useTheme()
  return (
    <h2
      id={id}
      className='text-3xl tracking-tight font-semibold mb-12'
      style={{ color: colors.primary }}
    >
      {title}
    </h2>
  )
}

export default PageTitle
