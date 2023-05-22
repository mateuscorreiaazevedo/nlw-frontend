import { Popover } from '@/main/ui'
import { dateHelper } from '@/modules/core'
import { DeleteMemory, EditMemory, memoryService } from '@/modules/memories'
import { MoreHorizontal } from 'lucide-react'
import { cookies } from 'next/headers'
import Image from 'next/image'
import React from 'react'

export async function generateMetadata ({ params }: ParamsInterface) {
  const { id } = params
  const token = cookies().get('token')?.value
  const memory = await memoryService.getById(id, token)

  return {
    title: `${memory?.content} | NLW Spacetime`
  }
}

export default async function Memory ({ params }: ParamsInterface) {
  const { id } = params
  const token = cookies().get('token')?.value

  const memory = await memoryService.getById(id, token)

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <time className="flex font-alt items-center gap-2 text-sm text-gray-100 -ml-8 before:h-px before:w-5 before:bg-gray-50">
          {dateHelper.formatDate(memory?.createdAt)}
        </time>
        <Popover
          className="bg-gray-700 rounded-lg mr-14 w-28 flex flex-col py-2"
          button={
            <button className="p-2 rounded-full active:bg-gray-600">
              <MoreHorizontal className='w-4 h-4 text-gray-200' />
            </button>
          }
        >
          <DeleteMemory id={memory!.id} />
          <EditMemory id={memory!.id} />
        </Popover>
      </div>

      <div className="w-full aspect-video object-cover rounded-lg bg-gray-800">
        <Image
          src={memory!.coverUrl}
          alt=""
          width={592}
          height={280}
          loading="lazy"
          className="w-full aspect-video object-cover rounded-lg"
        />
      </div>
      <p className="text-base leading-relaxed text-gray-100">
        {memory?.content}
      </p>
    </div>
  )
}
