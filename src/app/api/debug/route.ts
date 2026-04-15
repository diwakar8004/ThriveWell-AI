export async function GET() {
  return Response.json({
    hasKey: !!process.env.GOOGLE_API_KEY,
    keyStart: process.env.GOOGLE_API_KEY?.slice(0, 8),
  })
}
