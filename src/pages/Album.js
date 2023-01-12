import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Album extends Component {
  state = {
    requestR: [],
    isLoading: false,
    favoriteSongs: [],
  };

  componentDidMount() {
    this.getMusics();
  }

  getMusics = async () => {
    this.setState({ isLoading: true });
    const { match: { params } } = this.props;
    const request = await getMusics(params.id);
    const requestFav = await getFavoriteSongs();
    this.setState({ requestR: request,
      isLoading: false,
      favoriteSongs: requestFav });
  };

  render() {
    const { requestR, isLoading } = this.state;

    if (isLoading) {
      return (
        <div data-testid="page-album">
          <Header />
          <Loading />
        </div>
      );
    }

    if (requestR.length >= 1) {
      const { favoriteSongs } = this.state;
      return (
        <section data-testid="page-album">
          <Header />
          <div
            style={ {
              flexDirection: 'column',
              display: 'flex',
              alignItems: 'center',
              marginTop: '20px' } }
          >
            <img width="100px" src={ requestR[0].artworkUrl60 } alt="" />
            <h1
              style={ { marginBottom: '10px' } }
              data-testid="artist-name"
            >
              {requestR[0].artistName}
            </h1>
            <h3
              style={ {
                marginTop: '0px' } }
              data-testid="album-name"
            >
              {requestR[0].collectionName}
            </h3>
          </div>
          {requestR.map((song, index) => {
            if (!song.trackName) {
              return;
            }
            for (let i = 0; i < favoriteSongs.length; i += 1) {
              if (favoriteSongs[i].trackId === song.trackId) {
                return (<MusicCard
                  trackName={ song.trackName }
                  previewUrl={ song.previewUrl }
                  trackId={ song.trackId }
                  songObj={ song }
                  checked
                  key={ index }
                />);
              }
            }
            return (<MusicCard
              songObj={ song }
              trackName={ song.trackName }
              previewUrl={ song.previewUrl }
              trackId={ song.trackId }
              key={ index }
              checked={ false }
            />);
          })}
        </section>
      );
    }
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default Album;
