"use client";

import { useState, useRef } from "react";
import { formatNumber } from "@/instaModal/hooks/formatNumber/formatNumber";
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
          <p className={styles.username}>@{data.username || "username"}</p>

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

        <div className={styles.rightActions}>
          <div className={styles.icon}>
            <FaThumbsUp />
            <span>{formatNumber(data.likes)} </span>
          </div>
          <div className={styles.icon}>
            <FaEye />
            <span>{formatNumber(data.views)} </span>
          </div>
          <div className={styles.icon} onClick={() => handleShare(mediaUrl)}>
            <PiShareFatLight />
            <span>Share</span>
          </div>
        </div>
      </div>

      <div className={styles.shareDownload}>
        <button
          className={styles.innerBtn}
          onClick={() => handleDownload(mediaUrl, 0)}
        >
          Download
        </button>
        <button
          className={styles.innerBtn}
          onClick={() => handleShare(mediaUrl)}
        >
          Share
        </button>
      </div>
    </div>
  );
}
