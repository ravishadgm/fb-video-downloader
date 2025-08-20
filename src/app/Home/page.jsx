import React from "react";
import Downloader from "@/components/downloader/Downloader";
import WhyUs from "@/components/WhyUs/WhyUs";
import { steps, faqs } from "@/dataStore/faqContent";
import AboutProcess from "@/common/AboutProcess/AboutProcess";
import AppPromotion from "@/common/AppPromotion/AppPromotion";
import DownloadDescription from "@/common/DownloadDescription/DownloadDescription";
import FaqSection from "@/common/Faq/Faq";
import Images from "@/utils/images";

export default function Page() {
  return (
    <>
      <Downloader />
      <AboutProcess
        image={Images.Download}
        title="Facebook Videos and Photos Download"
        description="FacebookDl is an online web tool that helps you download Facebook Videos, Photos, Reels, and IGTV. FacebookDl.app is designed to be easy to use on any device, such as a mobile phone, tablet, or computer."
        heading="How to download from Facebook?"
        smallDescription="You must follow these three easy steps to download video, reels, and photo from Facebook. Follow the simple steps below."
        steps={steps}
      />
      <WhyUs />
      <DownloadDescription
        heading="FacebookDl.app features"
        headingDescription="With FacebookDl you can download any type of content from Facebook. Our service has an IG video downloader, Reels, story & photo."
        image={Images.videoImg2}
        title="Video Downloader"
        description="FacebookDl.app supports Facebook video download for singular videos and multiple videos from carousels. FacebookDl is created to enable you to download IG videos from your personal page."
        link="/video"
        secondImage={Images.DownloadTwo}
        secondTitle="Photos Downloader"
        secondDescription="Facebook photo download provided by FacebookDl.app is a great tool for saving images from Facebook posts. With FacebookDl, you can download a single post image and multiple Facebook photos (carousel)."
        secondLink="/photo"
      />

      <DownloadDescription
        image={Images.videoImg1}
        title="Reels Downloader"
        description="Reels is a new video format that clones the principle of TikTok. Facebook Reels download with the help of FacebookDl. Our Facebook Reels downloader can help you to save your favorite Reels videos."
        link="/reels"
        secondImage={Images.videoImg3}
        secondTitle="Story Downloader"
        secondDescription="Story is a long video type. If you can’t watch it now, you can download Story videos to your device to be sure that you can return to watching later, without the need to be online or in case the Story can be deleted."
        secondLink="/story"
      />

      <AppPromotion />
      <FaqSection
        title="Frequently asked questions (FAQ)"
        intro="This FAQ answers common questions and worries about FacebookDl.app, which is a tool to download public Facebook content. If you can't find the answer to your question, you can email us through our contact page."
        image={Images.Download}
        faqs={faqs}
      />
    </>
  );
}
