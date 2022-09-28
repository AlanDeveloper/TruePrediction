import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import './index.css';

function App() {
  return (
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<Home />} exact />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
