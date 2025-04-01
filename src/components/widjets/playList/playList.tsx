import PlayListItem from "@/components/widjets/playList/playListItem/playListItem";
import s from "./style.module.css";
import clock from "@/assets/icons/other/clock.svg";

const PlayList = () => {
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
        <PlayListItem />
        <PlayListItem />
        <PlayListItem />
      </tbody>
    </table>
  );
};

export default PlayList;
