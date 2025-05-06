import { PlayListCard } from "@/components/shared/ui/PlayListCard/playListCard";
import { IPlaylist } from "@/interfaces/interfaces";
import axios from "axios";
import { Fragment, useEffect, useState } from "react";

import s from "./style.module.css";

interface PlaylistRowProps {
  id: number;
}

const PlaylistRow = ({ id }: PlaylistRowProps) => {
  const [playList, setPlayList] = useState<IPlaylist[]>([]);

  const fetchPlaylist = async () => {
    const res = await axios.get(`/api/playlist_api.json`);
    setPlayList(res.data);
  };

  useEffect(() => {
    fetchPlaylist();
  }, []);

  return (
    <div className={s.list}>
      {playList.map((item) => {
        return (
          <Fragment key={item.id}>
            <PlayListCard card={item} />
          </Fragment>
        );
      })}
    </div>
  );
};

export { PlaylistRow };
