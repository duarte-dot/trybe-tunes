import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import { UilPause, UilPlay } from '@iconscout/react-unicons';
import { pauseOtherAudios } from '../utils/audio';
import { formatTime } from '../utils/format';
import '../styles/audioPlayer.css';

const ICON_SIZE = 18;
const PREVIEW_SECONDS = 30;

/** Minimal custom preview player: only one audio plays at a time. */
class AudioPlayer extends Component {
  constructor() {
    super();

    this.state = { currentTime: 0, duration: 0, isPlaying: false };
    this.audioRef = createRef();
  }

  onPlay = () => {
    pauseOtherAudios(this.audioRef.current);
    this.setState({ isPlaying: true });
  };

  onPause = () => this.setState({ isPlaying: false });

  onEnded = () => this.setState({ currentTime: 0, isPlaying: false });

  onLoadedMetadata = ({ target }) => this.setState({
    duration: Number.isFinite(target.duration) ? target.duration : 0,
  });

  onTimeUpdate = ({ target }) => this.setState({ currentTime: target.currentTime });

  onSeek = ({ target }) => {
    const currentTime = Number(target.value);

    this.audioRef.current.currentTime = currentTime;
    this.setState({ currentTime });
  };

  togglePlay = () => {
    const audio = this.audioRef.current;

    if (audio.paused) {
      const played = audio.play();
      if (played) played.catch(() => this.setState({ isPlaying: false }));
      return;
    }

    audio.pause();
  };

  render() {
    const { src, trackName } = this.props;
    const { currentTime, duration, isPlaying } = this.state;
    const max = duration || PREVIEW_SECONDS;

    return (
      <div className="player">
        <button
          type="button"
          className="player__toggle"
          aria-label={ `${isPlaying ? 'pause' : 'play'} ${trackName}` }
          onClick={ this.togglePlay }
        >
          {isPlaying ? <UilPause size={ ICON_SIZE } /> : <UilPlay size={ ICON_SIZE } />}
        </button>

        <input
          type="range"
          className="player__seek"
          aria-label={ `seek ${trackName}` }
          min="0"
          max={ max }
          step="0.05"
          value={ currentTime }
          onChange={ this.onSeek }
        />

        <span className="player__time">{formatTime(max - currentTime)}</span>

        <audio
          ref={ this.audioRef }
          src={ src }
          preload="metadata"
          onPlay={ this.onPlay }
          onPause={ this.onPause }
          onEnded={ this.onEnded }
          onTimeUpdate={ this.onTimeUpdate }
          onLoadedMetadata={ this.onLoadedMetadata }
        >
          <track kind="captions" />
        </audio>
      </div>
    );
  }
}

AudioPlayer.propTypes = {
  src: PropTypes.string.isRequired,
  trackName: PropTypes.string.isRequired,
};

export default AudioPlayer;
