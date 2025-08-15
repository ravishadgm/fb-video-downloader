"use client";
import { useRef, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import Image from "next/image";
import "swiper/css";
import "swiper/css/navigation";

import { FaPlay, FaPause, FaVolumeUp, FaVolumeMute } from "@/icons/index";
import MediaGallery from "@/instaModal/ui/MediaGallery/MediaGallery";
import SwiperNavigation from "@/instaModal/ui/SwiperNavigation/SwiperNavigation";
import { handleShareAll } from "@/instaModal/hooks/share/share";
import { handleDownloadAll } from "@/instaModal/hooks/download/download";
import styles from "./StoryPreview.module.scss";

export default function StoryPreview({ stories = [] }) {
  const videoRef = useRef(null);
  const [swiperInstance, setSwiperInstance] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeDuration, setActiveDuration] = useState(4000);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progressPaused, setProgressPaused] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  const flattenedStories = stories.reduce((acc, story) => {
    acc.push(story);
    if (story.reel_media && story.reel_media.length > 0) {
      acc.push(...story.reel_media);
    }
    return acc;
  }, []);

  const mediaUrls = flattenedStories
    .map((story) => {
      const video = story.video_versions?.[0]?.url;
      const image =
        story.image_versions2?.candidates?.[0]?.url ||
        story.display_resources?.[0]?.src ||
        story.image_versions?.standard_resolution?.url;
      return video || image;
    })
    .filter(Boolean);

  useEffect(() => {
    const activeStory = flattenedStories[currentIndex];
    const isVideo = activeStory?.video_versions?.[0]?.url;
    if (isVideo) {
      const video = document.createElement("video");
      video.src = activeStory.video_versions[0].url;
      video.onloadedmetadata = () => {
        setActiveDuration(video.duration * 1000);
      };
      video.onerror = () => {
        console.warn("Video failed to load, using default duration");
        setActiveDuration(4000);
      };
    } else {
      setActiveDuration(4000);
    }
  }, [currentIndex, flattenedStories]);

  useEffect(() => {
    if (!isPlaying) return;
    const timer = setTimeout(() => {
      swiperInstance?.slideNext();
    }, activeDuration);
    return () => clearTimeout(timer);
  }, [activeDuration, swiperInstance, currentIndex, isPlaying]);

  if (!flattenedStories.length) {
    return (
      <div className={styles.storyEmpty}>
        <p>No stories found for this user.</p>
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

  return (
    <>
      <div className={styles.storyWrapper}>
        <div className={styles.progressRow}>
          {flattenedStories.map((_, idx) => (
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
            // Play & apply mute setting to the active one
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
          {flattenedStories.map((story, idx) => {
            const video = story.video_versions?.[0]?.url;
            const image =
              story.image_versions2?.candidates?.[0]?.url ||
              story.display_resources?.[0]?.src ||
              story.image_versions?.standard_resolution?.url;

            // Define variables for this specific story
            const thumbnail = story.user?.profile_pic_url;
            const username = story.user?.username || "unknown";
            const fullName = story.user?.full_name;
            const initials = fullName
              ?.split(" ")
              .filter(Boolean)
              .map((word) => word[0])
              .join("")
              .toUpperCase();

            return (
              <SwiperSlide key={idx}>
                <div className={styles.storySlide}>
                  {video ? (
                    <video
                      ref={idx === currentIndex ? videoRef : null}
                      src={video}
                      autoPlay
                      muted
                      loop
                      playsInline
                      className={styles.storyMedia}
                      onError={(e) => console.warn("Video failed to load:", e)}
                    />
                  ) : image ? (
                    <img
                      src={image}
                      alt={`story-${idx}`}
                      className={styles.storyMedia}
                      onError={(e) => {
                        const altImage =
                          story.display_resources?.[1]?.src ||
                          story.image_versions?.low_resolution?.url;
                        if (altImage && e.target.src !== altImage) {
                          e.target.src = altImage;
                        }
                      }}
                    />
                  ) : (
                    <div className={styles.storyPlaceholder}>
                      <p>Story content not available</p>
                    </div>
                  )}

                  <div className={styles.storyTopBar}>
                    <div className={styles.storyUser}>
                      {thumbnail ? (
                        <Image
                          src={thumbnail}
                          alt={username}
                          width={30}
                          height={30}
                          className={styles.avatar}
                        />
                      ) : (
                        <div className={styles.initials}>{initials}</div>
                      )}
                      <span className={styles.username}>{username}</span>
                    </div>

                    {video && idx === currentIndex && (
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
      </div>

      <div className={styles.shareDownload}>
        <button
          className={styles.shareBtn}
          onClick={() => handleDownloadAll(mediaUrls)}
        >
          Download All
        </button>
        <button
          className={styles.shareBtn}
          onClick={() => handleShareAll(mediaUrls)}
        >
          Share All
        </button>
      </div>

      <MediaGallery mediaUrls={mediaUrls} />
    </>
  );
}
