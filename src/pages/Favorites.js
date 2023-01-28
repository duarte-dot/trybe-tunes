import React, { Component } from 'react';
import Header from '../components/Header';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import MusicCard from '../components/MusicCard';
import Loading from '../components/Loading';

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
    console.log('getsongs');
  };

  render() {
    const { favoriteSongs, isLoading } = this.state;
    if (isLoading === true) {
      return (
        <Loading />
      );
    } return (
      <div data-testid="page-favorites">
        <Header />
        <h2>Favorites</h2>
        {favoriteSongs.map((song, index) => (
          <MusicCard
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
    );
  }
}

export default Favorites;
