import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AudioPlayer from './AudioPlayer';
import FavoriteButton from './FavoriteButton';
import { formatDuration } from '../utils/format';
import '../styles/trackRow.css';

class TrackRow extends Component {
  render() {
    const { isFavorite, onToggleFavorite, position, track } = this.props;

    return (
      <li className="track">
        <span className="track__index">{position}</span>

        <img className="track__art" src={ track.artworkUrl60 } alt="" />

        <div className="track__meta">
          <p className="track__name">{track.trackName}</p>
          <p className="track__sub">
            {track.artistName}
            <span className="track__dot">•</span>
            {formatDuration(track.trackTimeMillis)}
          </p>
        </div>

        <AudioPlayer src={ track.previewUrl } trackName={ track.trackName } />

        <FavoriteButton
          isFavorite={ isFavorite }
          trackName={ track.trackName }
          onToggle={ onToggleFavorite }
        />
      </li>
    );
  }
}

TrackRow.propTypes = {
  isFavorite: PropTypes.bool.isRequired,
  onToggleFavorite: PropTypes.func.isRequired,
  position: PropTypes.number.isRequired,
  track: PropTypes.shape({
    artistName: PropTypes.string,
    artworkUrl60: PropTypes.string,
    previewUrl: PropTypes.string,
    trackName: PropTypes.string,
    trackTimeMillis: PropTypes.number,
  }).isRequired,
};

export default TrackRow;
