import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import Button from 'components/Button/Button';
import css from './ImageGallery.module.css';
import PropTypes from 'prop-types';

export default function ImageGallery({
  images,
  pageChanger,
  error,
  status,
  onImageClick,
}) {
  return (
    <>
      {images.length && (
        <div className={css.imageGalleryContainer}>
          <ul className={css.imageGallery}>
            <ImageGalleryItem
              images={images}
              error={error}
              status={status}
              onImageClick={onImageClick}
            />
          </ul>
          {status === 'resolved' && <Button pageChanger={pageChanger} />}
        </div>
      )}
    </>
  );
}

ImageGallery.propTypes = {
  images: PropTypes.array.isRequired,
  pageChanger: PropTypes.func.isRequired,
  error: PropTypes.bool.isRequired,
  status: PropTypes.string.isRequired,
  onImageClick: PropTypes.func.isRequired,
};
