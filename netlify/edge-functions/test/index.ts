export const config = {
  path: ["/api/test-edge"]
}

export default async (request) => {
  return new Response(JSON.stringify({ message: 'edge function works' }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  })
}
