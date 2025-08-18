import fs from "fs";
import path from "path";
import axios from "axios";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

// store token in a JSON file (persistent)
const TOKEN_FILE = path.join(process.cwd(), "fb_token.json");

// 🚀 fallback initial token (only paste once here if no file exists)
const INITIAL_TOKEN =
  "EAAan7QXZBDCkBPCGLykngJZByYq1hK6E76brS77ZA2z9DmG8ZCaOV83ZBsqI4R5FDgziwuK8SziyZBFiYcsyhrEfv0sziIg26ngZCC6y5TZCw9jtVcTPiONZAJ7utY8eipqvffhRXzkmUeZAlBQGKi02krS1OUZB0JiPmZB40b9oRToHf7L0VFcZBw4o7wUnd3puRh9LZAshgTvWZBTKwF2MVexnd6faXfHzyc6oJod";

// load token from disk, or bootstrap with INITIAL_TOKEN
function loadToken() {
  try {
    if (fs.existsSync(TOKEN_FILE)) {
      const data = fs.readFileSync(TOKEN_FILE, "utf8");
      const json = JSON.parse(data);
      return json.access_token || null;
    } else {
      // auto-create file with initial token
      saveToken(INITIAL_TOKEN);
      return INITIAL_TOKEN;
    }
  } catch {
    return INITIAL_TOKEN;
  }
}

// save token to disk
function saveToken(token) {
  fs.writeFileSync(
    TOKEN_FILE,
    JSON.stringify({ access_token: token }, null, 2),
    "utf8"
  );
  FB_ACCESS_TOKEN = token;
}

// current in-memory token
let FB_ACCESS_TOKEN = loadToken();

// your app credentials
const FB_APP_ID = "1873486309887017";
const FB_APP_SECRET = "de3e50436cf8524e7828ead07dffffdb";

// function to refresh token dynamically
async function refreshFbToken() {
  if (!FB_ACCESS_TOKEN) {
    throw new Error("No Facebook token available");
  }

  const url = `https://graph.facebook.com/v19.0/oauth/access_token?grant_type=fb_exchange_token&client_id=${FB_APP_ID}&client_secret=${FB_APP_SECRET}&fb_exchange_token=${FB_ACCESS_TOKEN}`;

  const res = await axios.get(url);
  const newToken = res.data.access_token;

  saveToken(newToken); // update both memory + disk

  console.log("🔄 Token refreshed:", newToken);

  return newToken;
}

// extract photo ID from URL
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

// central fetch with retry
async function fetchPhotoData(photoId) {
  try {
    const apiUrl = `https://graph.facebook.com/v23.0/${photoId}?fields=id,name,images,from&access_token=${encodeURIComponent(
      FB_ACCESS_TOKEN
    )}`;

    const fb = await axios.get(apiUrl, { timeout: 15000 });
    return fb.data;
  } catch (err) {
    const g = err.response?.data?.error;
    if (g?.code === 190) {
      // expired → refresh and retry once
      const newToken = await refreshFbToken();
      const retryUrl = `https://graph.facebook.com/v23.0/${photoId}?fields=id,name,images,from&access_token=${encodeURIComponent(
        newToken
      )}`;
      const fb = await axios.get(retryUrl, { timeout: 15000 });
      return fb.data;
    }
    throw err;
  }
}

// API endpoint
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

    const data = await fetchPhotoData(photoId);

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
      mediaUrls,
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
