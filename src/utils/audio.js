/**
 * Keeps a single preview playing at a time: pauses every other audio element
 * currently rendered on the page.
 */
export const pauseOtherAudios = (current) => {
  document.querySelectorAll('audio').forEach((audio) => {
    if (audio !== current) audio.pause();
  });
};

export default pauseOtherAudios;
