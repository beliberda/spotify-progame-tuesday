import { ButtonIcon } from "@/components/shared/ui/Buttons/buttons";
import s from "./style.module.css";
import IconHeart from "@/assets/icons/musicPlayer/iconHeart";
import IconPlay from "@/assets/icons/musicPlayer/iconPlay";

const PlayListItem = () => {
  return (
    <tr className={s.wrapper}>
      <td className={s.number_wrapper}>
        <p className={s.number}>1</p>
        <ButtonIcon icon={<IconPlay />} />
      </td>
      <td>
        <div className={s.info}>
          <img src="" className={s.preview} alt="" />

          <div className={s.name_wrapper}>
            <div className={s.title}>Song Name</div>
            <div className={s.author}>Artist Name</div>
          </div>
        </div>
      </td>
      <td>
        <p className={s.album}></p>
      </td>
      <td>
        <p className={s.date}>2017</p>
      </td>
      <td>
        <div className={s.duration}>
          <ButtonIcon icon={<IconHeart />} />
          <p>2:17</p>
        </div>
      </td>
    </tr>
  );
};

export default PlayListItem;
