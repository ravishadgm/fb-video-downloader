"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./styles.module.scss";

export default function DownloadDescription({
  title,
  image,
  description,
  heading,
  headingDescription,
  secondTitle,
  secondImage,
  secondDescription,
  imageAlt = "Feature descriptive illustrate",
  link,
  secondLink,
}) {
  const headingId = React.useId();
  const firstSectionId = React.useId();
  const secondSectionId = React.useId();

  return (
    <section
      className={styles.wrapper}
      role="region"
      aria-labelledby={heading ? headingId : undefined}
      aria-label={!heading ? title : undefined}
    >
      <div className={styles.container}>
        {heading && (
          <h3 className={styles.subheading} id={headingId}>
            {heading}
          </h3>
        )}
        {headingDescription && (
          <p
            className={styles.headingDescription}
            aria-describedby={heading ? headingId : undefined}
          >
            {headingDescription}
          </p>
        )}

        <div
          className={styles.intro}
          aria-labelledby={`${firstSectionId}-title`}
          role="article"
        >
          <div className={styles.description}>
            <h2 id={`${firstSectionId}-title`}>{title}</h2>
            <p>{description}</p>
          </div>

          <div
            className={styles.imageWrapper}
            role="img"
            aria-labelledby={`${firstSectionId}-title`}
          >
            {link ? (
              <Link href={link} className={styles.imageLink}>
                <Image
                  src={image}
                  alt={imageAlt}
                  fill
                  className={styles.imageDetail}
                />
              </Link>
            ) : (
              <Image
                src={image}
                alt={imageAlt}
                fill
                className={styles.imageDetail}
              />
            )}
          </div>
        </div>

        {(secondTitle || secondImage || secondDescription) && (
          <div
            className={styles.secondIntro}
            aria-labelledby={
              secondTitle ? `${secondSectionId}-title` : undefined
            }
            role="article"
          >
            {secondImage && (
              <div
                className={styles.secondImageWrapper}
                role="img"
                aria-labelledby={
                  secondTitle ? `${secondSectionId}-title` : undefined
                }
              >
                {secondLink ? (
                  <Link href={secondLink} className={styles.imageLink}>
                    <Image
                      src={secondImage}
                      alt={imageAlt}
                      fill
                      className={styles.secondImageDetail}
                    />
                  </Link>
                ) : (
                  <Image
                    src={secondImage}
                    alt={imageAlt}
                    fill
                    className={styles.secondImageDetail}
                  />
                )}
              </div>
            )}
            <div className={styles.description}>
              {secondTitle && (
                <h2 id={`${secondSectionId}-title`}>{secondTitle}</h2>
              )}
              {secondDescription && <p>{secondDescription}</p>}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
