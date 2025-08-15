

export async function downloadInstagramMedia(url) {
  if (!url || !url.trim()) {
    throw new Error("Please enter a URL");
  }

  const res = await fetch("/api/instagram", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || "Server error");
  }

  return data;
}
