import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { UilHeart } from '@iconscout/react-unicons';
import '../styles/favoriteButton.css';

const ICON_SIZE = 19;

class FavoriteButton extends Component {
  constructor() {
    super();

    this.state = { isPending: false };
    this.isActive = false;
  }

  componentDidMount() {
    this.isActive = true;
  }

  componentWillUnmount() {
    this.isActive = false;
  }

  onClick = async () => {
    const { onToggle } = this.props;

    this.setState({ isPending: true });
    await onToggle();

    if (this.isActive) this.setState({ isPending: false });
  };

  render() {
    const { isFavorite, trackName } = this.props;
    const { isPending } = this.state;
    const action = isFavorite ? 'remove from' : 'add to';

    return (
      <button
        type="button"
        className={ `fav-btn${isFavorite ? ' is-active' : ''}` }
        aria-pressed={ isFavorite }
        aria-label={ `${action} favorites: ${trackName}` }
        title={ `${action} favorites` }
        disabled={ isPending }
        onClick={ this.onClick }
      >
        <UilHeart size={ ICON_SIZE } />
      </button>
    );
  }
}

FavoriteButton.propTypes = {
  isFavorite: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
  trackName: PropTypes.string.isRequired,
};

export default FavoriteButton;
