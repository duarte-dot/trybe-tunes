import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FALLBACK_AVATAR } from './UserBadge';
import '../styles/profile.css';

class ProfileCard extends Component {
  render() {
    const { description, email, image, name } = this.props;

    return (
      <article className="profile-card">
        <div className="profile-card__cover" aria-hidden="true" />

        <img
          className="profile-card__avatar"
          src={ image || FALLBACK_AVATAR }
          alt={ `${name || 'user'} avatar` }
        />

        <h2 className="profile-card__name">{name || 'your name'}</h2>
        <p className="profile-card__email">{email || 'add your e-mail'}</p>

        <p className="profile-card__bio">
          {description || 'tell the world what kind of music you love.'}
        </p>
      </article>
    );
  }
}

ProfileCard.propTypes = {
  description: PropTypes.string,
  email: PropTypes.string,
  image: PropTypes.string,
  name: PropTypes.string,
};

ProfileCard.defaultProps = {
  description: '',
  email: '',
  image: '',
  name: '',
};

export default ProfileCard;
