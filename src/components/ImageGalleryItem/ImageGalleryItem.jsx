import css from './ImageGalleryItem.module.css';
import { Audio } from 'react-loader-spinner';
import Notiflix from 'notiflix';

export default function ImageGalleryItem({ images, loading, error, status }) {
  console.log('Status >>>', status);
  console.log(images);

  if (status === 'idle') {
    return <h1>What would you like to search?</h1>;
  }

  if (status === 'pending') {
    return (
      <Audio
      // height="80"
      // width="80"
      // radius="9"
      // color="green"
      // ariaLabel="loading"
      // wrapperStyle
      // wrapperClass
      // marginLeft="auto"
      // marginRigth="auto"
      />
    );
  }

  if (status === 'rejected') {
    Notiflix.Notify.error('Ops, something went wrong');
    return <h1>{error.message}</h1>;
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
  return console.log('ой, пролема');

  // return (
  //   <>
  // {loading && (
  // <Audio
  // // height="80"
  // // width="80"
  // // radius="9"
  // // color="green"
  // // ariaLabel="loading"
  // // wrapperStyle
  // // wrapperClass
  // // marginLeft="auto"
  // // marginRigth="auto"
  // />
  //     )}
  //     {error && <h1>{error.message}</h1>}
  //     {images.hits.map(({ id, webformatURL, tags }) => (
  //       <li key={id} className={css.imageGalleryItem}>
  //         <img
  //           className={css.imageGalleryItemImage}
  //           key={id}
  //           src={webformatURL}
  //           alt={tags}
  //         />
  //       </li>
  //     ))}
  //   </>
  // );
}

// largeImageURL
