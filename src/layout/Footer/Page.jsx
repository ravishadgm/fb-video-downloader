"use client";

import Link from "next/link";
import Image from "next/image";
import Images from "@/utils/images";
import styles from "./Footer.module.scss";
import { mainNavLinks, legalLinks } from "@/dataStore/linksContent";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const renderLinks = (links) =>
    links.map((link, index) => (
      <span key={link.href} className={styles.linkWrapper}>
        <Link href={link.href} className={styles.link}>
          {link.label}
        </Link>
        {index < links.length - 1 && (
          <span className={styles.separator} aria-hidden="true">
            |
          </span>
        )}
      </span>
    ));

  return (
    <footer className={styles.footerRoot}>
      <div className={styles.container}>
        {/* Logo */}
        <div className={styles.logo}>
          <Link href="/" aria-label="FacebookDl homepage">
            <Image
              src={Images.Logo}
              alt="FacebookDl Logo"
              width={180}
              height={24}
            />
          </Link>
        </div>

        {/* Main Navigation */}
        <div className={styles.navLinks} aria-label="Main navigation">
          {renderLinks(mainNavLinks)}
        </div>

        {/* Legal & Support */}
        <div className={styles.footerLinks} aria-label="Legal and support">
          {renderLinks(legalLinks)}
        </div>

        {/* Additional Services */}
      </div>

      {/* Copyright */}
      <div className={styles.copyright}>
        <span
          aria-label={`Copyright ${currentYear} FacebookDl. All rights reserved.`}
        >
          © 2024–{currentYear} FacebookDl. All rights reserved.
        </span>
      </div>
    </footer>
  );
}
