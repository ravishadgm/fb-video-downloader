import ReelPreview from "@/variants/ReelPreview/ReelPreview";
import StoryPreview from "@/variants/StoryPreview/StoryPreview";
import PhotoPostPreview from "@/variants/PhotoPostPreview/PhotoPostPreview";

export const previewComponentMap = {
  reel: (props) => <ReelPreview {...props} />,      
  story: (props) => <StoryPreview stories={props.data?.stories} {...props} />,
  photo: (props) => <PhotoPostPreview {...props} />, 
};