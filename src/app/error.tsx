'use client'

import { useEffect } from 'react'

const Error = ({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) => {
  useEffect(() => {
    console.error('Route error:', error)
  }, [error])

  return (
    <div className='flex min-h-[60vh] flex-col items-center justify-center px-4 text-center'>
      <h2 className='mb-4 text-2xl font-semibold text-zinc-900 dark:text-zinc-100'>
        Something went wrong
      </h2>
      <p className='mb-8 max-w-md text-zinc-500 dark:text-zinc-400'>
        An unexpected error occurred. You can try again or refresh the page.
      </p>
      <button
        type='button'
        onClick={reset}
        className='rounded-lg bg-brand-600 px-6 py-2.5 font-medium text-white transition-colors hover:bg-brand-700'
      >
        Try again
      </button>
    </div>
  )
}

export default Error
