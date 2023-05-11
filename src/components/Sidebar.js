import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { UilSearch, UilBars, UilUser, UilFavorite } from '@iconscout/react-unicons';
import { getUser } from '../services/userAPI';
import '../styles/sidebar.css';

const menuItems = [
  {
    path: '/search',
    name: 'Search',
    icon: <UilSearch className="icon" />,
  },
  {
    path: '/profile',
    name: 'Profile',
    icon: <UilUser className="icon" />,
  },
  {
    path: '/favorites',
    name: 'Favorites',
    icon: <UilFavorite className="icon" />,
  },
];

class Sidebar extends Component {
  constructor() {
    super();

    this.state = {
      user: '',
      image: '',
      showingMenu: false,
    };

    this.toggleMenu = this.toggleMenu.bind(this);
  }

  componentDidMount() {
    this.getUserName();
  }

  async getUserName() {
    const user = await getUser();

    this.setState({ user: user.name, image: user.image });
  }

  toggleMenu() {
    const { showingMenu } = this.state;

    if (showingMenu) {
      this.setState({ showingMenu: false });
    } else this.setState({ showingMenu: true });
  }

  render() {
    const { user, image, showingMenu } = this.state;

    return (
      <div>
        <section className="nav-menu-and-user-info">
          <UilBars size={ 50 } className="toggle-menu" onClick={ this.toggleMenu } />
          <div className="userimage-username">
            <img
              className="nav-user-profile-image"
              width="60px"
              src={ image || 'https://github.com/duarte-dot/image-uploads/assets/78454964/7e303be4-12a7-414f-9aac-e83e8264cd14' }
              alt="profile"
            />
            <p className="nav-username">{user || '...'}</p>
          </div>
        </section>
        <nav className={ showingMenu ? 'sidebar showing' : 'sidebar' }>

          <section
            className="links"
            style={ { display: showingMenu ? 'block' : 'none' } }
          >
            {
              menuItems.map((item, index) => (
                <section key={ index }>
                  <Link className="link" to={ item.path } onClick={ this.toggleMenu }>
                    {item.icon}
                    <p className="link-text">{item.name}</p>
                  </Link>
                </section>
              ))
            }
          </section>
        </nav>
      </div>
    );
  }
}

export default Sidebar;
