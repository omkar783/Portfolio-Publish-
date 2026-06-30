import { getStore, setEnvironmentContext } from '@netlify/blobs'

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
    // Set blob context from environment if available
    const blobContext = {
      siteID: process.env.NETLIFY_SITE_ID,
      token: process.env.NETLIFY_AUTH_TOKEN || process.env.NETLIFY_DEPLOY_TOKEN,
      apiURL: 'https://api.netlify.com',
    }
    
    // Try to parse blob context from event or use env vars
    if (event.blobs) {
      const rawData = Buffer.from(event.blobs, 'base64')
      const data = JSON.parse(rawData.toString('ascii'))
      Object.assign(blobContext, {
        edgeURL: data.url,
        token: data.token,
        siteID: data.siteID,
      })
    }
    
    setEnvironmentContext(blobContext)
    const store = getStore('portfolio-visitors')
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
