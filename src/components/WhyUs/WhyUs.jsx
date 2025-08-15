"use client";

import React from "react";
import { MdDownload, MdDevices, MdThumbUp, MdSecurity } from "@/icons/index";
import styles from "./styles.module.scss";

export default function WhyUs() {
  const titleId = React.useId();

  return (
    <section className={styles.wrapper} aria-labelledby={titleId}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h3 id={titleId} className={styles.title}>
            Choose FacebookDl.app for download from Facebook
          </h3>
          <p className={styles.description}>
            Downloading videos from Facebook in just two clicks is possible
            without compromising on quality. Avoid using unreliable applications
            and appreciate the videos, even if they are of lower quality.
          </p>
        </div>

        <div className={styles.featuresGrid}>
          <article className={styles.feature}>
            <MdDownload
              aria-hidden="true"
              focusable="false"
              className={styles.icon}
            />
            <h4 className={styles.featureTitle}>Fast download</h4>
            <p className={styles.featureDescription}>
              Our servers are optimized to provide you with the fastest download
              speeds.
            </p>
          </article>

          <article className={styles.feature}>
            <MdDevices
              aria-hidden="true"
              focusable="false"
              className={styles.icon}
            />
            <h4 className={styles.featureTitle}>Support for all devices</h4>
            <p className={styles.featureDescription}>
              Whether you're on a mobile, tablet, or desktop, FacebookDl has got
              you covered.
            </p>
          </article>

          <article className={styles.feature}>
            <MdThumbUp
              aria-hidden="true"
              focusable="false"
              className={styles.icon}
            />
            <h4 className={styles.featureTitle}>High quality</h4>
            <p className={styles.featureDescription}>
              Download Facebook content in its original quality without any
              loss.
            </p>
          </article>

          <article className={styles.feature}>
            <MdSecurity
              aria-hidden="true"
              focusable="false"
              className={styles.icon}
            />
            <h4 className={styles.featureTitle}>Security</h4>
            <p className={styles.featureDescription}>
              We prioritize your privacy. No login required and all downloads
              are processed securely.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
