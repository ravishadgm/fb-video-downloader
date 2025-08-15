import React from "react";
import styles from "./styles.module.scss";

export const metadata = {
  title: "Contact - FacebookDl",
  description: "Get in touch with the FacebookDl support team.",
};

export default function page() {
  const headingId = React.useId();

  return (
    <main className={styles.ContactWrapper}>
      <div className={styles.container}>
        <h3 id={headingId} className={styles.heading}>
          Contact Us
        </h3>
        <div className={styles.content} aria-labelledby={headingId}>
          <p>
            Do you want to know more about how we could help you? Don’t hesitate
            to get in touch with us.
          </p>
          <p>
            Contact us by email:{" "}
            <a
              href="mailto:resilient.tech001@gmail.com"
              className={styles.link}
              aria-label="Send email to support at FacebookDl.app"
            >
              resilient.tech001@gmail.com
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}
