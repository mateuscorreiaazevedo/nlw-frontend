import axios, { AxiosInstance, AxiosResponse } from 'axios'
import { env } from '@/main/config'

type HttpRequest = {
  url: string
  body?: any
  params?: any
  headers?: any
  method?: 'get' | 'post' | 'put' | 'delete'
}

type HttpResponse<T = any> = {
  code: number,
  body?: T
}

export class Service {
  private api: AxiosInstance

  constructor (private readonly baseURL = env.baseUrl) {
    this.api = axios.create({
      baseURL
    })
  }

  async request<T=any> (props: HttpRequest): Promise<HttpResponse<T>> {
    const { url, body, headers, method = 'get', params } = props
    let response: AxiosResponse

    try {
      response = await this.api.request({
        url,
        data: body,
        headers,
        method,
        params
      })
    } catch (error) {
      response = (error as any).response
    }

    return {
      code: response.status,
      body: response.data
    }
  }
}
