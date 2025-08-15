"use client";

import { isVideo } from "@/utils/constHelper";
import MediaImage from "@/instaModal/ui/MediaImage/MediaImage";
import MediaVideo from "@/instaModal/ui/MediaVideo/MediaVideo";
import { handleShare } from "@/instaModal/hooks/share/share";
import { handleDownload } from "@/instaModal/hooks/download/download";
import styles from "./MediaGallery.module.scss";

export default function MediaGallery({ mediaUrls = [] }) {
  if (!mediaUrls.length) return null;

  if (mediaUrls.length > 1) {
    return (
      <div className={styles.galleryGrid}>
        {mediaUrls.filter(Boolean).map((url, idx) => (
          <div key={idx} className={styles.mediaItem}>
            <div className={styles.mediaWrapper}>
              {isVideo(url) ? (
                <MediaVideo src={url} />
              ) : (
                <MediaImage src={url} alt={`Media ${idx + 1}`} />
              )}
            </div>
            <div className={styles.actionButtons}>
              <button onClick={() => handleDownload(url)}>Download</button>
              <button onClick={() => handleShare(url)}>Share</button>
            </div>
          </div>
        ))}
      </div>
    );
  }
}
