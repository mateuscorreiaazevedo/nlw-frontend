import { DeleteMemory, EditMemory, memoryService } from '@/modules/memories'
import { ArrowRight, MoreHorizontal } from 'lucide-react'
import { EmptyMemories, dateHelper } from '@/modules/core'
import { cookies } from 'next/headers'
import { Popover } from '@/main/ui'
import Image from 'next/image'
import Link from 'next/link'

export default async function Home () {
  const isAuth = cookies().has('token')
  const token = cookies().get('token')?.value
  let memories: MemoryInfo[] | undefined

  try {
    memories = await memoryService.getAll(token!)
  } catch (error) {
    console.error((error as any).message)
  }

  if (!isAuth) return <EmptyMemories />
  if (memories?.length === 0) return <EmptyMemories />

  return (
    <div className="flex flex-col gap-10">
      {memories?.map(memory => (
        <div key={memory.id} className="space-y-4">
          <div className="flex items-center justify-between">
            <time className="flex font-alt items-center gap-2 text-sm text-gray-100 -ml-8 before:h-px before:w-5 before:bg-gray-50">
              {dateHelper.formatDate(memory.createdAt)}
            </time>
            <Popover
              className="bg-gray-700 rounded-lg mr-14 w-28 flex flex-col py-2"
              button={
                <button className="p-2 rounded-full active:bg-gray-600">
                  <MoreHorizontal className="w-4 h-4 text-gray-200" />
                </button>
              }
            >
              <DeleteMemory id={memory.id} />
              <EditMemory id={memory.id} />
            </Popover>
          </div>

          <div className="w-full aspect-video object-cover rounded-lg bg-gray-600">
            <Image
              src={memory.coverUrl}
              alt=""
              width={592}
              height={280}
              loading='lazy'
              className="w-full aspect-video object-cover rounded-lg"
            />
          </div>
          <p className="text-lg leading-relaxed text-gray-100">{memory.excerpt}</p>
          <Link
            href={`/memories/${memory.id}`}
            className="group/more flex items-center self-start hover:gap-3 gap-2 text-sm text-gray-200 hover:text-gray-100 transition-all hover:underline"
          >
            Ler mais <ArrowRight className="w-4 h-4 group-hover/more:w-5 group-hover/more:h-5" />
          </Link>
        </div>
      ))}
    </div>
  )
}
