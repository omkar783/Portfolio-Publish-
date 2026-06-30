import { connectLambda, getStore } from '@netlify/blobs'

export const handler = async (event) => {
  const debug = {
    hasBlobs: !!event.blobs,
    envKeys: Object.keys(process.env).filter(k => k.includes('NETLIFY') || k.includes('BLOB')),
    siteID: process.env.NETLIFY_SITE_ID || 'not set',
  }

  try {
    connectLambda(event)
    const store = getStore('portfolio-visitors')
    debug.storeCreated = true
    const existing = await store.get('visits', { type: 'json' }) || []
    debug.visitsCount = existing.length
    return {
      statusCode: 200,
      headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' },
      body: JSON.stringify(existing.reverse()),
    }
  } catch (err) {
    return {
      statusCode: 500,
      headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...debug, error: err.message }),
    }
  }
}
