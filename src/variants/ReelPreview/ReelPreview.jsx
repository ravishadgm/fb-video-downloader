import { useState, useRef } from "react";
import { formatNumber } from "@/instaModal/hooks/formatNumber/formatNumber";
import BottomActivityPanel from "@/instaModal/ui/BottomActivityPanel/BottomActivityPanel";
import { handleShare } from "@/instaModal/hooks/share/share";
import { handleDownload } from "@/instaModal/hooks/download/download";
import { FaHeart, FaEye, FaPaperPlane } from "react-icons/fa";
import styles from "./ReelPreview.module.scss";

export default function ReelPreview({ data }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const videoRef = useRef(null);

  const handlePlay = () => setIsPlaying(true);
  const handlePause = () => setIsPlaying(false);
  const handleEnded = () => setIsPlaying(false);

  const getTruncatedText = (text, maxLength = 80) => {
    if (!text) return "Video caption";
    if (text.length <= maxLength) return text;

    // Find the last space before maxLength to avoid cutting words
    const truncated = text.substring(0, maxLength);
    const lastSpace = truncated.lastIndexOf(" ");
    return lastSpace > 0 ? text.substring(0, lastSpace) : truncated;
  };

  const toggleCaption = () => setIsExpanded(!isExpanded);

  return (
    <div className={styles.reelContainer}>
      <video
        ref={videoRef}
        className={styles.video}
        src={data.mediaUrl}
        poster={`/api/proxy?url=${encodeURIComponent(data.thumbnail)}`}
        controls
        muted
        autoPlay
        playsInline
        preload="metadata"
        onPlay={handlePlay}
        onPause={handlePause}
        onEnded={handleEnded}
      />

      <div className={styles.overlayContent}>
        <div className={styles.leftContent}>
          <p className={styles.username}>@{data.username || "username"}</p>

          <div className={styles.caption} onClick={toggleCaption}>
            {isExpanded ? (
              <>
                {data.caption || "Video caption"}
                <span className={styles.showMore}> ... less</span>
              </>
            ) : (
              <>
                {getTruncatedText(data.caption)}
                {(data.caption || "").length > 80 && (
                  <>
                    <span>...</span>
                    <span className={styles.showMore}> ... more</span>
                  </>
                )}
                {(data.caption || "").length <= 80 && (
                  <span className={styles.showMore}> ... more</span>
                )}
              </>
            )}
          </div>
        </div>

        <div className={styles.rightActions}>
          <div className={styles.icon}>
            <FaHeart />
            <span>{formatNumber(data.likes)} </span>
          </div>
          <div className={styles.icon}>
            <FaEye />
            <span>{formatNumber(data.views)} </span>
          </div>
          <div
            className={styles.icon}
            onClick={() => handleShare(data?.mediaUrls[0])}
          >
            <FaPaperPlane />
            <span>Share</span>
          </div>
        </div>
      </div>

      <div className={styles.shareDownload}>
        <button
          className={styles.innerBtn}
          onClick={() => handleDownload(data?.mediaUrls[0], 0)}
        >
          Download
        </button>
        <button
          className={styles.innerBtn}
          onClick={() => handleShare(data?.mediaUrls[0])}
        >
          Share
        </button>
      </div>
    </div>
  );
}
