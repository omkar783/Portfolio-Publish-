export const config = {
  path: "/api/track"
}

export default async (request, context) => {
  const headers = Object.fromEntries(request.headers.entries())
  const body = request.method === 'POST' ? await request.json().catch(() => ({})) : {}

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
    const store = await context.blobs.getStore('portfolio-visitors')
    const existing = await store.get('visits', { type: 'json' }) || []
    existing.push(visit)
    if (existing.length > 500) existing.splice(0, existing.length - 500)
    await store.set('visits', existing)
  } catch (err) {
    console.error('track error:', err)
  }

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
    },
  })
}
