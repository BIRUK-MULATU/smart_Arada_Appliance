import type { ReactNode } from 'react'

export default function Container({
  children,
  className = '',
  fluid = false,
}: {
  children: ReactNode
  className?: string
  fluid?: boolean
}) {
  return (
    <div className={`mx-auto w-full ${fluid ? 'max-w-none' : 'max-w-7xl'} px-4 sm:px-6 lg:px-8 ${className}`}>
      {children}
    </div>
  )
}
