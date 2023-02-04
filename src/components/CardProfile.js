import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../pages/profile.css';

class CardProfile extends Component {
  render() {
    const { name, email, image, description } = this.props;
    return (
      <div>
        <p className="name-user">{name}</p>
        <p className="email-user">{email}</p>
        <img data-testid="profile-image" alt="profile" src={ image } />
        <p>{description}</p>
      </div>
    );
  }
}

CardProfile.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
};

export default CardProfile;
