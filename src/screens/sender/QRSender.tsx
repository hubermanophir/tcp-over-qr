import BackToHome from "../../components/BackToHome";
import QRScanner from "../../components/QRScanner";

export default function QRSender() {
  return (
    <div className="min-h-screen p-4">
      <BackToHome />
      <h2 className="text-2xl">QR Sender</h2>
      <QRScanner />
    </div>
  );
}
