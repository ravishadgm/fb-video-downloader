"use client";
import { useRef, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import { FaPlay, FaPause, FaVolumeUp, FaVolumeMute } from "@/icons/index";
import MediaGallery from "@/instaModal/ui/MediaGallery/MediaGallery";
import SwiperNavigation from "@/instaModal/ui/SwiperNavigation/SwiperNavigation";
import BottomActivityPanel from "@/instaModal/ui/BottomActivityPanel/BottomActivityPanel";
import PostHeader from "@/instaModal/ui/PostHeader/PostHeader";

import styles from "./StoryPreview.module.scss";

export default function StoryPreview({ data }) {
  const urls = Array.isArray(data?.urls) ? data.urls : [];
  const account = data?.account || {};

  const videoRef = useRef(null);
  const [swiperInstance, setSwiperInstance] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeDuration, setActiveDuration] = useState(4000);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progressPaused, setProgressPaused] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  // Detect if current story is video or image
  useEffect(() => {
    const currentUrl = urls[currentIndex];
    if (!currentUrl) return;

    const isVideo = currentUrl.includes(".mp4") || currentUrl.includes("video");
    if (isVideo) {
      const video = document.createElement("video");
      video.src = currentUrl;
      video.onloadedmetadata = () => {
        setActiveDuration(video.duration * 1000);
      };
      video.onerror = () => setActiveDuration(4000);
    } else {
      setActiveDuration(4000);
    }
  }, [currentIndex, urls]);

  useEffect(() => {
    if (!isPlaying) return;
    const timer = setTimeout(() => {
      swiperInstance?.slideNext();
    }, activeDuration);
    return () => clearTimeout(timer);
  }, [activeDuration, swiperInstance, currentIndex, isPlaying]);

  if (!urls.length) {
    return (
      <div className={styles.storyEmpty}>
        <p>No stories found.</p>
      </div>
    );
  }

  const togglePlayPause = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setProgressPaused(true);
    } else {
      videoRef.current.play();
      setProgressPaused(false);
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    const newMuted = !isMuted;
    videoRef.current.muted = newMuted;
    setIsMuted(newMuted);
  };

  const postData = {
    username: account.name || account.url || "facebook User",
    fullName: account.name || "Facebook User",
    thumbnail: account.profilePic || account.name,
    mediaUrls: urls,
    likes: Math.floor(Math.random() * 1000),
    views: Math.floor(Math.random() * 10000),
  };

  return (
    <>
      <div className={styles.storyWrapper}>
        <div className={styles.progressRow}>
          {urls.map((_, idx) => (
            <div key={idx} className={styles.progressContainer}>
              <div
                className={`${styles.progressFill} ${
                  idx === currentIndex ? styles.animateFill : ""
                }`}
                style={{
                  animationDuration:
                    idx === currentIndex ? `${activeDuration}ms` : "0ms",
                  animationPlayState: progressPaused ? "paused" : "running",
                  width: idx < currentIndex ? "100%" : undefined,
                }}
              ></div>
            </div>
          ))}
        </div>

        <Swiper
          modules={[Navigation]}
          loop={false}
          onSwiper={setSwiperInstance}
          onSlideChange={(swiper) => {
            setCurrentIndex(swiper.activeIndex);

            const allVideos = swiper.slides.flatMap((slide) =>
              Array.from(slide.querySelectorAll("video"))
            );
            allVideos.forEach((vid) => {
              vid.pause();
              vid.muted = true;
            });

            const activeVideo =
              swiper.slides[swiper.activeIndex].querySelector("video");
            if (activeVideo) {
              activeVideo.currentTime = 0;
              activeVideo.muted = isMuted;
              activeVideo
                .play()
                .catch((err) => console.warn("Auto-play failed", err));
            }
          }}
          className={styles.storySwiper}
        >
          {urls.map((url, idx) => {
            const isVideo = url.includes(".mp4") || url.includes("video");
            return (
              <SwiperSlide key={idx}>
                <div className={styles.storySlide}>
                  {isVideo ? (
                    <video
                      ref={idx === currentIndex ? videoRef : null}
                      src={url}
                      autoPlay
                      muted
                      loop
                      playsInline
                      className={styles.storyMedia}
                      onError={(e) => console.warn("Video failed to load:", e)}
                    />
                  ) : (
                    <img
                      src={url}
                      alt={`story-${idx}`}
                      className={styles.storyMedia}
                    />
                  )}

                  <div className={styles.storyTopBar}>
                    <PostHeader
                      thumbnail={postData.thumbnail}
                      username={postData.username}
                      fullName={postData.fullName}
                      
                    />

                    {isVideo && idx === currentIndex && (
                      <div className={styles.controlButtons}>
                        <button
                          className={styles.muteButton}
                          onClick={toggleMute}
                        >
                          {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
                        </button>
                        <button
                          className={styles.playPauseButton}
                          onClick={togglePlayPause}
                        >
                          {isPlaying ? <FaPause /> : <FaPlay />}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>

        <SwiperNavigation swiper={swiperInstance} />

        <BottomActivityPanel
          className={styles.shareDownload}
          data={{
            ...postData,
            currentMediaUrl: urls[currentIndex],
            currentMediaIndex: currentIndex,
          }}
        />
      </div>

      <MediaGallery mediaUrls={urls} />
    </>
  );
}
