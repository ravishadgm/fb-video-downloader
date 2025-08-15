export const handleDownloadAll = (mediaUrls) => {
  mediaUrls?.forEach((url, index) => {
    if (url) handleDownload(url, index);
  });
};

export const handleDownload = (url, index) => {
  const proxyUrl = `/api/proxy?url=${encodeURIComponent(url)}&t=${Date.now()}`;
  const link = document.createElement("a");
  link.href = proxyUrl;
  link.download = `media-${index + 1}`;
  document.body.appendChild(link);
  setTimeout(() => {
    link.click();
    document.body.removeChild(link);
  }, 100);
};


