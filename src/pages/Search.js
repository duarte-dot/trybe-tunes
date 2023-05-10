import React, { Component } from 'react';
import AlbumCard from '../components/AlbumCard';
import Sidebar from '../components/Sidebar';
import Loading from '../components/Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends Component {
  constructor() {
    super();

    this.state = {
      artist: '',
      isLoading: false,
      request: {},
      requestDone: false,
    };
  }

  onArtistInputChange = (event) => {
    this.setState({ artist: event.target.value });
  };

  onSearchButtonClick = async () => {
    this.setState({ isLoading: true });

    const { artist } = this.state;

    const request = await searchAlbumsAPI(artist);

    this.setState({
      isLoading: false,
      request,
      requestDone: true,
    });
  };

  render() {
    const { isLoading, request, requestDone, artist } = this.state;
    const isLoginButtonDisabled = artist.length < 2;

    if (isLoading) {
      return (
        <div className="page-search">
          <Sidebar />
          <div className="main-content-search">
            <h1 className="section-name">Search</h1>
            <Loading />
          </div>
        </div>
      );
    } if (requestDone) {
      return (
        <div className="page-search">
          <Sidebar />
          <div className="main-content-search">
            <h1 className="section-name">Search</h1>

            <div className="form-div">
              <form className="form-search">
                <input
                  className="input-artist-after"
                  placeholder="insert artist/band"
                  type="text"
                  value={ artist }
                  onChange={ this.onArtistInputChange }
                />
                <button
                  className="button-search"
                  type="submit"
                  disabled={ isLoginButtonDisabled }
                  onClick={ this.onSearchButtonClick }
                >
                  Search
                </button>
              </form>
            </div>

            <div className="results-text-div">
              <h3 className="results-text">
                {artist}
                {' '}
                album results
              </h3>
            </div>

            <div className="albums">
              {request.length === 0 ? <h1>no album was found</h1>
                : request.map((album, index) => (
                  <AlbumCard
                    imgUrl={ album.artworkUrl100 }
                    artistName={ album.artistName }
                    collectionName={ album.collectionName }
                    collectionId={ album.collectionId }
                    key={ index }
                  />
                ))}
            </div>

          </div>
        </div>
      );
    } return (
      <div className="page-search">
        <Sidebar />
        <div className="main-content-search">
          <h1 className="section-name">Search</h1>
          <div>
            <form className="form-search">
              <input
                className="input-artist"
                placeholder="insert artist/band"
                type="text"
                id="artist"
                name="artist"
                value={ artist }
                onChange={ this.onArtistInputChange }
              />
              <button
                type="submit"
                disabled={ isLoginButtonDisabled }
                onClick={ this.onSearchButtonClick }
              >
                Search
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Search;
