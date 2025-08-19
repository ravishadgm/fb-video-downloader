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
                    "x-rapidapi-key": process.env.RAPIDAPI_KEY,
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

        // --- Collect Media Recursively ---
        function collectMedia(obj, collected = []) {
            if (!obj || typeof obj !== "object") return collected;

            if (obj.playable_url_quality_hd || obj.playable_url) {
                collected.push(obj.playable_url_quality_hd || obj.playable_url);
            }

            if (obj.image?.uri) {
                collected.push(obj.image.uri);
            }

            if (Array.isArray(obj)) {
                obj.forEach((item) => collectMedia(item, collected));
            } else {
                for (const key of Object.keys(obj)) {
                    collectMedia(obj[key], collected);
                }
            }

            return collected;
        }

        const mediaList = collectMedia(storyData);

        if (!mediaList || mediaList.length === 0) {
            return NextResponse.json(
                {
                    error: "No stories found",
                    debug: storyData
                },
                { status: 404 }
            );
        }

        const firstNode = storyData?.data?.nodes?.[0];
        const accountInfo = firstNode?.story_bucket_owner || {};

        const accountName = accountInfo.name || "Unknown User";
        const accountId = accountInfo.id || null;
        const profilePic = accountInfo.profile_picture?.uri || null;
        const accountUrl = accountInfo.url || null;

        return NextResponse.json({
            ok: true,
            type: "story",
            account: {
                id: accountId,
                name: accountName,
                profilePic,
                url: accountUrl,
            },
            urls: mediaList,
        });

    } catch (err) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
