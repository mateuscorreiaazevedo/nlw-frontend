'use client'

import { memoryService } from '../service/memory-service'
import { Trash } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'

type Props = {
  id: string
}

export const DeleteMemory = ({ id }:Props) => {
  const { refresh } = useRouter()

  async function deleteMemory () {
    try {
      await memoryService.delete(id)
      refresh()
    } catch (error) {
      console.error((error as any).message)
    }
  }
  return (
    <button onClick={deleteMemory} className="flex w-full justify-center items-center gap-2 py-0.5 px-1 hover:bg-gray-600 cursor-pointer transition-colors">
      <Trash className="w-4 h-4 text-red-500" />
      Deletar
    </button>
  )
}
