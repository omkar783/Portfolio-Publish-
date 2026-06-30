import { connectLambda, getStore } from '@netlify/blobs'

const ADMIN_KEY = process.env.ADMIN_KEY || 'dev-admin-123'

export const handler = async (event) => {
  const params = event.queryStringParameters || {}

  if (params.key !== ADMIN_KEY) {
    return {
      statusCode: 403,
      headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'forbidden' }),
    }
  }

  let errorStep = ''
  
  try {
    errorStep = 'connectLambda'
    connectLambda(event)
    
    errorStep = 'getStore'
    const store = getStore('portfolio-visitors')
    
    errorStep = 'store.get'
    const existing = await store.get('visits', { type: 'json' }) || []
    
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(existing.reverse()),
    }
  } catch (err) {
    return {
      statusCode: 500,
      headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: err.message, step: errorStep, stack: String(err.stack).slice(0, 300) }),
    }
  }
}
