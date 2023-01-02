import React, { Component } from 'react';
import Header from '../components/Header';

class Search extends Component {
  constructor() {
    super();

    this.state = {
      isLoginButtonDisabled: true,
    };
  }

  onInputChange = ({ target }) => {
    const { value } = target;
    this.setState({
      Artist: value,
    }, () => {
      this.buttonDisabled();
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
    const { isLoginButtonDisabled } = this.state;
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
              data-testid="search-artist-input"
              onChange={ this.onInputChange }
            />
          </label>
          <button
            type="submit"
            disabled={ isLoginButtonDisabled }
            data-testid="search-artist-button"
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}

export default Search;
