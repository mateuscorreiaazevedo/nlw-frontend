'use client'

import { memoryService } from '../service/memory-service'
import { useParams, useRouter } from 'next/navigation'
import { Trash } from 'lucide-react'
import React from 'react'

type Props = {
  id: string
}

export const DeleteMemory = ({ id }:Props) => {
  const { refresh, push } = useRouter()
  const { id: paramsId } = useParams()

  async function deleteMemory () {
    try {
      await memoryService.delete(id)
      if (paramsId) {
        push('/')
      }
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
