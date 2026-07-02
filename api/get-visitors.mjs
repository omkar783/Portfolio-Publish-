const ADMIN_KEY = process.env.ADMIN_KEY || 'dev-admin-123'
const BLOB_TOKEN = () => process.env.BLOB_READ_WRITE_TOKEN
const BLOB_URL = 'https://yiofhjxjworckoqh.private.blob.vercel-storage.com/visits.json'

export default async (req, res) => {
  const key = req.query.key
  if (key !== ADMIN_KEY) {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Content-Type', 'application/json; charset=utf-8')
    return res.status(403).json({ error: 'forbidden' })
  }

  try {
    const blobRes = await fetch(BLOB_URL, {
      headers: { Authorization: `Bearer ${BLOB_TOKEN()}` }
    })

    if (!blobRes.ok) {
      res.setHeader('Access-Control-Allow-Origin', '*')
      res.setHeader('Content-Type', 'application/json; charset=utf-8')
      return res.status(200).json([])
    }

    const visits = await blobRes.json()
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Content-Type', 'application/json; charset=utf-8')
    res.status(200).json(visits.reverse())
  } catch (err) {
    console.error('Error fetching visits:', err)
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Content-Type', 'application/json; charset=utf-8')
    res.status(500).json({ error: 'Failed to fetch visitor data' })
  }
}
