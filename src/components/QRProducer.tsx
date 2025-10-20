import QRCode from "react-qr-code";

interface QRProducerProps {
  data: Uint8Array;
}

export default function QRProducer({ data }: QRProducerProps) {
  // Convert Uint8Array to base64 string for QR encoding
  const base64Data = btoa(String.fromCharCode(...data));

  return (
    <div className="flex flex-col items-center p-4">
      <QRCode
        size={256}
        style={{ height: "auto", maxWidth: "100%", width: "100%" }}
        value={base64Data}
        viewBox="0 0 256 256"
      />
    </div>
  );
}
