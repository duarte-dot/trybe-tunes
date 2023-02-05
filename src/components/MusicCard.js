import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, removeSong } from '../services/favoriteSongsAPI';

class MusicCard extends Component {
  state = {
    isLoading: false,
    isFavorite: false,
  };

  componentDidMount() {
    const { checked } = this.props;
    if (checked) {
      this.setState({ isFavorite: true });
    }
  }

  favSongCheck = async () => {
    const { isFavorite } = this.state;
    const { songObj } = this.props;
    if (isFavorite) {
      this.setState({ isFavorite: false, isLoading: true });
      await removeSong(songObj);
      this.setState({ isLoading: false });
    } else {
      this.setState({ isFavorite: true, isLoading: true });
      await addSong(songObj);
      this.setState({ isLoading: false });
    }
  };

  render() {
    const { trackId, trackName, previewUrl } = this.props;
    const { isFavorite, isLoading } = this.state;
    if (isLoading) {
      return <p style={ { marginTop: '40px', marginBottom: '80px' } }>loading...</p>;
    }
    return (
      <div>
        <div className="song-name">
          <p>{trackName}</p>
        </div>
        <div className="song" />
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
          <label htmlFor="checkb" className="heart-checkbox">
            <input
              data-testid={ `checkbox-music-${trackId}` }
              type="checkbox"
              name="checkb"
              id="checkb"
              checked={ isFavorite }
              onChange={ this.favSongCheck }
            />
          </label>
        </div>
      </div>

    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  songObj: PropTypes.shape({}).isRequired,
  checked: PropTypes.bool.isRequired,
};

export default MusicCard;
