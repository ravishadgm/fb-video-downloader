"use client";

import { useState } from "react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import BottomActivityPanel from "@/instaModal/ui/BottomActivityPanel/BottomActivityPanel";
import PostHeader from "@/instaModal/ui/PostHeader/PostHeader";
import MediaSwiper from "@/instaModal/ui/MediaSwiper/MediaSwiper";
import MediaGallery from "@/instaModal/ui/MediaGallery/MediaGallery";
import styles from "./PhotoPostPreview.module.scss";

export default function PhotoPostPreview({ data }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <>
      <div className={styles.post}>
        <PostHeader
          avatar={data?.thumbnail}
          username={data?.username}
          fullName={data?.fullName}
        />

        <MediaSwiper
          mediaUrls={data.mediaUrls}
          onSlideChange={(index) => setCurrentIndex(index)}
        />
        <BottomActivityPanel
          data={{
            ...data,
            currentMediaUrl: data.mediaUrls?.[currentIndex],
            currentMediaIndex: currentIndex,
          }}
        />
      </div>
      <MediaGallery mediaUrls={data.mediaUrls} />
    </>
  );
}
