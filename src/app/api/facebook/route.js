import getFBInfo from "@xaviabot/fb-downloader";

export const runtime = "nodejs";

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const url = searchParams.get("url");

    if (!url) {
        return Response.json({ ok: false, error: "Missing ?url=" }, { status: 400 });
    }

    if (!/^https?:\/\/(www\.)?facebook\.com|^https?:\/\/fb\.watch/i.test(url)) {
        return Response.json({ ok: false, error: "Invalid Facebook URL" }, { status: 400 });
    }

    try {
        const cookies = process.env.FB_COOKIES || undefined;
        const userAgent = process.env.FB_USER_AGENT || undefined;


        const data = await getFBInfo(url, cookies, userAgent);

        return Response.json({ ok: true, data }, { status: 200 });
    } catch (err) {
        console.error("FB Downloader Error:", err);
        return Response.json({ ok: false, error: err.message || "Failed to fetch" }, { status: 500 });
    }
}
