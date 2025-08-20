"use client";

import { previewComponentMap } from "@/dataStore/mediaPreviewTypes";

export default function MediaPreview({ mediaData }) {
  if (!mediaData) return null;

  const typeKey = mediaData.type?.toLowerCase();
  const renderComponent =
    previewComponentMap[typeKey] || previewComponentMap.photo;

  return (
    <div style={{ margin: "2rem 0" }}>
      {renderComponent({ data: mediaData })}
    </div>
  );
}
