import { createContext, useState } from "react";

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
    <SenderContext.Provider value={{ isSender, setIsSender }}>
      <>
        <div>
          test text
          <div className="text-green-500 bg-green-100">Test</div>
        </div>
      </>
    </SenderContext.Provider>
  );
}

export default App;
