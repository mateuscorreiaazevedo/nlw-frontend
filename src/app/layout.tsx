import { Roboto_Flex as Main, Bai_Jamjuree as Alternate } from 'next/font/google'
import '../assets/globals.css'

import { SignIn, Hero, Footer } from '@/modules/core'
import { BackgroundBlur, Stripes } from '@/main/ui'
import { Profile } from '@/modules/user'
import { cookies } from 'next/headers'

import { ReactNode } from 'react'

const main = Main({
  subsets: ['latin'],
  variable: '--font-main'
})

const alternate = Alternate({
  subsets: ['latin'],
  weight: '700',
  variable: '--font-alternate'
})

export const metadata = {
  title: 'NLW Spacetime',
  description: 'Uma cápsula do tempo construída com React, Next.js, TailwindCSS e Typescript.'
}

export default function RootLayout ({ children }: { children: ReactNode }) {
  const isAuthenticated = cookies().has('token')

  return (
    <html lang="en">
      <body className={`${main.variable} ${alternate.variable} bg-gray-900 font-sans text-gray-100`}>
        <main className="grid grid-cols-2 min-h-screen">
          <section className="relative flex flex-col items-start justify-between px-28 py-16 overflow-hidden border-r border-white/10 bg-cover bg-[url(../assets/images/bg-stars.svg)]">
            {isAuthenticated ? <Profile /> : <SignIn />}
            <Hero />
            <Footer />
            <BackgroundBlur />
            <Stripes />
          </section>
          <section className="flex flex-col p-16 bg-cover bg-[url(../assets/images/bg-stars.svg)]">
            {children}
          </section>
        </main>
      </body>
    </html>
  )
}
