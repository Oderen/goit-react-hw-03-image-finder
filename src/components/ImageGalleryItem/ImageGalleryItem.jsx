import css from './ImageGalleryItem.module.css';
import { Audio } from 'react-loader-spinner';
import Notiflix from 'notiflix';

export default function ImageGalleryItem({ images, error, status }) {
  if (status === 'pending') {
    return (
      <Audio
        height="80"
        width="80"
        radius="9"
        color="green"
        ariaLabel="loading"
        wrapperClass="wrapper-class"
      />
    );
  }

  if (status === 'rejected') {
    Notiflix.Notify.info('Ops, thre is no image matching your search');
    return <h1>{error}</h1>;
  }

  if (status === 'resolved') {
    return images.hits.map(({ id, webformatURL, tags }) => (
      <li key={id} className={css.imageGalleryItem}>
        <img
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

// largeImageURL
