export async function GET() {
  return Response.json({
    hasKey: !!process.env.HUGGINGFACE_API_KEY,
    keyStart: process.env.HUGGINGFACE_API_KEY?.slice(0, 8),
  })
}
