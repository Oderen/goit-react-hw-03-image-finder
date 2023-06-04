import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import Button from 'components/Button/Button';
import css from './ImageGallery.module.css';

export default function ImageGallery({ images, pageChanger, error, status }) {
  return (
    <>
      {images && (
        <div className={css.imageGalleryContainer}>
          <ul className={css.imageGallery}>
            <ImageGalleryItem images={images} error={error} status={status} />
          </ul>
          {status === 'resolved' && <Button pageChanger={pageChanger} />}
        </div>
      )}
    </>
  );
}
