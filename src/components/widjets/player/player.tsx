import {
  ChangeEvent,
  FC,
  MouseEvent,
  useEffect,
  useRef,
  useState,
} from "react";

import { ButtonIcon } from "@/components/shared/ui/Buttons/buttons";
import s from "./style.module.css";

import IconRandom from "@/assets/icons/musicPlayer/iconRandom";
import IconPrev from "@/assets/icons/musicPlayer/iconPrev";
import IconPlay from "@/assets/icons/musicPlayer/iconPlay";
import IconNext from "@/assets/icons/musicPlayer/iconNext";
import IconRepeat from "@/assets/icons/musicPlayer/iconRepeat";
import IconArrowHide from "@/assets/icons/musicPlayer/iconArrowHide";
import IconQueue from "@/assets/icons/musicPlayer/iconQueue";
import IconVolume from "@/assets/icons/musicPlayer/iconVolume";
import IconFullScreen from "@/assets/icons/musicPlayer/iconFullScreen";
import IconHeart from "@/assets/icons/musicPlayer/iconHeart";
import axios from "axios";
import { formatTime } from "@/components/shared/utils/formatTime";
import IconPause from "@/assets/icons/musicPlayer/iconPause";
import IconMute from "@/assets/icons/musicPlayer/iconMute";
import { IMusicData } from "@/interfaces/interfaces";
import PlayerStore from "@/stores/PlayerStore";
import { observer } from "mobx-react-lite";

const Player: FC = () => {
  const { currentMusic: musicData } = PlayerStore;

  // Превьюшка
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  // данные музыки
  // const [musicData, setMusicData] = useState<IMusicData | null>(null);
  // перемотка и время
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  // Звук
  const [volume, setVolume] = useState(1);
  const [isMute, setIsMute] = useState(false);

  const musicRef = useRef<HTMLAudioElement>(null);

  // const getMusicData = async () => {
  //   axios
  //     .get("./api/music_api.json")
  //     .then((response) => {
  //       console.log(response.data);
  //       setMusicData(response.data[0]);
  //     })
  //     .catch((error) => {
  //       console.error("ОшЫбка ПоЛуЧеНиЯ", error);
  //     })
  //     .finally(() => {
  //       console.log("Сработало в любом случае");
  //     });
  // };

  const handlePlay = () => {
    if (!musicRef.current) return;
    if (isPlaying) {
      musicRef.current.pause();
      setIsPlaying(() => false);
    } else {
      musicRef.current.play();
      setIsPlaying(() => true);
    }
  };
  useEffect(() => {}, []);
  useEffect(() => {
    const audio = musicRef.current;
    if (audio) {
      audio.addEventListener("timeupdate", () => {
        setCurrentTime(audio.currentTime);
      });
      audio.addEventListener("loadedmetadata", () => {
        setDuration(audio.duration);
      });
    }
    return () => {
      if (audio) {
        audio.removeEventListener("timeupdate", () => {});
        audio.removeEventListener("loadedmetadata", () => {});
      }
    };
  }, [musicData]);

  const handleChangePreview = (bool: boolean) => {
    setIsPreviewOpen(bool);
  };

  const onSeek = (event: MouseEvent<HTMLDivElement>) => {
    const audio = musicRef.current;
    if (audio) {
      const timelineWidth = event.currentTarget.offsetWidth;
      const clickPosition = event.nativeEvent.offsetX;
      const seekTime = (clickPosition / timelineWidth) * audio.duration;
      audio.currentTime = seekTime;
    }
  };

  const handleVolumChange = (event: ChangeEvent<HTMLInputElement>) => {
    const audio = musicRef.current;
    if (!audio || !event.currentTarget) return;
    audio.volume = Number(event.currentTarget.value);
  };

  const handleChangeMute = () => {
    const audio = musicRef.current;
    if (!audio) return;

    setIsMute((prevState) => !prevState);
    audio.muted = !audio.muted;
  };

  return (
    <div className={s.player_wrapper}>
      {isPreviewOpen && (
        <div className={s.preview_wrapper}>
          <img src={musicData?.image} alt="" />
          <ButtonIcon
            handleClick={() => handleChangePreview(false)}
            icon={<IconArrowHide />}
          />
        </div>
      )}
      <section className={s.left}>
        {!isPreviewOpen && (
          <img
            onClick={() => handleChangePreview(true)}
            src={musicData?.image}
            alt=""
          />
        )}

        <div>
          <h3>{musicData?.title}</h3>
          <h4>{musicData?.artist}</h4>
        </div>
        <ButtonIcon icon={<IconHeart />} />
      </section>
      <section className={s.center}>
        <div className={s.center_top}>
          <ButtonIcon icon={<IconRandom />} />
          <ButtonIcon icon={<IconPrev />} />
          <ButtonIcon
            handleClick={handlePlay}
            icon={isPlaying ? <IconPause /> : <IconPlay />}
          />
          <ButtonIcon icon={<IconNext />} />
          <ButtonIcon icon={<IconRepeat />} />
        </div>
        <div className={s.center_bottom}>
          <p>{formatTime(currentTime)}</p>
          <div onClick={onSeek} className={s.progress_bar}>
            <div
              style={{ width: (currentTime / duration) * 100 + "%" }}
              className={s.progress}
            ></div>
          </div>
          <p>{formatTime(duration)}</p>
        </div>
      </section>
      <section className={s.right}>
        <ButtonIcon icon={<IconQueue />} />

        <div className={s.volume_wrapper}>
          <ButtonIcon
            handleClick={handleChangeMute}
            icon={isMute ? <IconMute /> : <IconVolume />}
          />
          <input
            className={s.volume}
            onInput={handleVolumChange}
            type="range"
            min={0}
            max={1}
            step={0.01}
          />
        </div>

        <ButtonIcon icon={<IconFullScreen />} />
      </section>
      <audio ref={musicRef} src={musicData?.url}></audio>
    </div>
  );
};

export default observer(Player);
