import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../pages/profile.css';

class CardProfile extends Component {
  render() {
    const { name, email, image, description } = this.props;
    return (
      <div>
        <p className="name-user">{name || 'seu nome'}</p>
        <p className="email-user">{ email || 'email@email.com'}</p>
        <img data-testid="profile-image" alt="profile" src={ image || 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png' } />
        <p>{description || 'descrição'}</p>
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
