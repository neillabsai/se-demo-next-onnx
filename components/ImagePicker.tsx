import React from "react";
import { Button } from "react-daisyui";
import { useDropzone } from "react-dropzone";
import Gallery from "react-photo-gallery";

interface Props {
  photos: {
    src: string;
    width: number;
    height: number;
    title?: string;
  }[];
  handleSelectedImage: (image: File | URL) => void;
  rowHeight?: number;
}

const ImagePicker = ({ handleSelectedImage, photos, rowHeight }: Props) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    maxFiles: 1,
    accept: {
      "image/*": [".jpeg", ".png"],
    },
    onDrop: (acceptedFile) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        handleSelectedImage(acceptedFile[0]);
      };
      reader.readAsDataURL(acceptedFile[0]);
    },
  });

  return (
    <>
      <div className="pb-5 flex flex-row" {...getRootProps()}>
        <input {...getInputProps()} />
        <Button color="primary">Drag or click to upload your image</Button>
      </div>
      <div className="overflow-scroll h-full">
        <Gallery
          direction="row"
          photos={photos}
          targetRowHeight={rowHeight || 200}
          onClick={(e: any) => handleSelectedImage(e.target.src)}
        />
      </div>
    </>
  );
};

export default ImagePicker;
