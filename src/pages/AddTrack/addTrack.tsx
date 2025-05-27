import { FormEvent, useState } from "react";
import "./style.css";

type FormDataType = {
  title: string;
  artist: string;
  release_year: number;
  genre: string;
  duration: number;
  preview: File | null;
  file: File | null;
};

const initialData: FormDataType = {
  title: "",
  artist: "",
  release_year: 0,
  genre: "",
  duration: 0,
  preview: null,
  file: null,
};

export default function AddTrack() {
  const [formData, setFormData] = useState<FormDataType>(initialData);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value instanceof File) {
          data.append(key, value);
        } else {
          data.append(key, String(value));
        }
      });

      const response = await fetch("http://localhost:3001/api/tracks/upload", {
        method: "POST",
        body: data,
      });

      if (!response.ok) {
        throw new Error(`Ошибка загрузки: ${response.statusText}`);
      }

      alert("Трек успешно загружен!");
      setFormData(initialData);
    } catch (error) {
      console.error("Ошибка:", error);
      alert("Ошибка загрузки трека");
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileInput = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof FormDataType
  ) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({ ...prev, [field]: e.target.files![0] }));
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "duration" || name === "release_year" ? Number(value) : value,
    }));
  };

  return (
    <main>
      <form className="form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Название трека"
          value={formData.title}
          onChange={handleInputChange}
          required
        />

        <input
          type="text"
          name="artist"
          placeholder="Исполнитель"
          value={formData.artist}
          onChange={handleInputChange}
          required
        />

        <input
          type="number"
          name="release_year"
          placeholder="Год выпуска"
          value={formData.release_year}
          onChange={handleInputChange}
          required
        />

        <input
          type="text"
          name="genre"
          placeholder="Жанр"
          value={formData.genre}
          onChange={handleInputChange}
          required
        />

        <input
          type="number"
          name="duration"
          placeholder="Длительность (сек)"
          value={formData.duration}
          onChange={handleInputChange}
          required
        />

        <input
          type="file"
          name="preview"
          onChange={(e) => handleFileInput(e, "preview")}
          accept="image/*"
          required
        />

        <input
          type="file"
          name="file"
          onChange={(e) => handleFileInput(e, "file")}
          accept="audio/*"
          required
        />

        <button type="submit" disabled={isLoading}>
          {isLoading ? "Загрузка..." : "Создать трек"}
        </button>
      </form>
    </main>
  );
}
