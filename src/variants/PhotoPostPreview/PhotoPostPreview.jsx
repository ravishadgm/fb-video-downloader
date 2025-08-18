"use client";
import { useState, useEffect } from "react";
import PostHeader from "@/instaModal/ui/PostHeader/PostHeader";
import MediaSwiper from "@/instaModal/ui/MediaSwiper/MediaSwiper";
import BottomActivityPanel from "@/instaModal/ui/BottomActivityPanel/BottomActivityPanel";
import MediaGallery from "@/instaModal/ui/MediaGallery/MediaGallery";
import styles from "./PhotoPostPreview.module.scss";

export default function PhotoPostPreview({ userEnteredUrl, data }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [photoData, setPhotoData] = useState(data || null); // Use passed data first

  useEffect(() => {
    // If data is already passed, don't make API call
    if (data) {
      setPhotoData(data);
      return;
    }

    if (!userEnteredUrl) return;

    (async () => {
      try {
        // Determine if it's Facebook or Instagram
        if (
          userEnteredUrl.includes("facebook.com") ||
          userEnteredUrl.includes("fb.watch")
        ) {
          // Facebook API call
          const mediaType = userEnteredUrl.includes("/videos/")
            ? "video"
            : "photo";
          const res = await fetch(`/api/facebook/${mediaType}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ url: userEnteredUrl }),
          });

          const fbData = await res.json();
          if (res.ok) {
            // Transform Facebook data to match expected structure
            const transformedData = {
              thumbnail: fbData.thumbnail,
              username: "Facebook User",
              fullName: "Facebook",
              title: fbData.title,
              mediaUrls: fbData.media?.map((item) => item.url) || [
                fbData.media?.[0]?.url,
              ],
              // Add Facebook-specific data
              ...fbData,
              likes: Math.floor(Math.random() * 1000),
              views: Math.floor(Math.random() * 10000),
            };
            setPhotoData(transformedData);
          } else {
            console.error("Facebook API error:", fbData);
          }
        } else {
          // Instagram API call (your existing logic)
          const res = await fetch("/api/instagram/photo", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ url: userEnteredUrl }),
          });
          const data = await res.json();
          if (res.ok) setPhotoData(data);
          else console.error("Instagram API error:", data);
        }
      } catch (error) {
        console.error("API call failed:", error);
      }
    })();
  }, [userEnteredUrl, data]);

  if (!photoData) return <p>Loading...</p>;

  // Handle Facebook data structure
  const mediaUrls =
    photoData.mediaUrls ||
    (photoData.media ? photoData.media.map((item) => item.url) : []);

  return (
    <>
      <div className={styles.post}>
        <h1>Hello Jiiiiiiiiiiiiiiiiiiiiiiiiii</h1>
        <PostHeader
          avatar={photoData?.thumbnail}
          username={photoData?.username || "Facebook User"}
          fullName={photoData?.fullName || "Facebook"}
        />
        <MediaSwiper
          mediaUrls={mediaUrls}
          onSlideChange={(index) => setCurrentIndex(index)}
        />
        <BottomActivityPanel
          data={{
            ...photoData,
            currentMediaUrl: mediaUrls?.[currentIndex],
            currentMediaIndex: currentIndex,
          }}
        />
      </div>
      <MediaGallery mediaUrls={mediaUrls} />
    </>
  );
}
