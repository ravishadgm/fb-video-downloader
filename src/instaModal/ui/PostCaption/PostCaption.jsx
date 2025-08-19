"use client";

import { useState } from "react";
import styles from "./PostCaption.module.scss";

function decodeEntities(str) {
  return str
    .replace(/&#x([0-9A-Fa-f]+);/g, (_, code) =>
      String.fromCodePoint(parseInt(code, 16))
    )
    .replace(/&#([0-9]+);/g, (_, code) =>
      String.fromCodePoint(parseInt(code, 10))
    );
}

export default function PostCaption({ username, caption = "" }) {
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => setExpanded(!expanded);

  const decodedCaption = decodeEntities(caption);

  const lines = decodedCaption.split(/\r?\n/);
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
