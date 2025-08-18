import ReelPreview from "@/variants/ReelPreview/ReelPreview";
import StoryPreview from "@/variants/StoryPreview/StoryPreview";
import PhotoPostPreview from "@/variants/PhotoPostPreview/PhotoPostPreview";

export const previewComponentMap = {
  reel: (props) => <ReelPreview {...props} />,        // This will handle Facebook videos
  story: (props) => <StoryPreview stories={props.data?.stories} {...props} />,
  photo: (props) => <PhotoPostPreview {...props} />,  // This will handle Facebook photos
  viewer: (props) => <PhotoPostPreview {...props} />,
  igtv: (props) => <PhotoPostPreview {...props} />,
  carousel: (props) => <PhotoPostPreview {...props} />,
};