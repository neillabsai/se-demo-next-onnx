const handleImageScale = (data: HTMLImageElement) => {
  const MAX_IMAGE_SIZE = 500;
  const MAX_UPLOAD_IMAGE_SIZE = 1024;
  const SUPPORTED_DIMENSION = 1333;
  const width = data.naturalWidth;
  const height = data.naturalHeight;
  let scale;
  let uploadScale;
  if (height < width) {
    scale = MAX_IMAGE_SIZE / height;
    if (height * scale > SUPPORTED_DIMENSION) {
      scale = SUPPORTED_DIMENSION / height;
    }
    uploadScale = MAX_UPLOAD_IMAGE_SIZE / width;
  } else {
    scale = MAX_IMAGE_SIZE / width;
    if (width * scale > SUPPORTED_DIMENSION) {
      scale = SUPPORTED_DIMENSION / width;
    }
    uploadScale = MAX_UPLOAD_IMAGE_SIZE / height;
  }
  return { height, width, scale, uploadScale };
};

export { handleImageScale };
