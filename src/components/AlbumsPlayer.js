import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, removeSong } from '../services/favoriteSongsAPI';
import '../styles/albumplayer.css';

class AlbumsPlayer extends Component {
  constructor() {
    super();

    this.state = {
      isLoading: false,
      isFavorite: false,
    };
  }

  componentDidMount() {
    const { checked } = this.props;
    if (checked) {
      this.setState({ isFavorite: true });
    }
  }

  favSongCheck = async () => {
    const { isFavorite } = this.state;
    const { songObj } = this.props;

    this.setState({ isLoading: true });

    if (isFavorite) {
      await removeSong(songObj);
      this.setState({ isFavorite: false, isLoading: false });
    } else {
      await addSong(songObj);
      this.setState({ isFavorite: true, isLoading: false });
    }
  };

  render() {
    const { trackName, previewUrl, artwork } = this.props;
    const { isFavorite, isLoading } = this.state;

    if (isLoading) {
      return (
        <p
          style={ {
            marginTop: '40px',
            marginBottom: '60px',
            textAlign: 'center',
          } }
        >
          loading...
        </p>
      );
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
            className="heart-checkbox-no-favorite"
            type="checkbox"
            checked={ isFavorite }
            onChange={ this.favSongCheck }
          />
        </div>
      </div>

    );
  }
}

AlbumsPlayer.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  songObj: PropTypes.shape({}).isRequired,
  checked: PropTypes.bool.isRequired,
  artwork: PropTypes.string.isRequired,
};

export default AlbumsPlayer;
