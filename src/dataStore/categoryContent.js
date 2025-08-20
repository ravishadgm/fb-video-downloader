import Images from "@/utils/images";
import {
  carouselSteps,
  carouselFaq,
  igtvSteps,
  igtvFaq,
  photoSteps,
  photoFaq,
  videoSteps,
  videoFaqs,
  reelsFaq,
  reelsSteps,
  storySteps,
  storyFaq,
  viewSteps,
  viewFaq,
} from "@/dataStore/faqContent";

export const categoryContent = {
  video: {
    title: "Facebook Video Downloader",
    subtitle: "Download Videos from Facebook",
    about: {
      image: Images.Download,
      title: "Download Facebook Videos",
      description:
        "Explore a variety of interesting content on Facebook and get your favorite videos with FacebookDl. This easy online tool lets you download Facebook videos anytime, without any limits. FacebookDl lets you download as many videos as you want for watching offline, all with just a few simple steps.",
      smallDescription:
        "Here are the three simple and fastest ways to download an Facebook video.",
      steps: videoSteps,
    },
    downloadDescription: {
      heading: "FacebookDl Downloader",
      image: Images.videoImg2,
      title: "Save videos",
      description:
        "Please note that once you download the video from Facebook you are required to make it available for everyone to see it. In case you are not respecting this rule you will be restricted to download videos from private accounts. Rules are always to be respected!",
      link: "/video",
      secondImage: Images.videoImg4,
      secondTitle: "Video Downloader",
      secondDescription:
        "Furthermore, what you should know is that the downloading of the videos can be done online by just typing the Facebook video link you like. This Facebook video Downloader provides its services absolutely free of any charge; no need to get an account as to become a member.",
      secondLink: "/video",
    },
    faq: {
      title: "Frequently asked questions (FAQ)",
      intro:
        "This FAQ answers common questions or worries people have about the FacebookDl.app downloader. If you don't find the information you're looking for, you can send us an email through our contact page.",
      image: Images.Download,
      items: videoFaqs,
    },
  },
  photo: {
    title: "Facebook Photo Downloader",
    subtitle: "Download Photos from Facebook",
    about: {
      image: Images.Download,
      title: "Download Facebook Photos",
      description: `In today's digital world, Facebook has become a popular place to share the moments of your life through pictures, covering many different topics. If you ever want to save a photo on your phone or computer, FacebookDl is a helpful tool that makes it simple to download and keep any photo you like from Facebook. You can use it whether you're on a PC, Mac, Android, or iPhone, and downloading your favorite Facebook pictures is just a few clicks away.`,
      heading: "How to download Facebook photos?",
      smallDescription: `Check the steps below to easily use this Facebook picture downloader. It helps save you time and effort.`,
      steps: photoSteps,
    },
    downloadDescription: {
      heading: "Facebook Downloader",
      image: Images.DownloadTwo,
      title: "Photos Downloader",
      description: `You can now download several Facebook photos from any device you use, like a smartphone or computer, using the FacebookDl downloader. This is a free online tool that doesn't require a subscription. Simply copy the link from the post where the photo is located and paste it into the correct field. Also, keep in mind that you can download more than one photo at a time with the FacebookDl photo downloader. There's no set limit on how many photos you can download.`,
      link: "/photo",
    },
    faq: {
      title: "Frequently asked questions (FAQ)",
      intro: `This FAQ gives answers to common questions or worries people have about the FacebookDl.app Facebook. If you don't find the information you're looking for, you can send us an email through our contact page.`,
      image: Images.Download,
      items: photoFaq,
    },
  },
  reels: {
    title: "  Facebook Reels Downloader",
    subtitle: "Download Reels from Facebook",
    about: {
      image: Images.Download,
      title: "Download Facebook Reels Videos",
      description: `Reels Downloader, which uses FacebookDl, is an easy-to-use tool for downloading Facebook Reels videos. You can easily save Reels in mp4 format to your device. To get started, copy the Reel's link from Facebook and then paste it into FacebookDl.app. This handy service makes it simple to download Facebook Reels with just a few clicks.`,
      heading: "How to download Facebook Reels?",
      smallDescription:
        "Check out the three simple steps to utilize this Facebook Reels downloader. It's designed to save both time and effort.",
      steps: reelsSteps,
    },
    downloadDescription: {
      heading: "Facebook Reels Downloader",
      image: Images.videoImg1,
      title: "Facebook Reels Download",
      description: `Facebook Reels is a new feature on Facebook that lets people make short videos, either 15 or 30 seconds long. With Facebook's strong editing tools, users can create and customize videos in their own unique way. However, Facebook does not allow people to directly download Reels videos. To easily download Reels videos, FacebookDl is a simple tool that works well. It lets users download any Reels video on different devices like computers, tablets, and phones, including iPhones and Android devices.`,
      link: "/reels",
    },
    faq: {
      title: "Frequently asked questions (FAQ)",
      intro: `This FAQ gives answers to common questions or issues people have about the FacebookDl.app Facebook Reels downloader. If you don't find the answer you're looking for, you can send us an email through our contact page.`,
      image: Images.Download,
      items: reelsFaq,
    },
  },
  story: {
    title: "Facebook Story Downloader",
    subtitle: "Download your Facebook story and highlights easily!",
    about: {
      image: Images.Download,
      title: "Facebook Story saver",
      description: `Facebook Story Saver by FacebookDl is the perfect tool for easily downloading any Facebook story directly to your device, all while staying completely private. Whether you want to re-upload, share again, or just save your favorite stories to your personal media collection for viewing with friends later, FacebookDl makes it simple. There are no limits, so you can keep those memories safe and share the fun again and again. FacebookDl's Story Saver is great for people who just browse Facebook and those who use it a lot, helping you save those quick, special moments shared in stories. Plus, you can use our tool right from your web browser—no need to download any extra apps! Enjoy the convenience and speed of FacebookDl's Facebook Story Saver and never miss out on a story that grabs your attention.`,
      heading: "How to download Story Facebook?",
      smallDescription:
        "Only three easy and quickest steps to download an Facebook Story",
      steps: storySteps,
    },
    downloadDescription: {
      heading: "Facebook Story Download",
      headingDescription: `Facebook is a social media app where people can share stories and post them for their followers to see. You can make stories and highlights just like on Snapchat. Our website lets you download Facebook stories with just one click!`,
      image: Images.videoImg2,
      title: "Story Saver",
      description: `Remember, if you want to save a Story from Facebook, make sure it's set to public so everyone can see it. Follow this rule so you can download stories or highlights from your own accounts. Always follow the rules.`,
      link: "/story",
      secondImage: Images.videoImg1,
      secondTitle: "Story Downloader",
      secondDescription: `Also, you can download the Story online by just entering the Facebook Story link you want. This Facebook Story saver is free to use, and you don't need to create an account to use it. It's completely anonymous.`,
      secondLink: "/story",
    },
    faq: {
      title: "Frequently asked questions (FAQ)",
      intro: `This FAQ answers common questions or issues people have about the FacebookDl.app Facebook story downloader. If you don't find the information you're looking for, you can send us an email through the contact page.`,
      image: Images.Download,
      items: storyFaq,
    },
  },
};
