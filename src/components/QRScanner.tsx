import { useState } from "react";
import { useZxing } from "react-zxing";

interface QRScannerProps {
  setQrData: React.Dispatch<React.SetStateAction<Uint8Array>>;
}

export default function QRScanner({ setQrData }: QRScannerProps) {
  const [error, setError] = useState("");

  const { ref } = useZxing({
    onDecodeResult(result) {
      try {
        const base64Data = result.getText();
        const binaryString = atob(base64Data);
        const uint8Array = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) {
          uint8Array[i] = binaryString.charCodeAt(i);
        }
        setQrData(uint8Array);
      } catch (err) {
        setError("Failed to decode QR data.");
      }
    },
    onError(err) {
      setError(String(err));
    },
  });

  return (
    <div className="flex flex-col items-center p-4">
      <h2 className="text-2xl mb-4">QR Code Scanner</h2>
      <video
        ref={ref}
        className="border border-gray-300 rounded"
        style={{ width: "300px", height: "300px" }}
      />
      {error && <p className="text-red-500 mt-2">Error: {error}</p>}
    </div>
  );
}
