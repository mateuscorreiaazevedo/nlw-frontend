import { ArrowRight } from 'lucide-react'
import { memoryService } from '@/modules/memories'
import { EmptyMemories } from '@/modules/core'
import { cookies } from 'next/headers'
import Image from 'next/image'
import Link from 'next/link'
import dayjs from 'dayjs'

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
          <time className="flex font-alt items-center gap-2 text-sm text-gray-100 -ml-8 before:h-px before:w-5 before:bg-gray-50">
            {dayjs(memory.createdAt).format('D[ de ]MMMM[, ]YYYY')}
          </time>
          <Image
            src={memory.coverUrl}
            alt=""
            width={592}
            height={280}
            className="w-full aspect-video object-cover rounded-lg"
          />
          <p className="text-lg leading-relaxed text-gray-100">{memory.excerpt}</p>
          <Link
            href={`/memories/${memory.id}`}
            className="flex items-center self-start hover:gap-3 gap-2 text-sm text-gray-200 hover:text-gray-100 transition-all hover:underline"
          >
            Ler mais <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      ))}
    </div>
  )
}
