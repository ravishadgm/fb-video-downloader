import { NextResponse } from 'next/server';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const targetUrl = searchParams.get("url");

  if (!targetUrl) {
    return NextResponse.json({ error: "Missing URL parameter" }, { status: 400 });
  }

  // Validate URL to prevent abuse
  if (!targetUrl.includes('scontent') && !targetUrl.includes('instagram')) {
    return NextResponse.json({ error: "Invalid URL" }, { status: 400 });
  }

  try {
    console.log("Proxying request to:", targetUrl);
    
    const range = request.headers.get('range') || '';
    const userAgent = request.headers.get('user-agent') || 'Mozilla/5.0 (compatible; InstagramDownloader/1.0)';
    
    const response = await fetch(targetUrl, {
      headers: {
        'Range': range,
        'User-Agent': userAgent,
        'Referer': 'https://www.instagram.com/',
      },
    });

    if (!response.ok) {
      throw new Error(`Upstream server responded with ${response.status}`);
    }

    const headers = new Headers();
    
    // Copy relevant headers
    const relevantHeaders = [
      'content-type', 
      'content-length', 
      'accept-ranges', 
      'content-range',
      'cache-control',
      'etag',
      'last-modified'
    ];
    
    for (const [key, value] of response.headers.entries()) {
      if (relevantHeaders.includes(key.toLowerCase())) {
        headers.set(key, value);
      }
    }

    // Add CORS headers
    headers.set("Access-Control-Allow-Origin", "*");
    headers.set("Access-Control-Allow-Methods", "GET, HEAD, OPTIONS");
    headers.set("Access-Control-Allow-Headers", "Range, Content-Type");
    
    // Set cache headers
    if (!headers.has('cache-control')) {
      headers.set("Cache-Control", "public, max-age=86400");
    }

    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers,
    });

  } catch (err) {
    console.error("Proxy error:", err);
    return NextResponse.json({ 
      error: "Failed to fetch media",
      details: err.message 
    }, { status: 500 });
  }
}

export async function OPTIONS(request) {
  return new Response(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, HEAD, OPTIONS",
      "Access-Control-Allow-Headers": "Range, Content-Type",
    },
  });
}
