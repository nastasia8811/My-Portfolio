---
name: component
description: Create a new React component with co-located test file following project conventions
user_invocable: true
---

Create a React component based on the user's request. Follow every rule below exactly.

## Output Checklist

For every component, produce:

1. **Component file** — `src/app/components/Name.tsx`
2. **Test file** — `src/app/components/Name.test.tsx`

> **Reusable component?** If the component is meant to be shared across multiple pages/features, place both files in `src/app/componentsReused/` instead.

## Component Rules

### File & Export

- Always use **default export**
- Always use **arrow function** (`const Name = () => {}`)
- Always use **TypeScript** (`.tsx`)
- Always use `@/*` path alias for imports (maps to `src/*`)

### Props Interface

- Define a TypeScript interface named `NameProps`
- Include optional `className?: string` prop when the component renders a DOM element
- Use `ReactNode` for children

```typescript
interface ButtonProps {
  children: ReactNode
  onClick?: () => void
  className?: string
  variant?: 'primary' | 'secondary'
}
```

### Server vs Client

- **Server component by default** — no directive needed
- Add `'use client'` **only if** the component uses:
  - React hooks (`useState`, `useEffect`, `useRef`, etc.)
  - Event handlers (`onClick`, `onChange`, etc.)
  - Browser APIs (`window`, `document`, etc.)
  - Context hooks (`useTheme`, etc.)

### Styling

- **Tailwind CSS only** — no inline styles, no CSS modules
- Brand colors: `brand-50` through `brand-900`
- Dark mode: use `dark:` prefix
- For dynamic theme colors from `useTheme()`, use `style={{ color: colors.primary }}` (this is the only acceptable inline style pattern)
- Merge classNames with template literals or array `.join(' ')`:
  ```typescript
  className={`px-4 py-2 ${variant === 'primary' ? 'bg-brand-600' : 'bg-zinc-200'} ${className}`}
  ```

### Accessibility

- Use semantic HTML (`button`, `nav`, `section`, `h2`, etc.)
- Add ARIA attributes where native semantics are insufficient
- Interactive elements must be keyboard-accessible
- Images need `alt` text

## Component Template

```typescript
// 'use client' — only if needed

import { ReactNode } from 'react'

interface NameProps {
  children: ReactNode
  className?: string
}

const Name = ({ children, className = '' }: NameProps) => {
  return (
    <div className={`base-classes ${className}`}>
      {children}
    </div>
  )
}

export default Name
```

## Test Rules

### Setup

- Co-locate test file next to the component
- Import from `vitest`, `@testing-library/react`, `@testing-library/user-event`
- If the component uses `useTheme` or any context, use `renderWithTheme` from `@/test/helpers` instead of plain `render`

### What to Test

- Renders correctly with default props
- Renders each variant if applicable
- User interactions trigger expected behavior
- Custom `className` prop is applied
- Conditional rendering if any

### Query Priority

Prefer in this order:

1. `getByRole`
2. `getByLabelText`
3. `getByText`
4. `getByTestId` — last resort only

### User Interactions

Always use `userEvent`, not `fireEvent`:

```typescript
const user = userEvent.setup()
await user.click(button)
```

## Test Template

```typescript
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Name from './Name'

// If component uses ThemeContext:
// import { renderWithTheme } from '@/test/helpers'

describe('Name', () => {
  it('renders correctly', () => {
    render(<Name>Content</Name>)
    expect(screen.getByText(/content/i)).toBeInTheDocument()
  })

  it('applies custom className', () => {
    render(<Name className='custom'>Content</Name>)
    expect(screen.getByText(/content/i).className).toContain('custom')
  })
})
```

## Placement Decision

| Type                | Path                                |
| ------------------- | ----------------------------------- |
| Page-specific       | `src/app/components/Name.tsx`       |
| Reusable (2+ pages) | `src/app/componentsReused/Name.tsx` |

If unclear, default to `components/`. It can be moved later.
