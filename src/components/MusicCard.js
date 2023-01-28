import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, removeSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

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
    const { songObj, getSongs } = this.props;
    if (isFavorite) {
      this.setState({ isFavorite: false, isLoading: true });
      await removeSong(songObj);
      this.setState({ isLoading: false });
      await getSongs();
    } else {
      this.setState({ isFavorite: true, isLoading: true });
      await addSong(songObj);
      this.setState({ isLoading: false });
      await getSongs();
    }
  };

  render() {
    const { trackId, trackName, previewUrl } = this.props;
    const { isFavorite, isLoading } = this.state;
    if (isLoading) {
      return <Loading />;
    }
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
        <label htmlFor="checkb">
          Favorita
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
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  songObj: PropTypes.shape({}).isRequired,
  checked: PropTypes.bool.isRequired,
  getSongs: PropTypes.func.isRequired,
};

export default MusicCard;
