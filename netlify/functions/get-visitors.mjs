import { getStore } from '@netlify/blobs'

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

  try {
    // For Lambda compatibility mode, use event.blobs if available
    let store
    if (event.blobs) {
      const rawData = Buffer.from(event.blobs, 'base64')
      const data = JSON.parse(rawData.toString('ascii'))
      store = getStore({
        edgeURL: data.url,
        name: 'portfolio-visitors',
        token: data.token,
        siteID: data.siteID,
      })
    } else {
      store = getStore('portfolio-visitors')
    }
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
      body: JSON.stringify({ error: err.message }),
    }
  }
}
