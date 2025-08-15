import { NextResponse } from "next/server";
import { createRequire } from "module";
const require = createRequire(import.meta.url);

const { getInstagramMedia } = require("../../../lib/instagram-helper");
import { fetchStoryFromRapidAPI } from "../../../lib/instagram-story-helper";

export async function POST(req) {
  try {
    const { url } = await req.json();

    if (!url || !/^https?:\/\/(www\.)?instagram\.com\//.test(url)) {
      return NextResponse.json({ error: "Invalid Instagram URL" }, { status: 400 });
    }

    // === STORY DETECTION ===
    if (url.includes("/stories/")) {
      try {
        const username = extractUsernameFromUrl(url);
        const storyData = await fetchStoryFromRapidAPI(username);
        return NextResponse.json(storyData);
      } catch (err) {
        return NextResponse.json(
          { error: err.message || "Failed to fetch Instagram story." },
          { status: 503 }
        );
      }
    }

    // === DEFAULT (reels/posts/carousels) ===
    const results = await getInstagramMedia(url);
    const first = results.url_list?.[0];
    const media = results.media_details?.[0];
    const postInfo = results.post_info || {};

    if (!first) {
      return NextResponse.json({ error: "No media found." }, { status: 404 });
    }

    let type = media?.type || "unknown";
    if (type.includes("video") && url.includes("/reel")) type = "reel";
    else if (url.includes("/tv")) type = "igtv";
    else if (media?.is_carousel) type = "carousel";
    else if (type.includes("image")) type = "photo";
    else type = "viewer";
    return NextResponse.json({
      type,
      mediaUrl: first,
      mediaUrls: results.url_list || [],
      thumbnail: media?.thumbnail || first,
      quality: results.quality || [],
      username: postInfo.owner_username || null,
      fullName: postInfo.owner_fullname || null,
      isVerified: postInfo.is_verified || false,
      caption: postInfo.caption || null,
      likes: postInfo.likes || 0,
      comments: postInfo.comment_count ?? null,
      views: media?.video_view_count || 0,
      postedAt: postInfo.timestamp || null,
    });
  } catch (err) {
    console.error("Server error:", err);
    return NextResponse.json(
      { error: "Internal server error. Please try again later." },
      { status: 500 }
    );
  }
}

// Helper to extract username from story URL
function extractUsernameFromUrl(url) {
  const regex = /instagram\.com\/stories\/([^/]+)/;
  const match = url.match(regex);
  return match?.[1] || null;
}
