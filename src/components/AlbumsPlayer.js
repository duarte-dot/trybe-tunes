import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, removeSong } from '../services/favoriteSongsAPI';

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
    const { trackName, previewUrl } = this.props;
    const { isFavorite, isLoading } = this.state;

    if (isLoading) {
      return <p style={ { marginTop: '40px', marginBottom: '80px' } }>loading...</p>;
    }

    return (
      <div>
        <div className="song-name">
          <p>{trackName}</p>
        </div>

        <div className="audio-and-checkbox">
          <audio
            data-testid="audio-component"
            src={ previewUrl }
            controls
          >
            <track kind="captions" />
            O seu navegador não suporta o elemento
            {' '}
            <code>audio</code>
          </audio>
          <input
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
};

export default AlbumsPlayer;
