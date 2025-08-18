// Your existing functions with a small addition
function getMediaTypeFromUrl(url) {
  if (/\/videos?\//i.test(url)) return "video";
  if (/\/reels?\//i.test(url)) return "reel";
  if (/\/photos?\//i.test(url)) return "photo";
  return "unknown";
}

export async function downloadFacebookMedia(url) {
  const mediaType = getMediaTypeFromUrl(url); // video / photo

  if (mediaType === "unknown") {
    throw new Error("Cannot determine media type from URL");
  }

  const res = await fetch(`/api/facebook/${mediaType}`, { // ✅ dynamic endpoint
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url }), // no separate type needed
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.error || "Failed to fetch Facebook media");
  }

  return res.json(); // returns type: photo or video
}

// ADD THIS HELPER FUNCTION - This is key for your component mapping:
export function getFacebookComponentType(data, url) {
  // Check the API response type first
  if (data?.type === 'video') return 'reel';     // Use existing 'reel' for videos
  if (data?.type === 'photo') return 'photo';    // Use existing 'photo' for photos
  if (data?.type === 'reels') return 'reel';

  // Fallback to URL detection
  const mediaType = getMediaTypeFromUrl(url);
  if (mediaType === 'video') return 'reel';
  if (mediaType === 'photo') return 'photo';

  return 'reel'; // Default to reel (video)
}

// Helper to transform Facebook data for compatibility
export function transformFacebookDataForReel(fbData, url) {
  if (fbData.type === 'video') {
    return {
      ...fbData,
      // Add Instagram-like properties for compatibility
      username: "facebook_user",
      caption: fbData.title,
      likes: 0, // Facebook doesn't provide this
      views: 0, // Facebook doesn't provide this
      mediaUrls: fbData.media?.map(item => item.url) || [],
      mediaUrl: fbData.media?.[0]?.proxyUrl || fbData.media?.[0]?.url,
      thumbnail: fbData.thumbnail
    };
  }
  return fbData;
}