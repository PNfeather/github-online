import { NextRequest } from 'next/server'

export async function POST(request: NextRequest) {
  const body = await request.json()

  // 调用 DashScope AI 接口
  const response = await fetch(
    'https://dashscope.aliyuncs.com/api/v1/services/aigc/text-generation/generation',
    {
      method: 'POST',
      headers: {
        Authorization: 'Bearer sk-c44937c3cb7a4298a9b53148df306b03',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    },
  )

  const data = await response.json()

  return new Response(JSON.stringify(data), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*', // 允许所有来源
      // 或者指定只允许本地开发地址：
      // 'Access-Control-Allow-Origin': 'http://localhost:8088',
    },
  })
}

// 添加 OPTIONS 方法支持预检请求
export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
}
