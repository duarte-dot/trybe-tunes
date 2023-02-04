import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { UilSearch, UilUser, UilFavorite } from '@iconscout/react-unicons';
import { getUser } from '../services/userAPI';
import './header.css';

class Header extends Component {
  constructor() {
    super();

    this.state = {
      loading: true,
      user: '',
      image: '',
    };
  }

  componentDidMount() {
    this.getName();
  }

  async getName() {
    this.setState({ loading: true });
    const user = await getUser();
    this.setState({ loading: false, user: user.name, image: user.image });
  }

  render() {
    const { loading, user, image } = this.state;
    return (
      <header data-testid="header-component" className="sidebar">
        <section>
          <Link to="/search"><h1>TrybeTunes</h1></Link>
          <img className="image-profile-header" src={ image !== '' ? image : 'https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg' } alt="profile" />
          <h4 data-testid="header-user-name">
            {
              loading ? <p className="name-user-header">loading...</p>
                : <p className="name-user-header">{user}</p>
            }
          </h4>
        </section>
        <section className="links">
          <Link
            className="link-"
            to="/search"
            data-testid="link-to-search"
          >
            <UilSearch className="search-icon" />
            search
          </Link>
          <Link
            className="link-"
            to="/favorites"
            data-testid="link-to-favorites"
          >
            <UilFavorite className="favorite-icon" />
            favorites
          </Link>
          <Link
            className="link-"
            to="/profile"
            data-testid="link-to-profile"
          >
            <UilUser className="profile-icon" />
            profile
          </Link>
        </section>
      </header>
    );
  }
}

export default Header;
