import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { UilExclamationTriangle } from '@iconscout/react-unicons';
import Layout from '../components/Layout';
import Loading from '../components/Loading';
import EmptyState from '../components/EmptyState';
import TrackRow from '../components/TrackRow';
import getMusics from '../services/musicsAPI';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import { artworkOf, formatYear } from '../utils/format';
import '../styles/album.css';

const COVER_SIZE = 400;
const ICON_SIZE = 28;
const ALBUM_TITLE = 'Album';

class Album extends Component {
  constructor() {
    super();

    this.state = {
      album: null,
      favoriteIds: [],
      hasError: false,
      isLoading: true,
      tracks: [],
    };
  }

  componentDidMount() {
    this.loadAlbum();
  }

  loadAlbum = async () => {
    const { match: { params } } = this.props;

    try {
      const [results, favorites] = await Promise.all([
        getMusics(params.id),
        getFavoriteSongs(),
      ]);
      const [album, ...songs] = results;

      this.setState({
        album,
        favoriteIds: favorites.map((song) => song.trackId),
        hasError: !album,
        isLoading: false,
        tracks: songs.filter((song) => song.previewUrl),
      });
    } catch (error) {
      this.setState({ hasError: true, isLoading: false });
    }
  };

  toggleFavorite = async (song) => {
    const { favoriteIds } = this.state;
    const isFavorite = favoriteIds.includes(song.trackId);

    this.setState((prev) => ({
      favoriteIds: isFavorite
        ? prev.favoriteIds.filter((id) => id !== song.trackId)
        : [...prev.favoriteIds, song.trackId],
    }));

    await (isFavorite ? removeSong(song) : addSong(song));
  };

  renderHeader() {
    const { album, tracks } = this.state;
    const meta = [
      album.primaryGenreName,
      formatYear(album.releaseDate),
      `${tracks.length} previews`,
    ].filter(Boolean).join(' • ');

    return (
      <header className="album-head">
        <img
          className="album-head__art"
          src={ artworkOf(album.artworkUrl100, COVER_SIZE) }
          alt={ `${album.collectionName} cover` }
        />
        <div className="album-head__info">
          <p className="album-head__kind">Album</p>
          <h2 className="album-head__title">{album.collectionName}</h2>
          <p className="album-head__artist">{album.artistName}</p>
          <p className="album-head__meta">{meta}</p>
        </div>
      </header>
    );
  }

  renderTracks() {
    const { favoriteIds, tracks } = this.state;

    if (tracks.length === 0) {
      return <EmptyState title="This album has no previews available" />;
    }

    return (
      <ul className="track-list">
        {tracks.map((track, index) => (
          <TrackRow
            key={ track.trackId }
            track={ track }
            position={ index + 1 }
            isFavorite={ favoriteIds.includes(track.trackId) }
            onToggleFavorite={ () => this.toggleFavorite(track) }
          />
        ))}
      </ul>
    );
  }

  renderError() {
    const backLink = (
      <Link to="/search" className="btn btn--primary">Back to search</Link>
    );

    return (
      <Layout title={ ALBUM_TITLE }>
        <EmptyState
          icon={ <UilExclamationTriangle size={ ICON_SIZE } /> }
          title="We could not load this album"
          description="The album may not exist or the iTunes API is unavailable."
          action={ backLink }
        />
      </Layout>
    );
  }

  render() {
    const { album, hasError, isLoading } = this.state;

    if (isLoading) {
      return <Layout title={ ALBUM_TITLE }><Loading /></Layout>;
    }

    if (hasError) return this.renderError();

    return (
      <Layout
        title={ ALBUM_TITLE }
        subtitle={ album.artistName }
        actions={ <Link to="/search" className="btn btn--ghost">Search</Link> }
      >
        <section className="album-page" data-testid="page-album">
          {this.renderHeader()}
          {this.renderTracks()}
        </section>
      </Layout>
    );
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
