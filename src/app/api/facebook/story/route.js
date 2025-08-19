import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(req) {
    try {
        const { url } = await req.json();

        if (!url) {
            return NextResponse.json(
                { error: "Missing Facebook story URL" },
                { status: 400 }
            );
        }

        const response = await fetch(
            "https://facebook-media-api.p.rapidapi.com/media/stories",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "x-rapidapi-key":
                        process.env.RAPIDAPI_KEY ||
                        "c34d95927dmsh166eff8f28923b3p1ea15ajsn0f2a81eab998",
                    "x-rapidapi-host": "facebook-media-api.p.rapidapi.com",
                },
                body: JSON.stringify({
                    url,
                    cookie: "",
                    proxy: "",
                }),
            }
        );

        const storyData = await response.json();

        if (!response.ok) {
            return NextResponse.json(
                { error: "RapidAPI request failed", details: storyData },
                { status: response.status }
            );
        }

        // 🔎 Recursively collect media
        function collectMedia(obj, collected = []) {
            if (!obj || typeof obj !== "object") return collected;

            if (obj.playable_url_quality_hd || obj.playable_url) {
                collected.push({
                    type: "video",
                    url: obj.playable_url_quality_hd || obj.playable_url,
                });
            }

            if (obj.image?.uri) {
                collected.push({
                    type: "image",
                    url: obj.image.uri,
                });
            }

            for (const key of Object.keys(obj)) {
                collectMedia(obj[key], collected);
            }

            return collected;
        }

        const mediaList = collectMedia(storyData);

        if (!mediaList || mediaList.length === 0) {
            return NextResponse.json(
                { error: "Could not extract media", debug: storyData },
                { status: 404 }
            );
        }

        // ✅ Shape it exactly for frontend
        const stories = mediaList.map((media) => ({
            type: media.type,        // "video" | "image"
            url: media.url,          // matches frontend
            user: {
                name: "Facebook User", // matches frontend
                avatar: null,          // matches frontend
            },
        }));

        return NextResponse.json({
            ok: true,
            type: "stories",
            stories,
        });
    } catch (err) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
