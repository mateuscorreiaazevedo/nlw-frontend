import { Camera, ChevronLeft } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export default function NewMemory () {
  return (
    <div className="flex flex-1 flex-col gap-4">
      <Link href="/" className="flex items-center gap-1 text-sm text-gray-200 hover:text-gray-100 hover:underline">
        <ChevronLeft className="w-4 h-4" />
        voltar à timeline
      </Link>

      <form className="flex flex-1 flex-col gap-2">
        <fieldset className="flex items-center gap-4">
          <input type="file" id="media" className="hidden" />
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
            />
            Tornar memória pública
          </label>
        </fieldset>
        <textarea
          name="content"
          id=""
          spellCheck={false}
          placeholder='Fique livre para adicionar fotos, vídeos e relatos sobre essa experiência que você quer lembrar para sempre.'
          className="w-full rounded flex-1 focus:ring-0 leading-relaxed text-gray-100 placeholder:text-gray-400 resize-none border-0 bg-transparent p-0 text-lg"
        />
      </form>
    </div>
  )
}
