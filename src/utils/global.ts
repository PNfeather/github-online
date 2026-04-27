import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { showLoadingToast, closeToast, showToast } from 'vant'

const BASE_URL = import.meta.env.VITE_AI_BASE_URL || import.meta.env.VITE_CURRENT_VITE_URL

const request = axios.create({
  baseURL: BASE_URL,
  timeout: 30000,
})

interface RequestOptions {
  loading?: boolean
  loadingText?: string
}

async function get<T = unknown>(
  url: string,
  params?: Record<string, unknown>,
  options: RequestOptions = {}
): Promise<T> {
  const { loading = true, loadingText = '加载中...' } = options

  if (loading) {
    showLoadingToast({
      message: loadingText,
      forbidClick: true,
      duration: 0,
    })
  }

  try {
    const config: AxiosRequestConfig = { params }
    const response: AxiosResponse<T> = await request.get(url, config)
    if (loading) closeToast()
    return response.data
  } catch (err) {
    if (loading) closeToast()
    const message = axios.isAxiosError(err) ? err.message : '请求失败'
    showToast(message)
    throw err
  }
}

async function post<T = unknown>(
  url: string,
  data?: Record<string, unknown>,
  options: RequestOptions = {}
): Promise<T> {
  const { loading = true, loadingText = '加载中...' } = options

  if (loading) {
    showLoadingToast({
      message: loadingText,
      forbidClick: true,
      duration: 0,
    })
  }

  try {
    const response: AxiosResponse<T> = await request.post(url, data)
    if (loading) closeToast()
    return response.data
  } catch (err) {
    if (loading) closeToast()
    const message = axios.isAxiosError(err) ? err.message : '请求失败'
    showToast(message)
    throw err
  }
}

const UTILS = {
  BASE_URL,
  request: {
    get,
    post,
  },
}

declare global {
  interface Window {
    UTILS: typeof UTILS
  }
}

window.UTILS = UTILS

export default UTILS