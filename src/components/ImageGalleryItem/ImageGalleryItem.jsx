import css from './ImageGalleryItem.module.css';
import { Audio } from 'react-loader-spinner';
import Notiflix from 'notiflix';
import PropTypes from 'prop-types';

export default function ImageGalleryItem({
  images,
  error,
  status,
  onImageClick,
}) {
  if (status === 'pending') {
    <Audio
      height="80"
      width="80"
      radius="9"
      color="green"
      ariaLabel="loading"
      wrapperClass="wrapper-class"
    />;
  }

  if (status === 'rejected') {
    Notiflix.Notify.info('Ops, thre is no image matching your search');
    return <h1>{error}</h1>;
  }

  if (status === 'resolved') {
    return images.map(({ id, webformatURL, tags, largeImageURL }) => (
      <li key={id} className={css.imageGalleryItem}>
        <img
          onClick={() => onImageClick(largeImageURL)}
          className={css.imageGalleryItemImage}
          key={id}
          src={webformatURL}
          alt={tags}
        />
      </li>
    ));
  }
  return;
}

ImageGalleryItem.propTypes = {
  images: PropTypes.array.isRequired,
  error: PropTypes.bool.isRequired,
  status: PropTypes.string.isRequired,
  onImageClick: PropTypes.func.isRequired,
};
