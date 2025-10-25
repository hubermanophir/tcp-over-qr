import { useZxing } from "react-zxing";

export enum QRScannerStatus {
  IDLE,
  SUCCESS,
  ERROR,
}

interface QRScannerProps {
  setQrData: React.Dispatch<React.SetStateAction<Uint8Array>>;
  size: number;
}

export default function QRScanner({ setQrData, size }: QRScannerProps) {
  const { ref } = useZxing({
    onDecodeResult(result) {
      try {
        setQrData(result.getRawBytes());
      } catch (err) {
        console.log({ err });
      }
    },
    onError() {},
  });

  return (
    <video
      ref={ref}
      style={{
        width: `${size}px`,
        height: `${size}px`,
      }}
    />
  );
}
