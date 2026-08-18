import React, { Component } from 'react';
import {
  UilExclamationTriangle,
  UilMusicNote,
  UilSearch,
} from '@iconscout/react-unicons';
import Layout from '../components/Layout';
import AlbumCard from '../components/AlbumCard';
import AlbumSkeleton from '../components/AlbumSkeleton';
import EmptyState from '../components/EmptyState';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import '../styles/search.css';

const MIN_QUERY_LENGTH = 2;
const SKELETON_COUNT = 10;
const ICON_SIZE = 28;
const ICON_SIZE_SM = 18;
const SKELETONS = Array.from({ length: SKELETON_COUNT }, (_, index) => index);

const CACHE_KEY = 'trybetunes:last_search';

const STATUS = {
  idle: 'idle',
  loading: 'loading',
  done: 'done',
  error: 'error',
};

class Search extends Component {
  constructor() {
    super();

    this.state = {
      albums: [],
      query: '',
      searchedFor: '',
      status: STATUS.idle,
    };
  }

  componentDidMount() {
    this.restoreLastSearch();
  }

  onQueryChange = ({ target }) => this.setState({ query: target.value });

  onSubmit = async (event) => {
    event.preventDefault();

    const { query } = this.state;
    const term = query.trim();

    if (term.length < MIN_QUERY_LENGTH) return;

    this.setState({ searchedFor: term, status: STATUS.loading });

    try {
      const albums = await searchAlbumsAPI(term);

      this.setState({ albums, status: STATUS.done });
      sessionStorage.setItem(CACHE_KEY, JSON.stringify({ albums, term }));
    } catch (error) {
      this.setState({ status: STATUS.error });
    }
  };

  /** Keeps the last results when the user comes back from an album page. */
  restoreLastSearch = () => {
    try {
      const cached = JSON.parse(sessionStorage.getItem(CACHE_KEY));

      if (!cached) return;

      this.setState({
        albums: cached.albums,
        query: cached.term,
        searchedFor: cached.term,
        status: STATUS.done,
      });
    } catch (error) {
      sessionStorage.removeItem(CACHE_KEY);
    }
  };

  renderForm() {
    const { query, status } = this.state;
    const isDisabled = query.trim().length < MIN_QUERY_LENGTH
      || status === STATUS.loading;

    return (
      <form className="search-form" onSubmit={ this.onSubmit }>
        <div className="search-field">
          <UilSearch size={ ICON_SIZE_SM } />
          <input
            id="artist"
            className="search-field__input"
            type="search"
            name="artist"
            aria-label="Artist or band name"
            placeholder="Artist or band name"
            value={ query }
            onChange={ this.onQueryChange }
          />
        </div>
        <button type="submit" className="btn btn--primary" disabled={ isDisabled }>
          Search
        </button>
      </form>
    );
  }

  renderResults() {
    const { albums, status } = this.state;

    if (status === STATUS.loading) {
      return (
        <div className="album-grid">
          {SKELETONS.map((item) => <AlbumSkeleton key={ item } />)}
        </div>
      );
    }

    if (status === STATUS.error) {
      return (
        <EmptyState
          icon={ <UilExclamationTriangle size={ ICON_SIZE } /> }
          title="Something went wrong"
          description="We could not reach the iTunes API. Please try again."
        />
      );
    }

    if (status === STATUS.idle) {
      return (
        <EmptyState
          icon={ <UilMusicNote size={ ICON_SIZE } /> }
          title="What do you want to listen to?"
          description="Type an artist or band name above to browse their albums."
        />
      );
    }

    return albums.length === 0 ? this.renderNotFound() : this.renderAlbums();
  }

  renderNotFound() {
    const { searchedFor } = this.state;

    return (
      <EmptyState
        icon={ <UilSearch size={ ICON_SIZE } /> }
        title={ `No albums found for "${searchedFor}"` }
        description="Check the spelling or try another artist."
      />
    );
  }

  renderAlbums() {
    const { albums, searchedFor } = this.state;
    const count = albums.length === 1
      ? '1 album found for '
      : `${albums.length} albums found for `;

    return (
      <>
        <p className="search-results__count">
          {count}
          <strong>{searchedFor}</strong>
        </p>
        <div className="album-grid">
          {albums.map((album) => (
            <AlbumCard key={ album.collectionId } album={ album } />
          ))}
        </div>
      </>
    );
  }

  render() {
    return (
      <Layout title="Search" subtitle="Find albums from any artist or band">
        {this.renderForm()}
        {this.renderResults()}
      </Layout>
    );
  }
}

export default Search;
