import { put } from '@vercel/blob'

export default async (req, res) => {
  if (req.method !== 'POST') {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Content-Type', 'application/json; charset=utf-8')
    res.status(405).json({ error: 'Method Not Allowed' })
    return
  }

  let body = {}
  try {
    if (typeof req.body === 'string') body = JSON.parse(req.body)
    else if (typeof req.body === 'object' && req.body !== null) body = req.body
    else if (Buffer.isBuffer(req.body)) body = JSON.parse(req.body.toString())
  } catch (e) {
    body = {}
  }

  const { name, email, message } = body

  if (!name?.trim() || !email?.includes('@') || !message?.trim()) {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Content-Type', 'application/json; charset=utf-8')
    res.status(400).json({ error: 'Invalid input' })
    return
  }

  let existing = []
  try {
    const r = await fetch('https://yiofhjxjworckoqh.private.blob.vercel-storage.com/messages.json', {
      headers: { Authorization: `Bearer ${process.env.BLOB_READ_WRITE_TOKEN}` }
    })
    if (r.ok) existing = await r.json()
  } catch (e) {
    console.error('read err:', e.message)
  }

  existing.push({
    name: name.trim(),
    email: email.trim(),
    message: message.trim(),
    timestamp: new Date().toISOString()
  })

  try {
    await put('messages.json', JSON.stringify(existing), {
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