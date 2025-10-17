import { useNavigate } from "react-router-dom";

export default function BackToHome() {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate("/")}
      className="mb-4 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
    >
      Back to Home
    </button>
  );
}