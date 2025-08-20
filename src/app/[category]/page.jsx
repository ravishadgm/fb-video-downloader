import { notFound } from "next/navigation";

import Downloader from "@/components/downloader/Downloader";
import AboutProcess from "@/common/AboutProcess/AboutProcess";
import AppPromotion from "@/common/AppPromotion/AppPromotion";
import DownloadDescription from "@/common/DownloadDescription/DownloadDescription";
import FaqSection from "@/common/Faq/Faq";
import { categoryContent } from "@/dataStore/categoryContent";

export default async function CategoryPage({ params }) {
  const { category } = await params;

  const content = categoryContent[category];

  if (!content) return notFound();
  return (
    <>
      <Downloader title={content.title} subtitle={content.subtitle} />

      <AboutProcess
        image={content.about.image}
        title={content.about.title}
        description={content.about.description}
        heading={content.about.heading}
        smallDescription={content.about.smallDescription}
        steps={content.about.steps}
      />

      <DownloadDescription
        heading={content.downloadDescription.heading}
        headingDescription={content.downloadDescription.headingDescription}
        image={content.downloadDescription.image}
        title={content.downloadDescription.title}
        description={content.downloadDescription.description}
        link={content.downloadDescription.link}
        secondImage={content.downloadDescription.secondImage}
        secondTitle={content.downloadDescription.secondTitle}
        secondDescription={content.downloadDescription.secondDescription}
        secondLink={content.downloadDescription.secondLink}
      />

      <AppPromotion />

      <FaqSection
        title="Frequently asked questions (FAQ)"
        intro={content.faq.intro}
        image={content.faq.image}
        faqs={content.faq.items}
      />
    </>
  );
}
