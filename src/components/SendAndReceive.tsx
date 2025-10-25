import QRProducer from "./QRProducer";
import QRScanner from "./QRScanner";

interface SendAndReceiveProps {
  sendData?: Uint8Array;
  setQrData: React.Dispatch<React.SetStateAction<Uint8Array>>;
}

export default function SendAndReceive({
  sendData,
  setQrData,
}: SendAndReceiveProps) {
  console.log('SendAndReceive render - sendData:', sendData);
  console.log('SendAndReceive render - sendData length:', sendData?.length);
  
  return (
    <div>
      <div className="flex justify-center">
        <QRScanner setQrData={setQrData} size={100} />
        {sendData && sendData.length > 0 ? (
          <QRProducer data={sendData} size={500} />
        ) : (
          <div style={{ width: '500px', height: '500px', border: '2px dashed #ccc', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div>
              <p>No QR code to display</p>
              <p style={{ fontSize: '12px', marginTop: '10px' }}>
                sendData: {sendData ? `length ${sendData.length}` : 'undefined'}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
