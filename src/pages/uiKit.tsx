import IconClose from "@/assets/icons/musicPlayer/iconClose";
import IconFullScreen from "@/assets/icons/musicPlayer/iconFullScreen";
import IconNext from "@/assets/icons/musicPlayer/iconNext";
import IconPause from "@/assets/icons/musicPlayer/iconPause";
import IconPlay from "@/assets/icons/musicPlayer/iconPlay";
import IconPrev from "@/assets/icons/musicPlayer/iconPrev";
import IconQueue from "@/assets/icons/musicPlayer/iconQueue";
import IconRandom from "@/assets/icons/musicPlayer/iconRandom";
import IconVolume from "@/assets/icons/musicPlayer/iconVolume";
import { ButtonIcon } from "@/components/shared/ui/Buttons/buttons";
import Player from "@/components/widjets/player/player";
import PlayList from "@/components/widjets/playList/playList";

export default function UiKit() {
  return (
    <div
      style={{
        background: "rgb(31, 31, 31)",
        display: "flex",
        gap: 20,
        padding: 20,
        alignItems: "center",
        flexWrap: "wrap",
      }}
    >
      <IconClose />
      <IconFullScreen />
      <IconNext />
      <IconPause />
      <IconPlay />
      <IconPrev />
      <IconQueue />
      <IconRandom />
      <IconVolume />
      <ButtonIcon icon={<IconPlay />} />
      <PlayList />
      <Player />
    </div>
  );
}
