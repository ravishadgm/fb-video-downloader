
import axios from "axios";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

function extractPhotoId(raw) {
    if (!raw) return null;
    const s = String(raw).trim();

    if (/^\d+$/.test(s)) return s;

    try {
        const u = new URL(s);

        const fbid = u.searchParams.get("fbid");
        if (fbid && /^\d+$/.test(fbid)) return fbid;

        const story_fbid = u.searchParams.get("story_fbid");
        if (story_fbid && /^\d+$/.test(story_fbid)) return story_fbid;

        const parts = u.pathname.split("/").filter(Boolean);
        const lastNumeric = [...parts].reverse().find((p) => /^\d+$/.test(p));
        if (lastNumeric) return lastNumeric;

        return null;
    } catch {
        return null;
    }
}

export async function POST(req) {
    try {
        const { url } = await req.json();

        if (!url) {
            return NextResponse.json(
                { error: "Missing Facebook photo URL or ID" },
                { status: 400 }
            );
        }

        const photoId = extractPhotoId(url);
        if (!photoId) {
            return NextResponse.json(
                { error: "Could not extract photo ID" },
                { status: 400 }
            );
        }

        const token = process.env.FB_ACCESS_TOKEN;
        if (!token) {
            return NextResponse.json(
                { error: "Missing FB_ACCESS_TOKEN" },
                { status: 500 }
            );
        }

        const apiUrl = `https://graph.facebook.com/v23.0/${photoId}?fields=id,name,images,from&access_token=${encodeURIComponent(
            token
        )}`;

        const fb = await axios.get(apiUrl, { timeout: 15000 });
        const data = fb.data || {};
        const images = Array.isArray(data.images) ? data.images : [];

        if (!images.length) {
            return NextResponse.json(
                { error: "No images found for this photo" },
                { status: 404 }
            );
        }

        const mediaUrls = images.map((img) => img.source);
        const thumb = images[images.length - 1]?.source || images[0].source;

        return NextResponse.json({
            ok: true,
            type: "photo",
            id: data.id ?? photoId,
            title: data.name ?? null,
            username: data.from?.name ?? null,
            fullName: data.from?.name ?? null,
            thumbnail: thumb,
            mediaUrls, // for your frontend
        });
    } catch (err) {
        const g = err.response?.data?.error;
        if (g) {
            return NextResponse.json(
                {
                    error: g.message,
                    fb_type: g.type,
                    fb_code: g.code,
                    fbtrace_id: g.fbtrace_id,
                },
                { status: err.response?.status || 500 }
            );
        }

        return NextResponse.json(
            { error: err.message || "Internal server error" },
            { status: 500 }
        );
    }
}
