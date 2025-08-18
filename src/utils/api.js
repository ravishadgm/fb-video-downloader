function getMediaTypeFromUrl(url) {
  if (/\/videos?\//i.test(url)) return "video";
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

