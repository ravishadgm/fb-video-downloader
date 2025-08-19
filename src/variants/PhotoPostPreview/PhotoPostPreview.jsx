"use client";

import { useState, useEffect } from "react";
import PostHeader from "@/instaModal/ui/PostHeader/PostHeader";
import MediaSwiper from "@/instaModal/ui/MediaSwiper/MediaSwiper";
import BottomActivityPanel from "@/instaModal/ui/BottomActivityPanel/BottomActivityPanel";
import MediaGallery from "@/instaModal/ui/MediaGallery/MediaGallery";
import styles from "./PhotoPostPreview.module.scss";

export default function PhotoPostPreview({ userEnteredUrl, data }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [postData, setPostData] = useState(data || null);

  useEffect(() => {
    if (data) {
      setPostData(data);
      return;
    }
    if (!userEnteredUrl) return;

    (async () => {
      try {
        if (
          userEnteredUrl.includes("facebook.com") ||
          userEnteredUrl.includes("fb.watch")
        ) {
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
            setPostData({
              thumbnail: fbData.thumbnail,
              username: "Facebook User",
              fullName: "Facebook",
              title: fbData.title,
              mediaUrls: fbData.media?.map((item) => item.url) || [
                fbData.media?.[0]?.url,
              ],
              ...fbData,
              likes: Math.floor(Math.random() * 1000),
              views: Math.floor(Math.random() * 10000),
            });
          } else {
            console.error("Facebook API error:", fbData);
          }
        }
      } catch (err) {
        console.error("API call failed:", err);
      }
    })();
  }, [userEnteredUrl, data]);

  if (!postData) return <p>Loading...</p>;

  const mediaUrls =
    postData.mediaUrls ||
    (postData.media ? postData.media.map((item) => item.url) : []);

  return (
    <>
      <div className={styles.post}>
        <PostHeader
          avatar={postData?.thumbnail}
          username={postData?.username || "Facebook User"}
          fullName={postData?.fullName || "Facebook User"}
          title={postData?.title}
        />

        <MediaSwiper
          mediaUrls={mediaUrls}
          onSlideChange={(index) => setCurrentIndex(index)}
        />

        <BottomActivityPanel
          data={{
            ...postData,
            mediaUrls,
            currentMediaUrl: mediaUrls[currentIndex],
            currentMediaIndex: currentIndex,
          }}
        />
      </div>

      {mediaUrls.length > 0 && <MediaGallery mediaUrls={mediaUrls} />}
    </>
  );
}
