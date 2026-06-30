import { connectLambda, getStore } from '@netlify/blobs'

export const handler = async (event) => {
  try {
    connectLambda(event)
    const store = getStore('portfolio-visitors')
    const existing = await store.get('visits', { type: 'json' }) || []
    return {
      statusCode: 200,
      headers: { 
        'Access-Control-Allow-Origin': '*', 
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache'
      },
      body: JSON.stringify({ visits: existing.reverse(), count: existing.length }),
    }
  } catch (err) {
    return {
      statusCode: 500,
      headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: err.message }),
    }
  }
}
