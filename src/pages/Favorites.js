import React, { Component } from 'react';
import Header from '../components/Header';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from '../components/Loading';
import MusicCardWithGetSongs from '../components/MusicCardWithGetSongs';
import './favorites.css';

class Favorites extends Component {
  constructor() {
    super();

    this.state = {
      isLoading: false,
      favoriteSongs: [],
      // isFavorite: true,
    };
  }

  componentDidMount() {
    this.getSongs();
  }

  // componentDidUpdate() {
  //   this.getSongs();
  // }

  getSongs = async () => {
    this.setState({ isLoading: true });
    const favoriteSongs = await getFavoriteSongs();
    this.setState({
      favoriteSongs,
      isLoading: false,
    });
  };

  render() {
    const { favoriteSongs, isLoading } = this.state;
    if (isLoading === true) {
      return (
        <div data-testid="page-album" className="page-album">
          <Header />
          <div className="main-content-album">
            <Loading />
          </div>
        </div>
      );
    } return (
      <div data-testid="page-album" className="page-album">
        <Header />
        <div className="main-content-album">
          <div className="section-favorites-name">
            <h2 className="section-name">Favorites</h2>
          </div>
          <div className="favorite-songs">
            {favoriteSongs.map((song, index) => (
              <MusicCardWithGetSongs
                trackName={ song.trackName }
                previewUrl={ song.previewUrl }
                trackId={ song.trackId }
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
