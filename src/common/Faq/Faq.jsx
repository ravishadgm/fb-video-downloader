"use client";

import React from "react";
import styles from "./styles.module.scss";

export default function FaqSection({ title, intro, faqs }) {
  const titleId = React.useId();

  return (
    <section className={styles.faq} aria-labelledby={titleId} role="region">
      <div className={styles.container}>
        <h2 id={titleId}>{title}</h2>
        <p className={styles.intro}>{intro}</p>

        {faqs?.map((faq, index) => (
          <div className={styles.item} key={index}>
            <h3>{faq.question}</h3>
            {Array.isArray(faq.answer) ? (
              faq.answer.map((line, i) => <p key={i}>{line}</p>)
            ) : (
              <p>{faq.answer}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
