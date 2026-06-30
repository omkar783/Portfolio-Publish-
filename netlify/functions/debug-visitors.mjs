import { connectLambda, getStore } from '@netlify/blobs'

export const handler = async (event) => {
  connectLambda(event)
  
  try {
    const store = getStore('portfolio-visitors')
    const existing = await store.get('visits', { type: 'json' }) || []
    return {
      statusCode: 200,
      headers: { 
        'Access-Control-Allow-Origin': '*', 
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store, no-cache, must-revalidate'
      },
      body: JSON.stringify({ visits: existing.reverse(), count: existing.length, deployed: 'v2' }),
    }
  } catch (err) {
    return {
      statusCode: 500,
      headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: err.message, deployed: 'v2' }),
    }
  }
}
