'use client'

type DownloadButtonProps = {
  href?: string
  filename?: string
  className?: string
  label?: string
}

const DownloadButton = ({ href, filename, label, className }: DownloadButtonProps) => {
  return (
    <a href={href} download={filename} aria-label='Download CV PDF' className={className}>
      <svg viewBox='0 0 24 24' className='h-5 w-5' aria-hidden='true'>
        <path
          d='M12 3v10m0 0 4-4m-4 4-4-4M5 21h14'
          fill='none'
          stroke='currentColor'
          strokeWidth={1.5}
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </svg>
      <span>{label}</span>
    </a>
  )
}

export default DownloadButton
