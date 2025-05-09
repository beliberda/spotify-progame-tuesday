import "./themes/normalize.css";
import "./themes/variables.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import UiKit from "@/pages/uiKit";
import Main from "@/pages/Main";
import { SinglePlaylistPage } from "@/pages/SinglePlayListPage";
import { observer } from "mobx-react-lite";

function App() {
  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/playlist/:playlistId" element={<SinglePlaylistPage />} />
        <Route path="/ui" element={<UiKit />} />
      </Routes>
    </BrowserRouter>
  );
}

export default observer(App);

// Main
// Login
// Registration
// PlayListPage
