import { useState } from "react";
import { useSender } from "./senderHooks";
import { Size } from "../../protocol/types";
import SendAndReceive from "../../components/SendAndReceive";

export default function Sender() {
  const [file, setFile] = useState<File | null>(null);
  const [sendBytes, setSendBytes] = useState(new Uint8Array());
  const [receiveBytes, setReceiveBytes] = useState(new Uint8Array());
  const [offset, setOffset] = useState(0);

  const { getNextChunk, isFinished } = useSender(
    file!,
    Size.PAYLOAD_SIZE,
    offset,
    setOffset
  );

  return (
    <div>
      <h1>Sender</h1>
      <input
        type="file"
        onChange={(e) => {
          if (e.target.files && e.target.files.length > 0) {
            setFile(e.target.files[0]);
          }
        }}
      />
      {file && <p>Selected file: {file.name}</p>}
      <SendAndReceive setQrData={} sendData={} />
    </div>
  );
}
