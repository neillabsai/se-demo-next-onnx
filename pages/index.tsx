import type { NextPage } from "next";
import { InferenceSession } from "onnxruntime-web";
import { useEffect, useState } from "react";
// import ImagePicker from "../components/ImagePicker";
import getFile from "../helpers/getFile";
import { handleImageScale } from "../helpers/ImageHelper";
import { setParmsandQueryModel } from "../helpers/modelAPI";
import photos from "../helpers/photos";

// temp ignore warnings during development
import dynamic from "next/dynamic";
const ImagePicker = dynamic(() => import("../components/ImagePicker"), {
  ssr: false,
});

const Home: NextPage = () => {
  const [imgModelProps, setImageModelProps] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<Boolean>(true);
  const [modelLoad, setModelLoad] = useState<Boolean>(false);

  useEffect(() => {
    const initModel = async () => {
      try {
        const URL: string = "./_next/static/chunks/pages/model.onnx";

        const session = await InferenceSession.create(URL);
        console.log(session);
      } catch (e) {
        console.log(e);
      }
    };
    initModel();
  }, []);

  const handleSelectedImage = async (data: File | URL) => {
    const imgData: File = data instanceof File ? data : await getFile(data);
    const img = new Image();
    img.src = URL.createObjectURL(imgData);
    img.onload = () => {
      const { height, width, scale, uploadScale } = handleImageScale(img);
      img.width = Math.round(width * scale);
      img.height = Math.round(height * scale);
      setParmsandQueryModel({
        width,
        height,
        uploadScale,
        imgData: img,
        handleResults,
      });
    };
  };

  const handleResults = (t: any) => {
    console.log("made it to app handle results");
    console.log(t);
  };

  return (
    <div className="App">
      <div className="flex flex-col md:flex-row h-screen">
        {isLoading ? (
          <div className="text-4xl m-auto">
            <h1>Loading...</h1>
          </div>
        ) : null}
        <div className="flex-1">Hello</div>
        {/* <Example /> */}
        <div className="bg-base-content p-9 flex-1 relative">
          <div className="h-full overflow-hidden">
            <ImagePicker
              handleSelectedImage={handleSelectedImage}
              photos={photos}
              rowHeight={250}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
