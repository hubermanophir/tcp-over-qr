import QRCode from "react-qr-code";

interface QRProducerProps {
  data: Uint8Array;
  size: number;
}

export default function QRProducer({ data, size }: QRProducerProps) {
  console.log('QRProducer render - data:', data);
  console.log('QRProducer render - data length:', data.length);

  const base64Data = btoa(String.fromCharCode(...data));

  return (
    <div>
      <QRCode size={size} value={base64Data} />
      <p style={{ fontSize: '12px', marginTop: '10px' }}>
        QR Code: {base64Data}
      </p>
    </div>
  );
} 
