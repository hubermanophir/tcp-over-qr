import { useState } from "react";
import { FileAddOutlined } from "@ant-design/icons";
import { Steps } from "antd";
import BackToHome from "../../components/BackToHome";
import FileSelect from "./FileSelect";
import QRSender from "./QRSender";
import { useFileChunkReader } from "./hooks";

export default function Sender() {
  const [step, setStep] = useState(0);
  const [file, setFile] = useState<File | null>(null);
  const [name, setName] = useState("");
//   const { nextChunk, isFinished } = useFileChunkReader();
  return (
    <>
      <BackToHome />

      <div className="p-4">
        {step === 0 && (
          <FileSelect
            file={file}
            setFile={setFile}
            name={name}
            setName={setName}
          />
        )}
        {step === 1 && <QRSender file={file} name={name} />}
      </div>

      <Steps
        current={step}
        items={[
          {
            title: "Select File",
            icon: <FileAddOutlined />,
            onClick: () => setStep(0),
          },
          {
            title: "Send File",
            onClick: () => setStep(1),
          },
        ]}
      />
    </>
  );
}
