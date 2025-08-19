"use client";

import Image from "next/image";
import styles from "./PostHeader.module.scss";
import PostCaption from "../PostCaption/PostCaption";

export default function PostHeader({
  thumbnail,
  username,
  fullName,
  title,
  textColor = "#333",
}) {
  if (!username) return null;

  const initials = fullName
    ?.split(" ")
    .filter(Boolean)
    .map((word) => word[0])
    .join("")
    .toUpperCase();

  return (
    <div>
      <div className={styles.header}>
        {thumbnail ? (
          <Image
            src={thumbnail}
            alt={username}
            width={30}
            height={30}
            className={styles.avatar}
          />
        ) : (
          <div className={styles.initials} style={{ color: textColor }}>
            {initials}
          </div>
        )}
        <span className={styles.username} style={{ color: textColor }}>
          {username}
        </span>
      </div>
      {title && <PostCaption username={username} caption={title} />}
    </div>
  );
}
