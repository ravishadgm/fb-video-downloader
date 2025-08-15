import { NextResponse } from "next/server";
import getFBInfo from "@xaviabot/fb-downloader";

export const runtime = "nodejs";

export async function POST(req) {
  try {
    const { url } = await req.json();

    if (!url) {
      return NextResponse.json(
        { error: "Missing Facebook URL" },
        { status: 400 }
      );
    }

    if (
      !/^https?:\/\/(www\.)?facebook\.com/i.test(url) &&
      !/^https?:\/\/fb\.watch/i.test(url)
    ) {
      return NextResponse.json(
        { error: "Invalid Facebook URL" },
        { status: 400 }
      );
    }

    const cookies = process.env.FB_COOKIES || undefined;
    const userAgent = process.env.FB_USER_AGENT || undefined;

    let fbData = await getFBInfo(url, cookies, userAgent);
    let mediaArray = Array.isArray(fbData) ? fbData : [fbData];

    if (mediaArray.length === 0 || !mediaArray[0]?.url) {
      return NextResponse.json({ error: "No media found" }, { status: 404 });
    }

    const firstItem = mediaArray[0];
    const isVideo =
      firstItem.hd || firstItem.sd || firstItem.url?.endsWith(".mp4");
    const type = isVideo ? "video" : "photo";

    let mediaList = [];

    if (isVideo) {
      const hdUrl = firstItem.hd || firstItem.sd || null;
      if (hdUrl) {
        mediaList.push({
          quality: "HD",
          url: hdUrl,
          proxyUrl: `/api/proxy?url=${encodeURIComponent(hdUrl)}`,
        });
      }
    } else {
      mediaList.push({
        quality: "original",
        url: firstItem.url,
        proxyUrl: `/api/proxy?url=${encodeURIComponent(firstItem.url)}`,
      });
    }

    return NextResponse.json({
      ok: true,
      type,
      title: firstItem.title || null,
      thumbnail: firstItem.thumbnail || null,
      media: mediaList,
    });
  } catch (err) {
    console.error("FB Downloader Error:", err);
    return NextResponse.json(
      { error: err.message || "Internal server error" },
      { status: 500 }
    );
  }
}
