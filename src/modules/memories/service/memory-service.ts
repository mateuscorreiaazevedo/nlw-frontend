import { Service } from '@/modules/core'
import Cookie from 'js-cookie'

type FormMemoryProps = {
  content: string
  coverUrl: string
  isPublic: string | null
}

const token = Cookie.get('token')

class MemoryService extends Service {
  async uploadFile (fileForUpload: FormData) {
    const response = await this.request<{ fileUrl: string }>({
      url: '/upload',
      method: 'post',
      body: fileForUpload
    })

    switch (response.code) {
      case 200:
        return response.body?.fileUrl
      case 400:
        throw new Error('Falha na requisição.')
      default:
        throw new Error('Falha no servidor, tente novamente mais tarde.')
    }
  }

  async createMemory ({ content, coverUrl, isPublic }: FormMemoryProps) {
    const response = await this.request({
      url: '/memories',
      method: 'post',
      body: {
        content,
        coverUrl,
        isPublic
      },
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    switch (response.code) {
      case 200:
        return response.body?.fileUrl
      default:
        throw new Error('Falha no servidor, tente novamente mais tarde.')
    }
  }
}

export const memoryService = new MemoryService()
