import React, { Component } from 'react';
import PropTypes from 'prop-types';

class CardProfile extends Component {
  render() {
    const { name, email, image, description } = this.props;
    return (
      <div>
        <h4>Name:</h4>
        <p>{name}</p>
        <h4>E-mail:</h4>
        <p>{email}</p>
        <h4>Image:</h4>
        <img data-testid="profile-image" alt="profile" src={ image } />
        <h4>Description:</h4>
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
