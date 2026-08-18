const SECONDS_IN_MINUTE = 60;
const MS_IN_SECOND = 1000;
const TIME_PAD = 2;
const DEFAULT_ARTWORK_SIZE = 300;

/** 92.4 -> "1:32" */
export const formatTime = (seconds) => {
  if (!Number.isFinite(seconds) || seconds < 0) return '0:00';

  const minutes = Math.floor(seconds / SECONDS_IN_MINUTE);
  const rest = Math.floor(seconds % SECONDS_IN_MINUTE);

  return `${minutes}:${String(rest).padStart(TIME_PAD, '0')}`;
};

/** 213000 -> "3:33" */
export const formatDuration = (milliseconds) => formatTime(
  Number(milliseconds) / MS_IN_SECOND,
);

/** "1997-06-01T07:00:00Z" -> "1997" */
export const formatYear = (date) => {
  const year = new Date(date).getFullYear();

  return Number.isNaN(year) ? '' : String(year);
};

/** iTunes only returns 100x100 artwork by default. */
export const artworkOf = (url, size = DEFAULT_ARTWORK_SIZE) => {
  if (!url) return '';

  return url.replace(/\d+x\d+bb/, `${size}x${size}bb`);
};
