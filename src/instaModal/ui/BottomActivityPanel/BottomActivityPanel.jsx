"use client";

import React from "react";
import { handleShareAll } from "@/instaModal/hooks/share/share";
import { handleDownloadAll } from "@/instaModal/hooks/download/download";

import styles from "./BottomActivityPanel.module.scss";

export default function BottomActivityPanel({ data }) {
  const { mediaUrls = [], likes = 0, views = 0, username, caption } = data;

  return (
    <div className={styles.bottomAcitivity}>
  

      <div className={styles.counterSection}>
     

        <div className={styles.shareDownload}>
          <button
            className={styles.shareBtn}
            onClick={() => handleDownloadAll(mediaUrls)}
          >
            {mediaUrls.length > 1
              ? `Download All (${mediaUrls.length})`
              : "Download"}
          </button>
          <button
            className={styles.shareBtn}
            onClick={() => handleShareAll(mediaUrls)}
          >
            {mediaUrls.length > 1 ? `Share All (${mediaUrls.length})` : "Share"}
          </button>
        </div>
      </div>
    </div>
  );
}
