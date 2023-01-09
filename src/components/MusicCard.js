import React, { Component } from 'react';
import PropTypes from 'prop-types';

class MusicCard extends Component {
  render() {
    const { trackId, trackName, previewUrl } = this.props;
    return (
      <div
        style={ {
          marginTop: '40px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center' } }
      >
        <p>{trackName}</p>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          <code>audio</code>
        </audio>
        <label data-testid={ `checkbox-music-${trackId}` } htmlFor="checkb">
          Favorita
          <input type="checkbox" name="checkb" id="checkb" />

        </label>
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.string.isRequired,
};

export default MusicCard;
