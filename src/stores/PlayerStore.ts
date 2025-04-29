import { IMusicData } from "@/interfaces/interfaces";
import axios from "axios";
import { makeAutoObservable } from "mobx";

class PlayerStore {
  constructor() {
    makeAutoObservable(this);
  }

  currentMusic: IMusicData = {} as IMusicData;

  setCurrentMusic(music: IMusicData) {
    this.currentMusic = music;
  }

  async fetchMusicById(id: number) {
    const res = await axios.get(`/api/music_api.json`);

    const music = res.data.find((music: IMusicData) => music.id === id);
    console.log(res.data, music, id);
    if (music) {
      this.setCurrentMusic(music);
      console.log(this.currentMusic);
    } else {
      console.error(`Music with id ${id} not found`);
    }
  }
}

export default new PlayerStore();
