import "./themes/normalize.css";
import "./themes/variables.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import UiKit from "@/pages/uiKit";
import Main from "@/pages/Main";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/ui" element={<UiKit />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

// Main
// Login
// Registration
// PlayListPage
