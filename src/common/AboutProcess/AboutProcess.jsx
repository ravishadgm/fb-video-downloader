"use client";

import Image from "next/image";
import styles from "./styles.module.scss";
import Link from "next/link";

export default function AboutProcess({
  title,
  image,
  heading,
  description,
  smallDescription,
  steps,
}) {
  return (
    <section className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.intro}>
          <div className={styles.imageWrapper}>
            <Image
              src={image}
              alt={`${title} process illustration`}
              fill
              className={styles.imageDetail}
              priority={true}
              sizes="(max-width: 768px) 100vw, 90vw"
            />
          </div>
          <div className={styles.description}>
            <h2>{title}</h2>
            <p>{description}</p>
          </div>
        </div>

        <h3 className={styles.subheading}>{heading}</h3>
        <p className={styles.subtext}>{smallDescription}</p>

        <div className={styles.grid}>
          {steps.map((step, index) => (
            <div className={styles.card} key={index}>
              <Link href={step.link}>
                <div className={styles.imageWrapper}>
                  <Image
                    src={step.image}
                    alt={`${title} Process flow Image`}
                    fill
                    className={styles.gridImage}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>

                <div className={styles.imgDescription}>
                  <h4>{step.title}</h4>

                  <p>{step.text}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
