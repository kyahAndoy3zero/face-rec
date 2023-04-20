import Dashboard from "./pages/Dashboard";
import { ModalProvider } from "./components/Modal/ModalContext/ModalContext";
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div>
      <ModalProvider>
        <ToastContainer />
        <Dashboard />

      </ModalProvider>
    </div>
  );
}

export default App;
