import http from 'http'

const ADMIN_KEY = 'dev-admin-123'
let visits = []

const server = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') { res.writeHead(204); res.end(); return }

  const url = new URL(req.url, 'http://localhost')

  if (req.method === 'POST' && url.pathname === '/api/track') {
    let body = ''
    req.on('data', c => body += c)
    req.on('end', () => {
      try { body = JSON.parse(body) } catch { body = {} }
      visits.push({
        ip: req.headers['x-forwarded-for']?.split(',')[0]?.trim() || '127.0.0.1',
        country: 'Local',
        region: 'Dev',
        city: 'Localhost',
        userAgent: req.headers['user-agent'] || 'unknown',
        referer: req.headers['referer'] || 'direct',
        url: body.url || 'unknown',
        timestamp: new Date().toISOString(),
      })
      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ ok: true }))
    })
    return
  }

  if (req.method === 'GET' && url.pathname === '/api/get-visitors') {
    if (url.searchParams.get('key') !== ADMIN_KEY) {
      res.writeHead(403, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ error: 'forbidden' }))
      return
    }
    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify([...visits].reverse()))
    return
  }

  res.writeHead(404)
  res.end()
})

server.listen(3001, () => console.log('Local API → http://localhost:3001'))
