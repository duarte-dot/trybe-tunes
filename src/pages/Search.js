import React, { Component } from 'react';
import CardAlbum from '../components/CardAlbum';
import Header from '../components/Header';
import Loading from '../components/Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends Component {
  constructor() {
    super();

    this.state = {
      Artist: '',
      isLoginButtonDisabled: true,
      isLoading: false,
      artistName: '',
      requestSucc: false,
      requestR: {},
    };

    this.onButtonClick = this.onButtonClick.bind(this);
  }

  onInputChange = ({ target }) => {
    const { value } = target;
    this.setState({
      Artist: value,
    }, () => {
      this.buttonDisabled();
    });
  };

  onButtonClick = async () => {
    this.setState({ isLoading: true });
    const { Artist } = this.state;
    const request = await searchAlbumsAPI(Artist);
    this.setState({
      isLoading: false,
      artistName: Artist,
      Artist: '',
      requestSucc: true,
      requestR: request,
    });
  };

  buttonDisabled() {
    const { Artist } = this.state;
    const artistValidation = Artist.length >= 2;

    if (artistValidation) {
      this.setState({
        isLoginButtonDisabled: false,
      });
    } else {
      this.setState({
        isLoginButtonDisabled: true,
      });
    }
  }

  render() {
    const { isLoginButtonDisabled, isLoading, Artist, artistName, requestSucc,
      requestR } = this.state;

    if (isLoading) {
      return (
        <div data-testid="page-search">
          <Header />
          <Loading />
        </div>
      );
    }

    if (requestSucc) {
      return (
        <div data-testid="page-search">
          <Header />
          <h2>Search</h2>
          <form>
            <label htmlFor="artist">
              Artist:
              <input
                type="text"
                id="artist"
                name="artist"
                value={ Artist }
                data-testid="search-artist-input"
                onChange={ this.onInputChange }
              />
            </label>
            <button
              type="submit"
              disabled={ isLoginButtonDisabled }
              data-testid="search-artist-button"
              onClick={ this.onButtonClick }
            >
              Pesquisar
            </button>
          </form>
          <h3>
            Resultado de álbuns de:
            {' '}
            {artistName}
          </h3>

          {requestR.length === 0 ? <h1>Nenhum álbum foi encontrado</h1>
            : requestR.map((album, index) => (
              <CardAlbum
                imgUrl={ album.artworkUrl100 }
                artistName={ album.artistName }
                collectionName={ album.collectionName }
                collectionId={ album.collectionId }
                key={ index }
              />
            ))}
        </div>
      );
    }

    return (
      <div data-testid="page-search">
        <Header />
        <h2>Search</h2>
        <form>
          <label htmlFor="artist">
            Artist:
            <input
              type="text"
              id="artist"
              name="artist"
              value={ Artist }
              data-testid="search-artist-input"
              onChange={ this.onInputChange }
            />
          </label>
          <button
            type="submit"
            disabled={ isLoginButtonDisabled }
            data-testid="search-artist-button"
            onClick={ this.onButtonClick }
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}

export default Search;
