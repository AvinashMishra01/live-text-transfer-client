import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import TextArea from "../components/TextArea";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/:id",
    element: <TextArea />,
  },
]);

export default router;
