import { createHashRouter, RouterProvider } from "react-router-dom";
import Home from "./screens/home/Home";
import Receiver from "./screens/receiver/Receiver";
import Sender from "./screens/sender/Sender";

const router = createHashRouter([
  { path: "/", element: <Home /> },
  {
    path: "/sender",
    element: <Sender />,
  },
  { path: "/receiver", element: <Receiver /> },
  { path: "*", element: <div>404 Not Found</div> },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
