import "./App.css";
import useAuthHook from "./custom/useAuthHook";
import AppRouter from "./routes/app.routes";
import { ToastContainer } from "react-toastify";

function App() {
  // const checking=
  useAuthHook()
  return (
    <>
      <ToastContainer theme="dark" />

      <AppRouter />
    </>
  );
}

export default App;
