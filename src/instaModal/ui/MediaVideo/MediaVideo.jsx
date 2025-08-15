"use client";
import styles from "./MediaVideo.module.scss";
export default function MediaVideo({ src }) {
  return (
    <video
      className={styles.video}
      controls
      playsInline
      muted
      autoPlay
      loop
      preload="metadata"
    >
      <source src={src} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
}
