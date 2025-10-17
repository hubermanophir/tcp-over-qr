import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BackToHome from "../../components/BackToHome";

export default function FileSelect() {
  const [file, setFile] = useState<File | null>(null);
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (file && name.trim()) {
      navigate("/sender/qr");
    }
  };

  return (
    <div className="min-h-screen  p-4">
      <BackToHome />
      <h2 className="text-2xl mb-4">Select File and Name</h2>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Choose a file:
        </label>
        <input
          type="file"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="mt-1 block w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          File name:
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter file name"
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        />
      </div>
      <button
        onClick={handleSubmit}
        disabled={!file || !name.trim()}
        className="bg-blue-500 hover:bg-blue-700 disabled:bg-gray-400 text-white font-bold py-2 px-4 rounded"
      >
        Next
      </button>
    </div>
  );
}
