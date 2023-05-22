'use client'

import { memoryService } from '../service/memory-service'
import { FormMediaPicker } from './form-media-picker'
import { useRouter } from 'next/navigation'
import { Camera } from 'lucide-react'
import React from 'react'

interface Props {
  memory?: Memory
}

export const Form = ({ memory }: Props) => {
  const { replace } = useRouter()

  async function handleCreateMemory (e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    const fileToUpload = formData.get('coverUrl')
    const content = formData.get('content') as string
    const isPublic = formData.get('isPublic') as string | null

    let coverUrl = memory?.coverUrl ?? ''

    try {
      if (fileToUpload) {
        const uploadFormData = new FormData()
        uploadFormData.set('file', fileToUpload)

        coverUrl = (await memoryService.uploadFile(uploadFormData)) as string
      }

      if (memory) {
        await memoryService.editMemory(memory.id, {
          content,
          coverUrl,
          isPublic
        })
      } else {
        await memoryService.createMemory({
          content,
          coverUrl,
          isPublic
        })
      }
      replace('/')
    } catch (error) {
      console.error((error as any).message)
    }
  }

  return (
    <form onSubmit={handleCreateMemory} className="flex flex-1 flex-col gap-2">
      <fieldset className="flex items-center gap-4">
        <label
          htmlFor="media"
          className="flex cursor-pointer items-center gap-1.5 text-sm text-gray-200 hover:text-gray-100 transition-colors"
        >
          <Camera className="w-4 h-4" />
          Anexar mídia
        </label>
        <label
          htmlFor="isPublic"
          className="flex items-center gap-1.5 text-sm text-gray-200 hover:text-gray-100 transition-colors"
        >
          <input
            className="h-4 w-4 rounded border-gray-400 bg-gray-700 text-purple-500 outline-none"
            type="checkbox"
            name="isPublic"
            id="isPublic"
            value="true"
            defaultChecked={memory?.isPublic ?? false}
          />
          Tornar memória pública
        </label>
      </fieldset>
      <FormMediaPicker coverUrl={memory?.coverUrl} />
      <textarea
        name="content"
        defaultValue={memory?.content ?? ''}
        spellCheck={false}
        placeholder="Fique livre para adicionar fotos, vídeos e relatos sobre essa experiência que você quer lembrar para sempre."
        className="w-full rounded flex-1 focus:ring-0 leading-relaxed text-gray-100 placeholder:text-gray-400 resize-none border-0 bg-transparent p-0 text-lg"
      />
      <button
        className="font-black self-end rounded-full hover:bg-green-600 active:bg-green-400 transition-colors bg-green-500 px-5 py-3 font-alt text-sm uppercase leading-none text-black"
        type="submit"
      >
        Salvar
      </button>
    </form>
  )
}
