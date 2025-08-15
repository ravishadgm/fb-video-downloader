"use client";

import Image from "next/image";
import styles from "./MediaImage.module.scss";

export default function MediaImage({ src, alt, className }) {
  return (
    <Image
      src={src}
      alt={alt}
      width={500} // required by Next.js, but we'll override with CSS
      height={500}
      className={`${styles.image} ${className || ""}`}
  
    />
  );
}
