import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      user: '',
    };
  }

  componentDidMount() {
    this.getName();
  }

  async getName() {
    this.setState({ loading: true });
    const user = await getUser();
    this.setState({ loading: false, user: user.name });
  }

  render() {
    const { loading, user } = this.state;
    return (
      <header data-testid="header-component">
        <section
          style={ {
            display: 'flex',
            justifyContent: 'space-between',
            backgroundColor: '#EFF3F9',
            padding: '15px' } }
        >
          <h1>TrybeTunes</h1>
          <div style={ { display: 'flex', alignItems: 'center' } }>
            <span data-testid="header-user-name">
              {
                loading ? <Loading /> : user
              }
            </span>
          </div>
        </section>
        <section
          style={ {
            display: 'flex',
            justifyContent: 'space-around',
            backgroundColor: '#9D5C63',
            marginBottom: '5px',
            alignItems: 'center',
          } }
        >
          <Link
            style={ {
              color: 'black' } }
            to="/search"
            data-testid="link-to-search"
          >
            search
          </Link>
          <Link
            style={ {
              color: 'black' } }
            to="/favorites"
            data-testid="link-to-favorites"
          >
            favorites
          </Link>
          <Link
            style={ {
              color: 'black' } }
            to="/profile"
            data-testid="link-to-profile"
          >
            profile
          </Link>
        </section>
      </header>
    );
  }
}

export default Header;
