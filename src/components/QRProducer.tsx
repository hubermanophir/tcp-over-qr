import { useState, useEffect } from "react";
import QRCode from "react-qr-code";

interface QRProducerProps {
  data: string;
}

export default function QRProducer({ data }: QRProducerProps) {
  return (
    <div className="flex flex-col items-center p-4">
      <QRCode
        size={100}
        style={{ height: "auto", maxWidth: "20%", width: "20%" }}
        value={"Test hello"}
        viewBox={`0 0 100 100`}
      />
    </div>
  );
}
