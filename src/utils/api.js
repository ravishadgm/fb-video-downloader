function getMediaTypeFromUrl(url) {
  if (/\/stories\//i.test(url)) return "story";
  if (/\/(videos|reel)\//i.test(url)) return "media";
  if (/\/photos?\//i.test(url)) return "photo";

  return "unknown";
}

export async function downloadFacebookMedia(url) {
  const mediaType = getMediaTypeFromUrl(url);

  if (mediaType === "unknown") {
    throw new Error("Cannot determine media type from URL");
  }

  const res = await fetch(`/api/facebook/${mediaType}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url }),
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.error || "Failed to fetch Facebook media");
  }

  return res.json();
}

