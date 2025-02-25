import { CSSProperties } from "react";
import s from "./style.module.css";
const ButtonDefault = () => {
  return <button></button>;
};

interface IButtonIcon {
  icon: React.ReactNode;
  styles?: CSSProperties;
}

const ButtonIcon = ({ icon, styles }: IButtonIcon) => {
  return (
    <button className={s.icon} style={styles}>
      {icon}
    </button>
  );
};

export { ButtonDefault, ButtonIcon };
