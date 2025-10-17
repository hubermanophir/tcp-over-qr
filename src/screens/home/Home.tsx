import { useNavigate } from "react-router-dom";
export default function Home() {
  const navigate = useNavigate();

  const goToSender = () => {
    navigate("/sender");
  };

  const goToReceiver = () => {
    navigate("/receiver");
  };

  return (
    <div className="min-h-screen  flex flex-col">
      <h1 className="text-6xl font-bold text-center pt-10 text-gray-800">
        QR File Share
      </h1>
      <div className="flex justify-center items-center flex-1 space-x-8">
        <button
          onClick={goToSender}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-lg shadow-lg transition duration-300 transform hover:scale-105"
        >
          Sender
        </button>
        <button
          onClick={goToReceiver}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-4 px-8 rounded-lg shadow-lg transition duration-300 transform hover:scale-105"
        >
          Receiver
        </button>
      </div>
    </div>
  );
}
