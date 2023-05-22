import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export default function Layout ({ children }:{children: React.ReactNode}) {
  return (
    <div className="flex flex-1 flex-col gap-4">
      <Link href="/" className="flex items-center gap-1 text-sm text-gray-200 hover:text-gray-100 hover:underline">
        <ChevronLeft className="w-4 h-4" />
        voltar à timeline
      </Link>
      {children}
    </div>
  )
}
