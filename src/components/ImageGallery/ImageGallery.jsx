import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import Button from 'components/Button/Button';
import css from './ImageGallery.module.css';

export default function ImageGallery({
  images,
  loading,
  pageChanger,
  error,
  status,
}) {
  return (
    <>
      {images && (
        <div className={css.imageGalleryContainer}>
          <ul className={css.imageGallery}>
            <ImageGalleryItem
              images={images}
              loading={loading}
              error={error}
              status={status}
            />
          </ul>
          <Button pageChanger={pageChanger} />
        </div>
      )}
    </>
  );
}
