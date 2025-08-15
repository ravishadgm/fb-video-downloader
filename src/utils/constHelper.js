
export const isVideo = (url) => /\.(mp4|webm|ogg)(\?.*)?$/.test(url);

export const isImage = (url) => /\.(jpg|jpeg|png|gif|webp)(\?.*)?$/.test(url);
