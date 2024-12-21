import axios from 'axios'
import { retrieveLaunchParams } from '@telegram-apps/sdk-react'

const getInitDataRaw = () => {
  try {
    const initData = retrieveLaunchParams().initDataRaw
    if (initData) {
      return initData
    } else {
      throw new Error('No initDataRaw found')
    }
  } catch (e) {
    // 若找不到 initDataRaw，则跳转到登录页面
    // window.location.href = "/#/not-supported";
    return ''
  }
}

const httpRequest = axios.create({
  baseURL:
    import.meta.env.VITE_ENV === 'development'
      ? 'https://xxx' // 开发环境
      : import.meta.env.VITE_ENV === 'production'
      ? 'https://xxx' // 生产环境
      : 'http://localhost:3000', // 默认为本地环境
  headers: {
    'Content-Type': 'application/json'
  }
})

// 添加请求拦截器，为每个请求动态设置 Authorization 头部
httpRequest.interceptors.request.use(
  (config) => {
    config.headers.Authorization = `tma ${getInitDataRaw()}`
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

httpRequest.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error.response?.status === 401) {
      // TODO: 跳转到登录页面
    }
    return Promise.reject(error)
  }
)

export const fetcher = (url: string) => {
  return httpRequest.get(url).then((r) => r.data)
}

export default httpRequest
