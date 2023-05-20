'use client'
import * as P from '@radix-ui/react-popover'
import React from 'react'

type PopoverProps = React.HtmlHTMLAttributes<HTMLDivElement> & {
  button: React.ReactElement
  children: React.ReactNode
}

export const Popover: React.FC<PopoverProps> = ({ button, children, ...rest }) => {
  return (
    <P.Root>
      <P.Trigger asChild>
        {button}
      </P.Trigger>
      <P.Portal>
        <P.Content {...rest}>
          {children}
        </P.Content>
      </P.Portal>
    </P.Root>
  )
}
