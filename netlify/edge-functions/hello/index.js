export default async () => new Response("Hello from edge!");

export const config = { path: "/hello-edge" };
