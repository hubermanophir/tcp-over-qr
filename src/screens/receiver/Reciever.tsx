import BackToHome from "../../components/BackToHome";
import QRProducer from "../../components/QRProducer";

export default function Receiver() {
  return (
    <div className="min-h-screen p-4">
      <BackToHome />
      <h2 className="text-2xl">Receiver</h2>
      <QRProducer data={"Test hello"} />
    </div>
  );
}
