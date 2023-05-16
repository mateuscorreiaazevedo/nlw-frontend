import { Roboto } from 'next/font/google'
import '../assets/styles/globals.css'

const font = Roboto({ subsets: ['latin'], weight: ['400'] })

export const metadata = {
  title: 'NLW - Spacetime',
  description: 'Next Level Week - Rocketseat'
}

export default function RootLayout ({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={font.className}>
      <body className='bg-zinc-950 text-white w-full min-h-screen'>{children}</body>
    </html>
  )
}
