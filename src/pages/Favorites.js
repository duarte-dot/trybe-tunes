import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { UilFavorite } from '@iconscout/react-unicons';
import Layout from '../components/Layout';
import Loading from '../components/Loading';
import EmptyState from '../components/EmptyState';
import TrackRow from '../components/TrackRow';
import { getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

const ICON_SIZE = 28;
const PAGE_TITLE = 'Favorites';

class Favorites extends Component {
  constructor() {
    super();

    this.state = { favorites: [], isLoading: true };
  }

  componentDidMount() {
    this.loadFavorites();
  }

  loadFavorites = async () => {
    const favorites = await getFavoriteSongs();
    this.setState({ favorites, isLoading: false });
  };

  removeFavorite = async (song) => {
    this.setState((prev) => ({
      favorites: prev.favorites.filter(({ trackId }) => trackId !== song.trackId),
    }));

    await removeSong(song);
  };

  renderList() {
    const { favorites } = this.state;

    if (favorites.length === 0) {
      return (
        <EmptyState
          icon={ <UilFavorite size={ ICON_SIZE } /> }
          title="No favorites yet"
          description="Tap the heart on any song and it will show up here."
          action={ <Link to="/search" className="btn btn--primary">Find songs</Link> }
        />
      );
    }

    return (
      <ul className="track-list">
        {favorites.map((track, index) => (
          <TrackRow
            key={ track.trackId }
            track={ track }
            position={ index + 1 }
            isFavorite
            onToggleFavorite={ () => this.removeFavorite(track) }
          />
        ))}
      </ul>
    );
  }

  render() {
    const { favorites, isLoading } = this.state;

    if (isLoading) {
      return <Layout title={ PAGE_TITLE }><Loading /></Layout>;
    }

    const subtitle = favorites.length === 1
      ? '1 song saved'
      : `${favorites.length} songs saved`;

    return (
      <Layout title={ PAGE_TITLE } subtitle={ subtitle }>
        {this.renderList()}
      </Layout>
    );
  }
}

export default Favorites;
