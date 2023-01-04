import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class CardAlbum extends Component {
  render() {
    const { artistName, collectionName, collectionId, imgUrl } = this.props;
    return (
      <div
        style={ {
          width:
          '350px',
          display: 'flex',
          backgroundColor: '#9D5C63',
          margin: '2px',
          padding: '10px',
        } }
      >
        <Link
          to={ `/album/${collectionId}` }
          data-testid={ `link-to-album-${collectionId}` }
        >
          <img
            src={ imgUrl }
            alt={ artistName }
          />
          <p style={ { color: 'black' } }>{artistName}</p>
          <h2 style={ { color: 'white' } }>{collectionName}</h2>
        </Link>

      </div>
    );
  }
}

CardAlbum.propTypes = {
  artistName: PropTypes.string.isRequired,
  collectionName: PropTypes.string.isRequired,
  collectionId: PropTypes.number.isRequired,
  imgUrl: PropTypes.string.isRequired,
};

export default CardAlbum;
