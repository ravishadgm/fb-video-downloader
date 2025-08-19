"use client";

import Image from "next/image";
import styles from "./MediaImage.module.scss";

export default function MediaImage({ src, alt, className }) {
  return (
    <Image
      src={src}
      alt={alt}
      width={450} 
      height={450}
      className={`${styles.image} ${className || ""}`}
  
    />
  );
}
