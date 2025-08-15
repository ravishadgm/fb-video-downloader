import Images from "@/utils/images";
import {
  steps,
  faqs,
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
  carousel: {
    title: "IG Carousel Downloader",
    subtitle: "Download carousel from Facebook",
    about: {
      image: Images.Download,
      title: "Download Facebook Carousels",
      description: `Many Facebook users are familiar with the term "Facebook carousel." It's a type of post that includes several photos or videos, and you can swipe left or click to view them. This format helps grab attention as you scroll through the app. Now, you don't have to wonder if you can download multiple photos from a carousel post. We've made it easy for you. Use our Facebook downloader to save images and mixed content that includes both photos and videos."      heading: "How to download Facebook carousel posts?`,
      smallDescription:
        "Facebook carousel posts can now be downloaded and saved fast and easily. In just three steps, you will get the joy of delighting your eyes while watching your favorite photos",
      steps: carouselSteps,
    },
    downloadDescription: {
      heading: "Carousel Downloader",
      headingDescription: `Facebook is a social media app where people can share stories and show them to their friends. You can make stories and save them in highlights, just like on Snapchat. Our site lets you download Facebook stories with just one click!`,
      image: Images.videoImg3,
      title: "Album Downloader",
      description: `It has always been hard to download an Facebook carousel post. You just need to paste the link of the carousel post without having to look through the source code or find a photo link. It is completely safe and secure because all the photos and videos are downloaded directly from the Facebook server.`,
      link: "/carousel",
      secondImage: Images.DownloadTwo,
      secondTitle: "Download multiple photos",
      secondDescription: `The online Facebook tool lets you download multiple photos for free. It works for even the biggest images, saving them in high quality and keeping their original look. You can get HD images and videos from Facebook using this downloader.`,
      secondLink: "/carousel",
    },
    faq: {
      title: "Frequently asked questions (FAQ)",
      intro: `This FAQ gives answers to common questions or issues people have about the FacebookDl.app downloader. If you don't find the answer you're looking for, you can send us an email through our contact page.`,
      image: Images.Download,
      items: carouselFaq,
    },
  },
  igtv: {
    title: "IGTV Downloader",
    subtitle: "Facebook IGTV Video Download",
    about: {
      image: Images.Download,
      title: "Download Facebook IGTV Videos",
      description: `Discover an easy, fast, and efficient method to download Facebook videos with our IGTV Video Downloader. While scrolling through Facebook, you may come across an IGTV video that you like. Saving it to your device is really simple. Just copy the video's URL, paste it into the special box on the FacebookDl website, and click the Download button. And there you go—your video is ready to watch offline.`,
      heading: "How to download IGTV Facebook?",
      smallDescription: `To download an IGTV video, just follow these simple steps as explained below.`,
      steps: igtvSteps,
    },
    downloadDescription: {
      heading: "Download IGTV Videos",
      headingDescription: `Facebook is a social media app where people can share short updates called stories with their friends. You can make stories and even save them in special sections like Snapchat. Our website lets you download Facebook stories with just one click!`,
      image: Images.videoImg2,
      title: "IGTV Downloader",
      description:
        "After clicking the Download button, you want to check if the video has been downloaded. So, no matter what device you use, a smartphone, a tablet, a Mac, or a PC, the IGTV video will be downloaded in the default Download folder. There should be no compatibility problems.",
      link: "/igtv",
    },
    faq: {
      title: "Frequently asked questions (FAQ)",
      intro: `This FAQ answers common questions or worries people have about the FacebookDl.app IGTV downloader. If you don't find the information you're looking for, you can reach out to us by email using the contact page.`,
      image: Images.Download,
      items: igtvFaq,
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
  viewer: {
    title: "Facebook Stories Viewer",
    subtitle: "Anonymously Facebook Story Viewer",
    about: {
      image: Images.Download,
      title: "Facebook Stories Viewer",
      description:
        "FacebookDl Facebook Stories Viewer is a complimentary tool that enables anonymous viewing of Facebook stories from public profiles without the need for Facebook user authentication. The platform offers a range of free features, allowing you to discreetly view stories without any extra steps, other than entering the user's Facebook handle.",
      heading: "How to use Facebook Story Viewer?",
      smallDescription:
        "See below the three easy steps to use this Facebook Story Viewer. It saves time and energy.",
      steps: viewSteps,
    },
    downloadDescription: {
      heading: "FacebookDl Story Viewer",
      headingDescription: `An Facebook viewer is a website or app that lets you check Facebook posts, stories, and profiles without needing an account or logging in.`,
      image: Images.videoImg1,
      title: "Facebook Stories Viewer",
      description: `Right now, Facebook users can't download or save stories, highlights, or reels directly from the app. But there's a tool called the Facebook Stories viewer that let's users do this. Also, there's the FacebookDl Facebook Highlights viewer, which lets you check public user stories without being logged in, and it works on any device.`,
      link: "/viewer",
    },
    faq: {
      title: "Frequently asked questions (FAQ)",
      intro: `This FAQ answers common questions or worries people have about the FacebookDl.app Facebook viewer. If you don't find the information you're looking for, you can send us an email through our contact page.`,
      image: Images.Download,
      items: viewFaq,
    },
  },
};
