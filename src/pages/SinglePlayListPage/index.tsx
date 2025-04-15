import PlayList from "@/components/widjets/playList/playList";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

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
    <main>
      <h1>Single playlist</h1>

      <PlayList musicList={musicList} />
    </main>
  );
};
export { SinglePlaylistPage };
