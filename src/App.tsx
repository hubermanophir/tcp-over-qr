import { createHashRouter, RouterProvider } from "react-router-dom";
import Home from "./screens/home/Home";
import Receiver from "./screens/receiver/Reciever";
import Sender from "./screens/sender/Sender";
import FileSelect from "./screens/sender/FileSelect";
import QRSender from "./screens/sender/QRSender";

const router = createHashRouter([
  { path: "/", element: <Home /> },
  {
    path: "/sender",
    element: <Sender />,
    children: [
      { index: true, element: <FileSelect /> },
      { path: "qr", element: <QRSender /> },
    ],
  },
  { path: "/receiver", element: <Receiver /> },
  { path: "*", element: <div>404 Not Found</div> },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
