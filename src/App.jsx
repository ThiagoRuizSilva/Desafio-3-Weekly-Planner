

import { BrowserRouter } from "react-router-dom"
import RoutesApp from "./routes"
import { ToastContainer, Slide } from "react-toastify";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";

function App() {

  return (
    <BrowserRouter>
      <RoutesApp/>
      <ToastContainer autoClose={1200} closeButton={false} transition={Slide} />
    </BrowserRouter>
  )
}

export default App
