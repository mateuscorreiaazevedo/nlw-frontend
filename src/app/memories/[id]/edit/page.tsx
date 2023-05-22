import { Form, memoryService } from '@/modules/memories'
import { cookies } from 'next/headers'
import React from 'react'

export const metadata = {
  title: 'Editar Memória | NLW Spacetime'
}

export default async function EditMemory ({ params }: ParamsInterface) {
  const { id } = params

  const token = cookies().get('token')?.value
  const memory = await memoryService.getById(id, token)

  return <Form memory={memory} />
}
