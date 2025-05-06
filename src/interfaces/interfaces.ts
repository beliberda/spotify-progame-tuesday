export interface IMusicData {
  id: number;
  title: string;
  artist: string;
  album: string;
  year: number;
  genres: string[];
  duration: string;
  image: string;
  url: string;
}

export interface IPlaylist {
  id: number;
  title: string;
  authorList: string;
  img: string;
}
