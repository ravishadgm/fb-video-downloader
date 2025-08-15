"use client";

import { previewComponentMap } from "@/dataStore/mediaPreviewTypes";
import styles from "./style.module.scss";

export default function MediaPreview({ mediaData }) {
  if (!mediaData) return null;

  const typeKey = mediaData.type?.toLowerCase();
  const renderComponent = previewComponentMap[typeKey] || previewComponentMap.photo;

  return (
    <div className={styles.media_container}>
      {renderComponent({ data: mediaData })}
    </div>
  );
}
