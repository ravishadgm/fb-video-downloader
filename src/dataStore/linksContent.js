import { FaVideo, FaImage, FaRegCalendarAlt, FaRegEye } from "react-icons/fa";
import { MdOutlineSlideshow, MdOutlineViewCarousel } from "react-icons/md";

const mainNavLinks = [
  {
    href: "/video",
    label: "Video",
    icon: <FaVideo />,

  },
  {
    href: "/photo",
    label: "Post",
    icon: <FaImage />,

  },
  {
    href: "/reels",
    label: "Reels",
    icon: <FaRegCalendarAlt />,
 
  },
  {
    href: "/story",
    label: "Story",
    icon: <MdOutlineSlideshow />,

  },
  {
    href: "/viewer",
    label: "Viewer",
    icon: <FaRegEye />,
   
  },
  {
    href: "/igtv",
    label: "Igtv",
    icon: <FaVideo />,
   
  },
  {
    href: "/carousel",
    label: "Carousel",
    icon: <MdOutlineViewCarousel />,

  },
];

const legalLinks = [
  { href: "/contact-us", label: "Contact" },
  { href: "/legal/privacy-policy", label: "Privacy Policy" },
  { href: "/legal/terms-and-conditions", label: "Terms & Conditions" },
];



export { mainNavLinks, legalLinks };
