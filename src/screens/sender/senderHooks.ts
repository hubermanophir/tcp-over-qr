import { useState } from "react";

export const useSender = (
  file: File,
  chunkSize: number,
  offset: number,
  setOffset: React.Dispatch<React.SetStateAction<number>>
) => {
  const [isFinished, setIsFinished] = useState(false);
  const fileReader = new FileReader();
  const getNextChunk = async () => {
    if (offset >= file.size) {
      setIsFinished(true);
      return null;
    }
    const chunk = file.slice(offset, offset + chunkSize);
    setOffset((prev) => prev + chunkSize);
    return new Promise<ArrayBuffer>((resolve, reject) => {
      fileReader.onload = (e) => {
        const arrayBuffer = e.target?.result as ArrayBuffer;
        resolve(arrayBuffer);
      };
      fileReader.onerror = (e) => {
        console.error("Error reading chunk:", e);
        reject(e);
      };
      fileReader.readAsArrayBuffer(chunk);
    });
  };

  return { getNextChunk, isFinished };
};
