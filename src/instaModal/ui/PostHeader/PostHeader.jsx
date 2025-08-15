"use client";

import Image from "next/image";
import styles from "./PostHeader.module.scss";

export default function PostHeader({ thumbnail, username, fullName }) {
  if (!username) return null;

  const initials = fullName
    ?.split(" ")
    .filter(Boolean)
    .map((word) => word[0])
    .join("")
    .toUpperCase();

  return (
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
        <div className={styles.initials}>{initials}</div>
      )}
      <span className={styles.username}>{username}</span>
    </div>
  );
}
