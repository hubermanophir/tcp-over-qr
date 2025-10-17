import { createContext, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./screens/home/Home";
import Receiver from "./screens/receiver/Reciever";
import Sender from "./screens/sender/Sender";

type SenderContextType = {
  isSender: boolean;
  setIsSender: React.Dispatch<React.SetStateAction<boolean>>;
};

export const SenderContext = createContext<SenderContextType>({
  isSender: false,
  setIsSender: (_value: any) => {},
});
function App() {
  const [isSender, setIsSender] = useState(false);

  return (
    <Router>
      <SenderContext.Provider value={{ isSender, setIsSender }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sender" element={<Sender />} />
          <Route path="/receiver" element={<Receiver />} />
        </Routes>
      </SenderContext.Provider>
    </Router>
  );
}

export default App;
