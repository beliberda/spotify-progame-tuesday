import { CSSProperties } from "react";
import s from "./style.module.css";
const ButtonDefault = () => {
  return <button></button>;
};

interface IButtonIcon {
  icon: React.ReactNode;
  styles?: CSSProperties;
  handleClick?: () => void;
}

const ButtonIcon = ({ icon, styles, handleClick }: IButtonIcon) => {
  return (
    <button onClick={handleClick} className={s.icon} style={styles}>
      {icon}
    </button>
  );
};

export { ButtonDefault, ButtonIcon };
