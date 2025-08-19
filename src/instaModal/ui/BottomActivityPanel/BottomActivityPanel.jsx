"use client";

import React from "react";
import PostCaption from "@/instaModal/ui/PostCaption/PostCaption";
import { formatNumber } from "@/instaModal/hooks/formatNumber/formatNumber";
import { handleShareAll } from "@/instaModal/hooks/share/share";
import { handleDownloadAll } from "@/instaModal/hooks/download/download";
// import {  FaThumbsUp , FaRegComment } from "@/icons/index";

import styles from "./BottomActivityPanel.module.scss";

export default function BottomActivityPanel({ data }) {
  const { mediaUrls = [], likes = 0, views = 0, username, caption } = data;

  const formattedLikes = formatNumber(likes);
  const formattedViews = formatNumber(views);

  return (
    <div className={styles.bottomAcitivity}>
      {/* <div className={styles.acitivityDetails}>
        <div className={styles.insideAcitivity}>
          <FaThumbsUp />
          <FaRegComment />
        </div>
      </div> */}

      <div className={styles.counterSection}>
        {/* {(formattedLikes || formattedViews) && (
          <p>
            {formattedLikes && `${formattedLikes} likes`}
            {formattedLikes && formattedViews ? " and " : ""}
            {formattedViews && `${formattedViews} views`}
          </p>
        )} */}

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
