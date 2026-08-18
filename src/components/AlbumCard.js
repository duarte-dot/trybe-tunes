import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { UilPlay } from '@iconscout/react-unicons';
import { artworkOf, formatYear } from '../utils/format';
import '../styles/albumCard.css';

const ICON_SIZE = 22;

class AlbumCard extends Component {
  render() {
    const { album } = this.props;
    const { artistName, artworkUrl100, collectionId, collectionName } = album;
    const meta = [
      formatYear(album.releaseDate),
      `${album.trackCount} songs`,
    ].filter(Boolean).join(' • ');

    return (
      <Link
        to={ `/album/${collectionId}` }
        className="album-card"
        title={ collectionName }
      >
        <div className="album-card__art">
          <img
            src={ artworkOf(artworkUrl100) }
            alt={ `${collectionName} cover` }
            loading="lazy"
          />
          <span className="album-card__play" aria-hidden="true">
            <UilPlay size={ ICON_SIZE } />
          </span>
        </div>

        <h3 className="album-card__title">{collectionName}</h3>
        <p className="album-card__artist">{artistName}</p>
        <p className="album-card__meta">{meta}</p>
      </Link>
    );
  }
}

AlbumCard.propTypes = {
  album: PropTypes.shape({
    artistName: PropTypes.string,
    artworkUrl100: PropTypes.string,
    collectionId: PropTypes.number,
    collectionName: PropTypes.string,
    releaseDate: PropTypes.string,
    trackCount: PropTypes.number,
  }).isRequired,
};

export default AlbumCard;
