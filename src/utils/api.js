

export async function downloadFacebookMedia(url) {
  const res = await fetch("/api/facebook", {
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
