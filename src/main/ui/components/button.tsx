import React from 'react'

type Props = {
  title?: string
}

export const Button = ({ title }: Props) => {
  return (
    <button className="bg-rose-500 px-4 py-1 rounded-md text-lg font-semibold hover:bg-rose-400 transition">
      {title}
    </button>
  )
}
