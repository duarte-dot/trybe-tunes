import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { UilSearch, UilUser, UilFavorite } from '@iconscout/react-unicons';
import { getUser } from '../services/userAPI';

const menuItems = [
  {
    path: '/search',
    name: 'Search',
    icon: <UilSearch />,
  },
  {
    path: '/profile',
    name: 'Profile',
    icon: <UilUser />,
  },
  {
    path: '/favorites',
    name: 'Favorites',
    icon: <UilFavorite />,
  },
];

class Sidebar extends Component {
  state = {
    user: '',
    image: '',
  };

  componentDidMount() {
    this.getUserName();
  }

  async getUserName() {
    const user = await getUser();

    this.setState({ user: user.name, image: user.image });
  }

  render() {
    const { user, image } = this.state;

    return (
      <nav className="sidebar">
        <h1 className="sidebar-logo">TrybeTunes</h1>

        <section className="links">
          {
            menuItems.map((item, index) => (
              <div key={ index } className="link">
                <Link to={ item.path }>
                  <div className="icon">{item.icon}</div>
                  <div className="link-text">{item.name}</div>
                </Link>
              </div>
            ))
          }
        </section>

        <section className="nav-user-info">
          <img
            className="nav-user-profile-image"
            width="80px"
            src={ image || 'https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg' }
            alt="profile"
          />
          <p className="username-nav">{user || '...'}</p>
        </section>
      </nav>
    );
  }
}

export default Sidebar;
