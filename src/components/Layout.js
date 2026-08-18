import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PageHeader from './PageHeader';
import Sidebar from './Sidebar';
import '../styles/layout.css';

const ESCAPE_KEY = 'Escape';
const BODY_LOCK_CLASS = 'is-menu-open';
const NOT_FOCUSABLE = -1;

/** Application shell: responsive sidebar + sticky page header + content area. */
class Layout extends Component {
  constructor() {
    super();

    this.state = { isMenuOpen: false };
  }

  componentDidMount() {
    document.addEventListener('keydown', this.onKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.onKeyDown);
    document.body.classList.remove(BODY_LOCK_CLASS);
  }

  onKeyDown = ({ key }) => {
    const { isMenuOpen } = this.state;

    if (key === ESCAPE_KEY && isMenuOpen) this.closeMenu();
  };

  setMenu = (isMenuOpen) => {
    document.body.classList.toggle(BODY_LOCK_CLASS, isMenuOpen);
    this.setState({ isMenuOpen });
  };

  openMenu = () => this.setMenu(true);

  closeMenu = () => this.setMenu(false);

  render() {
    const { actions, children, subtitle, title } = this.props;
    const { isMenuOpen } = this.state;

    return (
      <div className="app-shell">
        <Sidebar isOpen={ isMenuOpen } onNavigate={ this.closeMenu } />

        <button
          type="button"
          aria-label="close menu"
          className={ `app-overlay${isMenuOpen ? ' is-visible' : ''}` }
          tabIndex={ isMenuOpen ? 0 : NOT_FOCUSABLE }
          onClick={ this.closeMenu }
        />

        <main className="app-main">
          <PageHeader
            title={ title }
            subtitle={ subtitle }
            actions={ actions }
            onMenuClick={ this.openMenu }
          />
          <div className="page-body">{children}</div>
        </main>
      </div>
    );
  }
}

Layout.propTypes = {
  actions: PropTypes.node,
  children: PropTypes.node.isRequired,
  subtitle: PropTypes.string,
  title: PropTypes.string.isRequired,
};

Layout.defaultProps = {
  actions: null,
  subtitle: '',
};

export default Layout;
