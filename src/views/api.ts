import UTILS from '../utils/global'

export interface WeatherResponse {
  code: string
  now: {
    text: string
    temp: string
    humidity: string
  }
}

export interface RegeoResponse {
  status: string
  regeocode: {
    addressComponent: {
      city?: string
      province?: string
    }
  }
}

export interface AIResponse {
  output: {
    text: string
  }
}

export async function getWeather(cityId: string): Promise<WeatherResponse> {
  return UTILS.request.get<WeatherResponse>('/api/weather', { cityId })
}

export async function getRegeo(longitude: number, latitude: number): Promise<RegeoResponse> {
  return UTILS.request.get<RegeoResponse>('/api/regeo', { longitude, latitude })
}

export async function analyzeAI(prompt: string): Promise<AIResponse> {
  return UTILS.request.post<AIResponse>('/api/ai', { prompt })
}

export interface CloneVoiceResponse {
  success: boolean
  voice_id?: string
  error?: string
}

export async function getVoiceId(formData: FormData): Promise<CloneVoiceResponse> {
  return UTILS.request.post<CloneVoiceResponse>(
    '/api/getVoiceId',
    formData,
  )
}
