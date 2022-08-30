import { Tensor } from "onnxruntime-web";

const API_ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINT;

const setParmsandQueryModel = ({
  width,
  height,
  uploadScale,
  imgData,
  handleResults,
}: {
  width: number;
  height: number;
  uploadScale: number;
  imgData: HTMLImageElement;
  handleResults: (data: any) => void;
}) => {
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(width * uploadScale);
  canvas.height = Math.round(height * uploadScale);
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  ctx.drawImage(imgData, 0, 0, canvas.width, canvas.height);
  canvas.toBlob(
    (blob) => {
      blob && queryModelReturnTensors({ blob, cb: handleResults });
    },
    "image/jpeg",
    1.0
  );
};

const queryModelReturnTensors = async ({
  blob,
  cb,
}: {
  blob: Blob;
  cb: (data: any) => void;
}) => {
  if (!API_ENDPOINT) return;
  const formData = new FormData();
  formData.append("data", blob);
  const requestOptions = {
    method: "POST",
    body: formData,
  };

  const response = await fetch(API_ENDPOINT, requestOptions);
  const responseJSON = await response.json();
  const embedArr = responseJSON.map((arrStr: string) => {
    const binaryString = window.atob(arrStr);
    const uint8arr = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      uint8arr[i] = binaryString.charCodeAt(i);
    }
    const float32Arr = new Float32Array(uint8arr.buffer);
    return float32Arr;
  });
  const lowResTensor = new Tensor("float32", embedArr[0], [1, 256, 64, 64]);
  const highResTensor = new Tensor("float32", embedArr[1], [1, 64, 256, 256]);
  cb([lowResTensor, highResTensor]);
  return [lowResTensor, highResTensor];
};

export { setParmsandQueryModel };
