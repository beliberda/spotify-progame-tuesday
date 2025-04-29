import PlayListItem from "@/components/widjets/playList/playListItem/playListItem";
import s from "./style.module.css";
import clock from "@/assets/icons/other/clock.svg";

import { Fragment } from "react";
import { IMusicData } from "@/interfaces/interfaces";

interface PlayListProps {
  musicList: IMusicData[];
}

const PlayList = ({ musicList }: PlayListProps) => {
  return (
    <table>
      <thead>
        <tr>
          <th>#</th>
          <th>TITLE</th>
          <th>ALBUM</th>
          <th>DATE ADDED</th>
          <th>
            <img width={22} src={clock} alt="" />
          </th>
        </tr>
      </thead>
      <tbody>
        {musicList.length !== 0 &&
          musicList.map((item, i) => {
            return (
              <Fragment key={i}>
                <PlayListItem index={i + 1} item={item} />
              </Fragment>
            );
          })}
      </tbody>
    </table>
  );
};

export default PlayList;
