"use client";

import { useState } from "react";
import styles from "./PostCaption.module.scss";

export default function PostCaption({ username, caption = "" }) {
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => setExpanded(!expanded);

  const lines = caption.split(/\r?\n/);
  const shouldTruncate = lines.length > 1;

  const displayedLines = expanded ? lines : [lines[0]];

  return (
    <div className={styles.caption}>
      <span className={styles.text}>
        {displayedLines.map((line, idx) => (
          <span key={idx}>
            {line}
            {idx < displayedLines.length - 1 && <br />}
          </span>
        ))}
        {shouldTruncate && (
          <button onClick={toggleExpanded} className={styles.more}>
            {expanded ? "less" : "... more"}
          </button>
        )}
      </span>
    </div>
  );
}
