'use client'

import { useRouter } from 'next/navigation'
import { Pen } from 'lucide-react'
import React from 'react'

type Props = {
  id: string
}

export const EditMemory = ({ id }:Props) => {
  const { push } = useRouter()

  return (
    <button onClick={() => push(`/memories/${id}/edit`)} className="flex w-full justify-center items-center gap-2 py-0.5 px-1 hover:bg-gray-600 cursor-pointer transition-colors">
      <Pen className="w-4 h-4 text-gray-200" />
      Editar
    </button>
  )
}
