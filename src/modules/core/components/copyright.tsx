import React from 'react'

export const Footer = () => {
  return (
    <footer className="text-sm leading-relaxed text-gray-200">
      <p>
        Feito com 💜 no NLW da Rocketseat por{' '}
        <a
          className="underline hover:text-gray-100 transition-colors"
          href="https://mateusdev.com.br"
          target='_blank'
          rel="noreferrer"
        >
          Mateus dev
        </a>
      </p>
    </footer>
  )
}
