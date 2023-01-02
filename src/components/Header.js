import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';
// import Loading from './Loading';

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
        <h1>TrybeTunes</h1>
        <span data-testid="header-user-name">{loading ? <Loading /> : user}</span>
        <div>
          <Link to="/search" data-testid="link-to-search">search</Link>
          <Link to="/favorites" data-testid="link-to-favorites">favorites</Link>
          <Link to="/profile" data-testid="link-to-profile">profile</Link>
        </div>
      </header>
    );
  }
}

export default Header;
