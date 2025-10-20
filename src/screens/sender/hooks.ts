import { useRef, useCallback } from 'react';

export const useFileChunkReader = (file: File | null, chunkSize: number = 1024 * 1024) => {
  const positionRef = useRef(0);

  const nextChunk = useCallback(async (): Promise<ArrayBuffer | null> => {
    if (!file || positionRef.current >= file.size) return null;

    const end = Math.min(positionRef.current + chunkSize, file.size);
    const chunk = file.slice(positionRef.current, end);
    const arrayBuffer = await chunk.arrayBuffer();
    positionRef.current = end;

    return arrayBuffer;
  }, [file, chunkSize]);

  const isFinished = !file || positionRef.current >= file.size;

  return { nextChunk, isFinished };
};
