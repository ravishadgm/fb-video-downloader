import { NextResponse } from "next/server";
import getFBInfo from "@xaviabot/fb-downloader";

export const runtime = "nodejs";

export async function POST(req) {
    try {
        const { url } = await req.json();

        if (!url) {
            return NextResponse.json({ error: "Missing Facebook URL" }, { status: 400 });
        }

        if (
            !/^https?:\/\/(www\.|m\.|web\.)?facebook\.com/i.test(url) &&
            !/^https?:\/\/fb\.watch/i.test(url)
        ) {
            return NextResponse.json({ error: "Invalid Facebook URL" }, { status: 400 });
        }

        // 🔧 normalize (critical for reels)
        const normalizedUrl = normalizeFacebookUrl(url);

        const cookies = process.env.FB_COOKIES || undefined; // optional but helps for reels
        const userAgent =
            process.env.FB_USER_AGENT ||
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36";

        const fbData = await getFBInfo(normalizedUrl, cookies, userAgent);
        const mediaArray = Array.isArray(fbData) ? fbData : [fbData];

        if (!mediaArray.length || !mediaArray[0]) {
            return NextResponse.json({ error: "No media found" }, { status: 404 });
        }

        const first = mediaArray[0];

        const videoUrl = first.hd || first.sd || first.url || null;
        const isMp4 = typeof videoUrl === "string" && /\.mp4(\?|$)/i.test(videoUrl);

        let type = /\/reel\//i.test(url) ? "reel" : "video";
        if (!videoUrl) {
            type = "photo";
        }

        const media = [];
        if (videoUrl) {
            media.push({
                quality: first.hd ? "HD" : "SD/auto",
                url: videoUrl,
                proxyUrl: `/api/proxy?url=${encodeURIComponent(videoUrl)}`,
                isMp4,
            });
        } else if (first.url) {
            media.push({
                quality: "original",
                url: first.url,
                proxyUrl: `/api/proxy?url=${encodeURIComponent(first.url)}`,
            });
        }

        if (!media.length) {
            return NextResponse.json({ error: "No downloadable media" }, { status: 404 });
        }

        return NextResponse.json({
            ok: true,
            type, // "reel" | "video" | "photo"
            title: first.title || null,
            thumbnail: first.thumbnail || null,
            media,
            normalizedUrl,
        });
    } catch (err) {
        console.error("FB Downloader Error:", {
            message: err?.message,
            stack: err?.stack,
            status: err?.response?.status,
        });
        return NextResponse.json(
            { error: err?.message || "Internal server error" },
            { status: 500 }
        );
    }
}

function normalizeFacebookUrl(input) {
    try {
        const u = new URL(input.trim());
        if (/^(m|web)\.facebook\.com$/i.test(u.hostname)) u.hostname = "www.facebook.com";
        const reelMatch = u.pathname.match(/\/reel\/(\d+)/i);
        if (reelMatch?.[1]) {
            u.pathname = "/watch/";
            u.search = "";
            u.searchParams.set("v", reelMatch[1]);
        }
        return u.toString();
    } catch {
        return input;
    }
}
