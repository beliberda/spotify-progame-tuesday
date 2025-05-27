import "./themes/normalize.css";
import "./themes/variables.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import UiKit from "@/pages/uiKit";
import Main from "@/pages/Main";
import { SinglePlaylistPage } from "@/pages/SinglePlayListPage";
import { observer } from "mobx-react-lite";
import LoginPage from "@/pages/Login/login";
import AddTrack from "@/pages/AddTrack/addTrack";

function App() {
  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/playlist/:playlistId" element={<SinglePlaylistPage />} />
        <Route path="/ui" element={<UiKit />} />
        <Route path="/addTrack" element={<AddTrack />} />
      </Routes>
    </BrowserRouter>
  );
}

export default observer(App);

// Main
// Login
// Registration
// PlayListPage
