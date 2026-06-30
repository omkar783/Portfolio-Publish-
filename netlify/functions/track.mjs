import { getStore } from '@netlify/blobs'

export const handler = async (event) => {
  const headers = event.headers
  const body = event.body ? JSON.parse(event.body) : {}

  const visit = {
    ip: headers['x-nf-client-connection-ip'] || headers['x-forwarded-for'] || 'unknown',
    country: headers['x-nf-country'] || 'unknown',
    region: headers['x-nf-region'] || 'unknown',
    city: headers['x-nf-city'] || 'unknown',
    userAgent: headers['user-agent'] || 'unknown',
    referer: headers['referer'] || 'direct',
    url: body.url || 'unknown',
    timestamp: new Date().toISOString(),
  }

  try {
    const store = getStore({
      name: 'portfolio-visitors',
      siteID: process.env.NETLIFY_SITE_ID || process.env.SITE_ID,
      token: process.env.NETLIFY_AUTH_TOKEN || process.env.DEPLOY_TOKEN
    })
    const existing = await store.get('visits', { type: 'json' }) || []
    existing.push(visit)
    if (existing.length > 500) existing.splice(0, existing.length - 500)
    await store.set('visits', existing)
  } catch (err) {
    console.error('track error:', err)
  }

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
    body: JSON.stringify({ ok: true }),
  }
}
