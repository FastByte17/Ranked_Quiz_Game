export async function GET() {
    const res = await fetch('https://data.mongodb-api.com/...', {

    })
    const data = await res.json()

    return Response.json({ data })
}