import PlayList from "@/components/widjets/playList/playList";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import s from "./style.module.css";
const SinglePlaylistPage = () => {
  const [musicList, setMusicList] = useState([]);

  const { playlistId } = useParams();

  console.log(playlistId);

  const getMusicList = async () => {
    axios
      .get("/api/music_api.json")
      .then((response) => {
        setMusicList(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Ошибка получения данных", error);
      });
  };

  useEffect(() => {
    getMusicList();
  }, []);
  return (
    <main className={s.page_wrapper}>
      <div className={s.sidebar}>sidebar left</div>
      <div className={s.playlist_wrapper}>
        <div className={s.top}></div>
        <div className={s.main}>
          <PlayList musicList={musicList} />
        </div>
      </div>
      <div className={s.sidebar}>sidebar right</div>
    </main>
  );
};
export { SinglePlaylistPage };
