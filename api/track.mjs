import { put } from '@vercel/blob'

export default async (req, res) => {
  let body = {}
  try {
    if (typeof req.body === 'string') body = JSON.parse(req.body)
    else if (typeof req.body === 'object' && req.body !== null) body = req.body
    else if (Buffer.isBuffer(req.body)) body = JSON.parse(req.body.toString())
  } catch (e) {
    body = {}
  }

  const h = req.headers || {}

  const visit = {
    ip: h['x-vercel-forwarded-for'] || h['x-forwarded-for'] || 'unknown',
    country: h['x-vercel-ip-country'] || h['cf-ipcountry'] || 'unknown',
    region: h['x-vercel-ip-country-region'] || 'unknown',
    city: h['x-vercel-ip-city'] || 'unknown',
    userAgent: h['user-agent'] || 'unknown',
    referer: h['referer'] || 'direct',
    url: body.url || 'unknown',
    timestamp: new Date().toISOString(),
  }

  let existing = []
  try {
    const r = await fetch('https://yiofhjxjworckoqh.private.blob.vercel-storage.com/visits.json', {
      headers: { Authorization: `Bearer ${process.env.BLOB_READ_WRITE_TOKEN}` }
    })
    if (r.ok) existing = await r.json()
  } catch (e) {
    console.error('read err:', e.message)
  }

  existing.push(visit)
  if (existing.length > 500) existing.splice(0, existing.length - 500)

  try {
    await put('visits.json', JSON.stringify(existing), {
      access: 'private',
      token: process.env.BLOB_READ_WRITE_TOKEN,
      allowOverwrite: true,
    })
  } catch (e) {
    console.error('put err:', e.message)
  }

  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Content-Type', 'application/json; charset=utf-8')
  res.status(200).json({ ok: true })
}
