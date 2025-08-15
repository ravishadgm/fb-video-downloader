export const handleShare = (url) => {
  if (navigator.share) {
    navigator.share({ title: "Instagram Post", url }).catch(console.error);
  } else {
    alert("Sharing not supported in this browser.");
  }
};

export const handleShareAll = (mediaUrls) => {
  if (!navigator.share) {
    alert("Sharing not supported in this browser.");
    return;
  }

  const firstUrl = mediaUrls?.[0];

  if (firstUrl) {
    navigator
      .share({
        title: "Instagram Post",
        url: firstUrl,
      })
      .catch((error) => {
        console.error("Share failed:", error);
      });
  }
};
