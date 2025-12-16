"use client"

import { ReactNode } from 'react'
 

interface PageBackgroundProps {
  children: ReactNode
  className?: string
}

export function PageBackground({ children, className = "" }: PageBackgroundProps) {
  return (
    <div className={`relative min-h-screen overflow-hidden ${className}`}>
      <div className="absolute inset-0 bg-background" />
      <div className="absolute inset-0 bg-gradient-to-br from-[#ffffff] via-[#f5f3ff] to-[#fde7f3]" />
      <div className="relative z-10">{children}</div>
    </div>
  )
}
