import { Service } from '@/modules/core'
import { cookies } from 'next/headers'
import decode from 'jwt-decode'

class UserService extends Service {
  async register (code: string) {
    const response = await this.request<{token: string, message?: string}>({
      url: '/register',
      method: 'post',
      body: {
        code
      }
    })

    switch (response.code) {
      case 200:
        return response.body?.token
      case 401:
        throw new Error(response.body?.message)
      default:
        throw new Error('Erro na requisição')
    }
  }

  getUser (): User {
    const token = cookies().get('token')?.value

    if (!token) {
      throw new Error('Unauthenticated')
    }

    const user: User = decode(token)

    return user
  }
}

export const userService = new UserService()
