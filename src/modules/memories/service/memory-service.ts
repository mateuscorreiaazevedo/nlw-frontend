import { Service } from '@/modules/core'
import Cookies from 'js-cookie'

type FormMemoryProps = {
  content: string
  coverUrl: string
  isPublic: string | null
}

const token = Cookies.get('token')

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
        Authorization: `Bearer ${token!}`
      }
    })

    switch (response.code) {
      case 200:
        return response.body
      default:
        throw new Error('Falha no servidor, tente novamente mais tarde.')
    }
  }

  async editMemory (id: string, { content, coverUrl, isPublic }: FormMemoryProps) {
    const response = await this.request({
      url: `/memories/${id}`,
      method: 'put',
      body: {
        content,
        coverUrl,
        isPublic
      },
      headers: {
        Authorization: `Bearer ${token!}`
      }
    })

    switch (response.code) {
      case 200:
        return response.body
      default:
        throw new Error('Falha no servidor, tente novamente mais tarde.')
    }
  }

  async getAll (token: string) {
    const response = await this.request<{ data: MemoryInfo[]; message?: string }>({
      url: '/memories',
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    switch (response.code) {
      case 200:
        return response.body?.data
      case 400:
        throw new Error(response.body?.message)
      case 401:
        throw new Error(response.body?.message)
      case 500:
        throw new Error(response.body?.message)
      default:
        throw new Error(response.code.toString())
    }
  }

  async delete (id: string) {
    const response = await this.request({
      url: `/memories/${id}`,
      method: 'delete',
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    switch (response.code) {
      case 200:
        return response.body
      case 400:
        throw new Error(response.body?.message)
      case 401:
        throw new Error(response.body?.message)
      case 500:
        throw new Error(response.body?.message)
      default:
        throw new Error(response.code.toString())
    }
  }

  async getById (id: string, token?: string) {
    const response = await this.request<{data: Memory, message?: string}>({
      url: `/memories/${id}`,
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    switch (response.code) {
      case 200:
        return response.body?.data
      case 400:
        throw new Error(response.body?.message)
      case 401:
        throw new Error(response.body?.message)
      case 500:
        throw new Error(response.body?.message)
      default:
        throw new Error(response.code.toString())
    }
  }
}

export const memoryService = new MemoryService()
