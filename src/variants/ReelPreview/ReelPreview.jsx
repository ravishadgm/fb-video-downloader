"use client";

import { useState, useRef } from "react";
import BottomActivityPanel from "@/instaModal/ui/BottomActivityPanel/BottomActivityPanel";
import { handleShare } from "@/instaModal/hooks/share/share";
import { handleDownload } from "@/instaModal/hooks/download/download";
import {
  FaThumbsUp,
  FaEye,
  FaPlay,
  FaPause,
  FaVolumeMute,
  FaVolumeUp,
  FaMusic,
} from "react-icons/fa";
import { PiShareFatLight } from "react-icons/pi";
import styles from "./ReelPreview.module.scss";

export default function ReelPreview({ data }) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);
  const videoRef = useRef(null);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) videoRef.current.pause();
    else videoRef.current.play();
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const getTruncatedText = (text, maxLength = 80) => {
    if (!text) return "Video caption";
    if (text.length <= maxLength) return text;
    const truncated = text.substring(0, maxLength);
    const lastSpace = truncated.lastIndexOf(" ");
    return lastSpace > 0 ? text.substring(0, lastSpace) : truncated;
  };

  const toggleCaption = () => setIsExpanded(!isExpanded);

  const mediaUrl = data?.media?.[0]?.url || "";
  const caption = data?.title || data?.caption || "Video caption";

  return (
    <div className={styles.reelContainer}>
      <video
        ref={videoRef}
        className={styles.video}
        src={mediaUrl}
        controls
        muted={isMuted}
        autoPlay
        playsInline
        preload="metadata"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={() => setIsPlaying(false)}
      />

      <div className={styles.topRow}>
        <div className={styles.topControls}>
          <button
            onClick={togglePlay}
            className={styles.controlBtn}
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? <FaPause /> : <FaPlay />}
          </button>

          <button
            onClick={toggleMute}
            className={styles.controlBtn}
            aria-label={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
          </button>
        </div>
      </div>

      <div className={styles.overlayContent}>
        <div className={styles.leftContent}>
          <div className={styles.caption} onClick={toggleCaption}>
            {isExpanded ? (
              <>
                {caption}
                <span className={styles.showMore}> ... less</span>
              </>
            ) : (
              <>
                {getTruncatedText(caption)}
                {caption.length > 80 && (
                  <>
                    <span>...</span>
                    <span className={styles.showMore}> more</span>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      <BottomActivityPanel
        data={{
          ...data,
          mediaUrls: [mediaUrl],
          currentMediaUrl: mediaUrl[0],
          currentMediaIndex: 0,
        }}
      />
    </div>
  );
}
