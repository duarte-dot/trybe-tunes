import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { removeSong } from '../services/favoriteSongsAPI';
import '../styles/favorites.css';

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
    const { trackName, previewUrl, artwork } = this.props;
    const { isLoading } = this.state;

    if (isLoading) {
      return <p style={ { marginTop: '40px', marginBottom: '80px' } }>loading...</p>;
    }

    return (
      <div className="div_audio_and_name">
        <div className="song-name">
          <p>{trackName}</p>
        </div>

        <div className="image-audio-and-checkbox">
          <img className="img-song" width="50px" src={ artwork } alt="song" />

          <audio className="audio-song" src={ previewUrl } controls>
            <track kind="captions" />
            O seu navegador não suporta o elemento
            {' '}
            <code>audio</code>
          </audio>

          <input
            className="heart-checkbox"
            type="checkbox"
            checked
            onChange={ this.favSongCheck }
          />
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
  artwork: PropTypes.string.isRequired,
};

export default FavoritesPlayer;
