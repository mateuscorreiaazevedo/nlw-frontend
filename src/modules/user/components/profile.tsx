import React from 'react'
import { userService } from '../service/user-service'
import Image from 'next/image'

export const Profile = () => {
  const { avatarUrl, name } = userService.getUser()

  return (
    <div className="flex items-center gap-3 text-left">
      <Image src={avatarUrl} alt={name} width={45} height={45} className="w-10 h-10 rounded-full" />
      <p className="text-sm leading-snug max-w-[140px]">
        {name}
        <a href="/api/auth/logout" className="block text-red-400 font-alt hover:text-red-300">
          Sair
        </a>
      </p>
    </div>
  )
}
