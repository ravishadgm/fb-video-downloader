"use client";

import { useRef, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "@/icons/index";
import styles from "./SwiperNavigation.module.scss";

export default function SwiperNavigation({ swiper }) {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  useEffect(() => {
    if (swiper && prevRef.current && nextRef.current) {
      swiper.params.navigation.prevEl = prevRef.current;
      swiper.params.navigation.nextEl = nextRef.current;
      swiper.navigation.init();
      swiper.navigation.update();
    }
  }, [swiper]);

  return (
    <>
      <button ref={prevRef} className={styles.prevButton}>
        <FaChevronLeft />
      </button>
      <button ref={nextRef} className={styles.nextButton}>
        <FaChevronRight />
      </button>
    </>
  );
}
