import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, removeSong } from '../services/favoriteSongsAPI';

class MusicCardWithGetSongs extends Component {
  state = {
    isLoading: false,
    isFavorite: true,
  };

  componentDidMount() {
    const { checked } = this.props;
    if (checked) {
      this.setState({ isFavorite: true });
    }
  }

  favSongCheck = async () => {
    const { isFavorite } = this.state;
    const { songObj, getSongs } = this.props;
    if (isFavorite) {
      this.setState({ isFavorite: false, isLoading: true });
      await removeSong(songObj);
      this.setState({ isLoading: false, isFavorite: true });
      await getSongs();
    } else {
      this.setState({ isFavorite: true, isLoading: true });
      await addSong(songObj);
      this.setState({ isLoading: false });
      await getSongs();
    }
    // await getSongs();
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
          <audio data-testid="audio-component" src={ previewUrl } controls>
            <track kind="captions" />
            O seu navegador não suporta o elemento
            {' '}
            <code>audio</code>
          </audio>
          <input
            data-testid={ `checkbox-music-${trackId}` }
            type="checkbox"
            name="checkb"
            id="checkb"
            checked={ isFavorite }
            onChange={ this.favSongCheck }
          />
        </div>
      </div>
    );
  }
}

MusicCardWithGetSongs.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  songObj: PropTypes.shape({}).isRequired,
  checked: PropTypes.bool.isRequired,
  getSongs: PropTypes.func.isRequired,
};

export default MusicCardWithGetSongs;
