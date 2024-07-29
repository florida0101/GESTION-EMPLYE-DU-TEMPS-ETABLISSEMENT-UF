//import { Button } from "./components/ui/button";
//import BackgroundImage from "./components/Backgroundimage.jsx"
import Body from "./components/Body";
import BackgroundImage from "./components/Backgroundimage";

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <BackgroundImage />,
  },
  {
    path: "body",
    element: <Body />,
  },
]);

function App() {

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
