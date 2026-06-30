export default async (request, context) => {
  const url = new URL(request.url)
  const key = url.searchParams.get('key')
  const ADMIN_KEY = Deno.env.get('ADMIN_KEY') || 'dev-admin-123'

  if (key !== ADMIN_KEY) {
    return new Response(JSON.stringify({ error: 'forbidden' }), {
      status: 403,
      headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' },
    })
  }

  try {
    const store = await context.blobs.getStore('portfolio-visitors')
    const existing = await store.get('visits', { type: 'json' }) || []
    return new Response(JSON.stringify(existing.reverse()), {
      status: 200,
      headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' },
    })
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' },
    })
  }
}

export const config = { path: "/visitors" };
