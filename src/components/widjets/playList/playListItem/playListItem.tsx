import { ButtonIcon } from "@/components/shared/ui/Buttons/buttons";
import s from "./style.module.css";
import IconHeart from "@/assets/icons/musicPlayer/iconHeart";
import IconPlay from "@/assets/icons/musicPlayer/iconPlay";

type IPlayListItem = {
  id: number;
  title: string;
  artist: string;
  album: string;
  year: number;
  genres: string[];
  duration: string;
  image: string;
  url: string;
};

interface PlayListItemProps {
  item: IPlayListItem;
  index: number;
}

const PlayListItem = ({ item, index }: PlayListItemProps) => {
  return (
    <tr className={s.wrapper}>
      <td>
        <div className={s.number_wrapper}>
          <p className={s.number}>{index}</p>
          <ButtonIcon icon={<IconPlay />} />
        </div>
      </td>
      <td>
        <div className={s.info}>
          <img src="" className={s.preview} alt="" />

          <div className={s.name_wrapper}>
            <div className={s.title}>{item.title}</div>
            <div className={s.author}>{item.artist}</div>
          </div>
        </div>
      </td>
      <td>
        <p className={s.album}>{item.album}</p>
      </td>
      <td>
        <p className={s.date}>{item.year}</p>
      </td>
      <td>
        <div className={s.duration}>
          <ButtonIcon icon={<IconHeart />} />
          <p>{item.duration}</p>
        </div>
      </td>
    </tr>
  );
};

export default PlayListItem;
