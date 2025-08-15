"use client";

import Link from "next/link";
import Image from "next/image";
import Images from "@/utils/images";
import { FaDownload } from "@/icons/index";
import styles from "./AppPromotion.module.scss";

export default function AppPromotion() {
  return (
    <section
      className={styles.promo}
      aria-labelledby="app-promo-heading"
      role="region"
    >
      <div className={styles.container}>
        <div className={styles.leftSection}>
          <div className={styles.imageWrapper}>
            <Image
              src={Images.mobile}
              alt="Mobile phone displaying Facebook app interface with downloaded content"
              fill
              className={styles.phoneImage}
              priority
            />
          </div>
        </div>
        <div className={styles.content}>
          <h2 id="app-promo-heading">Download with mobile app</h2>
          <p>
            Download any photos, videos, reels, IGTV in one click! Our app
            provides fast, high-resolution downloads without watermarks, making
            it an ideal choice for downloading Facebook content.
          </p>
          <Link href="/">
            <button
              className={styles.installBtn}
              type="button"
              aria-label="Install mobile app for downloading Facebook content"
            >
              <FaDownload size={18} />
              Install now
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
