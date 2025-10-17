import { useState } from "react";
import { useZxing } from "react-zxing";

export default function QRScanner() {
  const [result, setResult] = useState("");
  const [error, setError] = useState("");

  const { ref } = useZxing({
    onDecodeResult(result) {
      setResult(result.getText());
    },
    onError(err) {
      setError(String(err));
    },
  });

  return (
    <div className="flex flex-col items-center p-4">
      <h2 className="text-2xl mb-4">QR Code Scanner</h2>
      <video ref={ref} className="border border-gray-300 rounded" style={{ width: '300px', height: '300px' }} />
      {error && <p className="text-red-500 mt-2">Error: {error}</p>}
      {result && <p className="mt-2">Scanned Data: {result}</p>}
    </div>
  );
}