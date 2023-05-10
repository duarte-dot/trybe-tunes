import React, { Component } from 'react';
import PropTypes from 'prop-types';

class CardProfile extends Component {
  render() {
    const { name, email, image, description } = this.props;
    return (
      <div className="infos-user">
        <h1 className="name-user">{name || 'seu nome'}</h1>
        <p className="email-user">{ email || 'email@email.com'}</p>
        <img data-testid="profile-image" className="image-profile" alt="profile" src={ image || 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png' } />
        <div className="description-box">
          <p className="description-user">{description || <p>descrição</p>}</p>
        </div>
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
