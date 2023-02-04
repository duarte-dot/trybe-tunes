import React, { Component } from 'react';
import CardAlbum from '../components/CardAlbum';
import Header from '../components/Header';
import Loading from '../components/Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import './search.css';

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

  // componentDidMount() {
  //   this.setState({
  //     isLoading: false,
  //   });
  // }

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
          <Loading />
        </div>
      );
    } if (requestSucc) {
      return (
        <div data-testid="page-search" className="page-search">
          <Header />
          <div className="main-content-search">
            <h2 className="section-name">Search</h2>
            <div className="testee">
              <form className="form-search">
                <input
                  className="input-artist-after"
                  type="text"
                  id="artist"
                  name="artist"
                  value={ Artist }
                  data-testid="search-artist-input"
                  onChange={ this.onInputChange }
                />
                <button
                  className="button-search"
                  type="submit"
                  disabled={ isLoginButtonDisabled }
                  data-testid="search-artist-button"
                  onClick={ this.onButtonClick }
                >
                  Search
                </button>
              </form>
            </div>
            <h3 className="results-text">
              {artistName}
              {' '}
              album results
            </h3>
            <div className="albums">
              {requestR.length === 0 ? <h1>no album was found</h1>
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
          </div>
        </div>
      );
    } return (
      <div data-testid="page-search" className="page-search">
        <Header />
        <div className="main-content-search">
          <h2 className="section-name">Search</h2>
          <div className="testee">
            <form className="form-search">
              <input
                className="input-artist"
                placeholder="insert artist/band"
                type="text"
                id="artist"
                name="artist"
                value={ Artist }
                data-testid="search-artist-input"
                onChange={ this.onInputChange }
              />
              <button
                type="submit"
                disabled={ isLoginButtonDisabled }
                data-testid="search-artist-button"
                onClick={ this.onButtonClick }
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
