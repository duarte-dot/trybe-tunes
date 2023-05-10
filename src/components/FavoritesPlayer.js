import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { removeSong } from '../services/favoriteSongsAPI';

class FavoritesPlayer extends Component {
  constructor() {
    super();

    this.state = {
      isLoading: false,
    };
  }

  favSongCheck = async () => {
    const { songObj, getSongs } = this.props;

    this.setState({ isLoading: true });
    await removeSong(songObj);
    this.setState({ isLoading: false });

    await getSongs();
  };

  render() {
    const { trackName, previewUrl } = this.props;
    const { isLoading } = this.state;

    if (isLoading) {
      return <p style={ { marginTop: '40px', marginBottom: '80px' } }>loading...</p>;
    }

    return (
      <div>
        <div className="song-name">
          <p>{trackName}</p>
        </div>

        <div className="audio-and-checkbox">
          <audio src={ previewUrl } controls>
            <track kind="captions" />
            O seu navegador não suporta o elemento
            {' '}
            <code>audio</code>
          </audio>

          <input type="checkbox" checked onChange={ this.favSongCheck } />
        </div>
      </div>
    );
  }
}

FavoritesPlayer.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  songObj: PropTypes.shape({}).isRequired,
  getSongs: PropTypes.func.isRequired,
};

export default FavoritesPlayer;
