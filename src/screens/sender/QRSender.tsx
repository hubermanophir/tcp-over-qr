interface QRSenderProps {
  file: File | null;
  name: string;
}

export default function QRSender({ file, name }: QRSenderProps) {
  return (
    <div className="p-4">
      <h2 className="text-2xl">QR Sender</h2>
      {file && <p>Selected file: {file.name}</p>}
      {name && <p>File name: {name}</p>}
    </div>
  );
}
