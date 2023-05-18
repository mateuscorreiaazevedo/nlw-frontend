import React from 'react'

import nlwLogo from '../../../assets/images/nlw-spacetime-logo.svg'
import Image from 'next/image'

export const Hero = () => {
  return (
    <div className="space-y-5">
      <Image src={nlwLogo} alt="Nlw Logo Image" width={160} height={48} />
      <div className="max-w-[420px] space-y-1">
        <h1 className="mt-5 text-h1 font-bold leading-tight text-gray-50">Sua cápsula do tempo</h1>
        <p className="text-lg leading-relaxed">
          Colecione momentos marcantes da sua jornada e compartilhe (se quiser) com o mundo!
        </p>
      </div>
      <a
        className="inline-block font-black rounded-full bg-green-500 px-5 py-3 font-alt text-sm uppercase leading-none text-black"
        href=""
      >
        cadastrar lembrança
      </a>
    </div>
  )
}
