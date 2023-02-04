import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './cardalbum.css';

class CardAlbum extends Component {
  render() {
    const { artistName, collectionName, collectionId, imgUrl } = this.props;
    return (
      <div className="album">
        <Link
          to={ `/album/${collectionId}` }
          data-testid={ `link-to-album-${collectionId}` }
        >
          <img
            src={ imgUrl.replace(/100x100bb.jpg/, '200x200bb.jpg') }
            alt={ artistName }
          />
          <h2 className="music-name-album">{collectionName}</h2>
          <p className="artist-name-album">{artistName}</p>
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
