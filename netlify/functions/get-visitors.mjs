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
    const store = getStore({
      name: 'portfolio-visitors',
      siteID: process.env.NETLIFY_SITE_ID || process.env.SITE_ID,
      token: process.env.NETLIFY_AUTH_TOKEN || process.env.DEPLOY_TOKEN
    })
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
      body: JSON.stringify({ error: err.message, siteID: process.env.NETLIFY_SITE_ID ? 'set' : 'missing' }),
    }
  }
}
