import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../styles/skeleton.css';

export const FALLBACK_AVATAR = 'https://github.com/duarte-dot/image-uploads/assets/78454964/7e303be4-12a7-414f-9aac-e83e8264cd14';

class UserBadge extends Component {
  render() {
    const { image, isLoading, name } = this.props;

    return (
      <div className="user-badge">
        <img
          className="user-badge__avatar"
          src={ image || FALLBACK_AVATAR }
          alt=""
        />
        <div className="user-badge__info">
          {isLoading
            ? <span className="skeleton user-badge__skeleton" />
            : <p className="user-badge__name">{name || 'guest'}</p>}
          <p className="user-badge__label">logged in</p>
        </div>
      </div>
    );
  }
}

UserBadge.propTypes = {
  image: PropTypes.string,
  isLoading: PropTypes.bool,
  name: PropTypes.string,
};

UserBadge.defaultProps = {
  image: '',
  isLoading: false,
  name: '',
};

export default UserBadge;
