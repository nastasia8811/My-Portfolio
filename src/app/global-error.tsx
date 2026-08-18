'use client'

import { useEffect } from 'react'

const GlobalError = ({
  error,
  reset
}: {
  error: Error & { digest?: string }
  reset: () => void
}) => {
  useEffect(() => {
    console.error('Global error:', error)
  }, [error])

  return (
    <html lang='en'>
      <body
        style={{
          margin: 0,
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily:
            'ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif',
          backgroundColor: '#fafafa',
          color: '#18181b'
        }}
      >
        <div style={{ textAlign: 'center', padding: '1rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '1rem' }}>
            Something went wrong
          </h2>
          <p
            style={{
              fontSize: '1rem',
              color: '#71717a',
              marginBottom: '2rem',
              maxWidth: '28rem'
            }}
          >
            A critical error occurred. Please try again.
          </p>
          <button
            type='button'
            onClick={reset}
            style={{
              padding: '0.625rem 1.5rem',
              fontSize: '1rem',
              fontWeight: 500,
              color: '#fff',
              backgroundColor: '#4f46e5',
              border: 'none',
              borderRadius: '0.5rem',
              cursor: 'pointer'
            }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  )
}

export default GlobalError
