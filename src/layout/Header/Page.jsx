"use client";
import Link from "next/link";
import Image from "next/image";
import Images from "@/utils/images";
import styles from "./Header.module.scss";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo} aria-label="FacebookDl homepage">
          <Image
            src={Images.Logo}
            alt="FacebookDl Logo"
            fill
            className={styles.logoImage}
          />
        </Link>
        <nav aria-label="Header navigation">
          <Link href="/faq" className={styles.link}>
            FAQ
          </Link>
        </nav>
      </div>
    </header>
  );
}
