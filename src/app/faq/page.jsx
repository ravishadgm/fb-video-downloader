import React from "react";
import { mainFaq } from "@/dataStore/faqContent";
import FaqSection from "@/common/Faq/Faq";

export const metadata = {
  title: "Faq - FacebookDl",
  description:
    "Find answers to the most frequently asked questions about FacebookDl, including downloads, formats, privacy, and troubleshooting.",
};

export default function page() {
  return (
    <FaqSection
      title="FAQ - frequently asked question"
      intro="You’re here on this page, so you might be looking for help with downloading Facebook Photos and videos. Let’s go through the most common questions people have about FacebookDl.app and the answers."
      faqs={mainFaq}
    />
  );
}
