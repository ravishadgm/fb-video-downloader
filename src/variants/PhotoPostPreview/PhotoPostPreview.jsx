"use client";
import { useState, useEffect } from "react";
import PostHeader from "@/instaModal/ui/PostHeader/PostHeader";
import MediaSwiper from "@/instaModal/ui/MediaSwiper/MediaSwiper";
import BottomActivityPanel from "@/instaModal/ui/BottomActivityPanel/BottomActivityPanel";
import MediaGallery from "@/instaModal/ui/MediaGallery/MediaGallery";
import styles from "./PhotoPostPreview.module.scss";

export default function PhotoPostPreview({ userEnteredUrl }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [photoData, setPhotoData] = useState(null);

  useEffect(() => {
    if (!userEnteredUrl) return;
    (async () => {
      const res = await fetch("/api/facebook/photo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: userEnteredUrl }),
      });
      const data = await res.json();
      if (res.ok) setPhotoData(data);
      else console.error("Photo API error:", data);
    })();
  }, [userEnteredUrl]);

  if (!photoData) return <p>Loading photo…</p>;

  return (
    <>
      <div className={styles.post}>
        <PostHeader
          avatar={photoData?.thumbnail}
          username={photoData?.username}
          fullName={photoData?.fullName}
        />
        <MediaSwiper
          mediaUrls={photoData.mediaUrls}
          onSlideChange={(index) => setCurrentIndex(index)}
        />
        <BottomActivityPanel
          data={{
            ...photoData,
            currentMediaUrl: photoData.mediaUrls?.[currentIndex],
            currentMediaIndex: currentIndex,
          }}
        />
      </div>
      <MediaGallery mediaUrls={photoData.mediaUrls} />
    </>
  );
}
