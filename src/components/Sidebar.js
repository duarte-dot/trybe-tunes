import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
  UilFavorite,
  UilMultiply,
  UilSearch,
  UilSignout,
  UilUser,
} from '@iconscout/react-unicons';
import Brand from './Brand';
import SidebarLink from './SidebarLink';
import UserBadge from './UserBadge';
import { getUser } from '../services/userAPI';
import { clearSession } from '../utils/session';
import '../styles/sidebar.css';

const ICON_SIZE = 20;

const MENU_ITEMS = [
  { path: '/search', name: 'Search', icon: <UilSearch size={ ICON_SIZE } /> },
  { path: '/profile', name: 'Profile', icon: <UilUser size={ ICON_SIZE } /> },
  {
    path: '/favorites',
    name: 'Favorites',
    icon: <UilFavorite size={ ICON_SIZE } />,
  },
];

class Sidebar extends Component {
  constructor() {
    super();

    this.state = { isLoading: true, user: {} };
  }

  componentDidMount() {
    this.loadUser();
  }

  loadUser = async () => {
    const user = await getUser();
    this.setState({ isLoading: false, user });
  };

  render() {
    const { isOpen, onNavigate } = this.props;
    const { isLoading, user } = this.state;

    return (
      <aside
        aria-label="main navigation"
        className={ `sidebar${isOpen ? ' is-open' : ''}` }
      >
        <div className="side-top">
          <Brand />
          <button
            type="button"
            className="side-close"
            aria-label="close menu"
            onClick={ onNavigate }
          >
            <UilMultiply size={ ICON_SIZE } />
          </button>
        </div>

        <nav className="side-nav">
          {MENU_ITEMS.map((item) => (
            <SidebarLink
              key={ item.path }
              path={ item.path }
              name={ item.name }
              icon={ item.icon }
              onNavigate={ onNavigate }
            />
          ))}
        </nav>

        <div className="side-foot">
          <UserBadge
            name={ user.name }
            image={ user.image }
            isLoading={ isLoading }
          />
          <Link
            to="/"
            className="side-logout"
            title="log out"
            aria-label="log out"
            onClick={ clearSession }
          >
            <UilSignout size={ ICON_SIZE } />
          </Link>
        </div>
      </aside>
    );
  }
}

Sidebar.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onNavigate: PropTypes.func.isRequired,
};

export default Sidebar;
