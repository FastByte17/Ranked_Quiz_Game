import { type NextRequest } from 'next/server'

export async function GET(request: NextRequest, res: Response) {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get('limit');

    const limit = query ? Number(query) : 2000;
    const options = {
        method: 'GET',
        headers: {
            Accept: 'application/json, text/plain, */*',
            'User-Agent':
                'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.67 Safari/537.36',
            Referer: 'https://www.forbes.com/global2000/',
            Cookie:
                'notice_behavior=expressed,eu; notice_gdpr_prefs=0,1,2:1a8b5228dd7ff0717196863a5d28ce6c',
        },
    };
    const response = await fetch(
        `https://www.forbes.com/forbesapi/org/global2000/2022/position/true.json?limit=${limit}`,
        options
    );

    const data = await res.json()

    return Response.json({ data })
}