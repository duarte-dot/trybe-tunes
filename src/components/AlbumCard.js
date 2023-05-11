import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../styles/albumCard.css';

class AlbumCard extends Component {
  render() {
    const { artistName, collectionId, collectionName, imgUrl } = this.props;

    return (
      <div className="album">
        <Link to={ `/album/${collectionId}` }>
          <img
            className="albumCard-image"
            src={ imgUrl.replace(/100x100bb.jpg/, '210x210bb.jpg') }
            alt={ artistName }
          />

          <h2 className="albumCard-music-name">{collectionName}</h2>

          <p className="albumCard-artist-name">{artistName}</p>
        </Link>
      </div>
    );
  }
}

AlbumCard.propTypes = {
  artistName: PropTypes.string.isRequired,
  collectionName: PropTypes.string.isRequired,
  collectionId: PropTypes.number.isRequired,
  imgUrl: PropTypes.string.isRequired,
};

export default AlbumCard;
