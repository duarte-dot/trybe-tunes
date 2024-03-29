import React, { Component } from 'react';
import Sidebar from '../components/Sidebar';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from '../components/Loading';
import FavoritesPlayer from '../components/FavoritesPlayer';
import '../styles/favorites.css';

class Favorites extends Component {
  constructor() {
    super();

    this.state = {
      isLoading: false,
      favoriteSongs: [],
    };
  }

  componentDidMount() {
    this.getSongs();
  }

  getSongs = async () => {
    this.setState({ isLoading: true });
    const favoriteSongs = await getFavoriteSongs();
    this.setState({ favoriteSongs, isLoading: false });
  };

  render() {
    const { favoriteSongs, isLoading } = this.state;

    if (isLoading) {
      return (
        <div className="page-album">
          <Sidebar />
          <div className="page-loading-favorites">
            <Loading />
          </div>
        </div>
      );
    } return (
      <div className="page-album">
        <Sidebar />

        <div className="main-content-album">
          <h1 className="favorites-section-name">Favorites</h1>
          <div className="favorite-songs">
            {favoriteSongs.map((song, index) => (
              <FavoritesPlayer
                trackName={ song.trackName }
                previewUrl={ song.previewUrl }
                trackId={ song.trackId }
                artwork={ song.artworkUrl100 }
                songObj={ song }
                checked
                key={ index }
                getSongs={ this.getSongs }
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default Favorites;
