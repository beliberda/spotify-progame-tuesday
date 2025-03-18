const formatTime = (time: number | null | undefined) => {
  if (time === undefined || time === null) {
    return "00:00";
  }
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};

export { formatTime };
