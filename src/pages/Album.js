import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Sidebar from '../components/Sidebar';
import Loading from '../components/Loading';
import AlbumsPlayer from '../components/AlbumsPlayer';
import getMusics from '../services/musicsAPI';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Album extends Component {
  constructor() {
    super();

    this.state = {
      requestR: [],
      isLoading: false,
      favoriteSongs: [],
    };
  }

  componentDidMount() {
    this.getMusics();
  }

  getMusics = async () => {
    this.setState({ isLoading: true });

    const { match: { params } } = this.props;
    const request = await getMusics(params.id);
    const requestFav = await getFavoriteSongs();

    this.setState({ requestR: request, isLoading: false, favoriteSongs: requestFav });
  };

  render() {
    const { requestR, isLoading } = this.state;

    if (isLoading) {
      return (
        <div className="page-album">
          <Sidebar />
          <div className="main-content-album-loading">
            <Loading />
          </div>
        </div>
      );
    }

    if (requestR.length >= 1) {
      const { favoriteSongs } = this.state;
      return (
        <section data-testid="page-album" className="page-album">
          <Sidebar />
          <div className="main-content-album">
            <div className="album-info">
              <img
                className="image_album"
                width="100px"
                src={ requestR[0].artworkUrl60 }
                alt="album"
              />
              <h1 className="album_artist_names">
                {requestR[0].artistName}
                <span className="span_album_artist">|</span>
                {requestR[0].collectionName}
              </h1>
            </div>
            <div className="songs">
              {requestR.map((song, index) => {
                if (!song.trackName) {
                  return;
                }
                for (let i = 0; i < favoriteSongs.length; i += 1) {
                  if (favoriteSongs[i].trackId === song.trackId) {
                    return (<AlbumsPlayer
                      trackName={ song.trackName }
                      previewUrl={ song.previewUrl }
                      trackId={ song.trackId }
                      artwork={ song.artworkUrl100 }
                      songObj={ song }
                      checked
                      key={ index }
                    />);
                  }
                }
                return (<AlbumsPlayer
                  songObj={ song }
                  artwork={ song.artworkUrl100 }
                  trackName={ song.trackName }
                  previewUrl={ song.previewUrl }
                  key={ index }
                  checked={ false }
                />);
              })}
            </div>
          </div>
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
