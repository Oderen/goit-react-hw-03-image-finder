import { Component } from 'react';

import ImageGallery from './ImageGallery/ImageGallery';
import Searchbar from './Searchbar/Searchbar';
import Modal from './Modal/Modal';
import Loader from './Loader/Loader';

import css from '../styles.module.css';

import Notiflix from 'notiflix';

export class App extends Component {
  state = {
    searchQuery: '',
    page: 1,
    pictureCount: 12,
    images: [],
    status: 'idle',
    largeImageURL: '',
    showModal: false,
    isButtonVisible: false,
  };

  async componentDidUpdate(prevProps, prevState) {
    const { page, searchQuery } = this.state;
    const newQueary = searchQuery;
    const nextPage = page;
    const prevPage = prevState.page;
    const prevQueary = prevState.searchQuery;
    const images = this.state.images;

    if (prevQueary !== newQueary || prevPage !== nextPage) {
      this.setState({ status: 'pending' });

      fetch(
        `https://pixabay.com/api/?q=${newQueary}&page=${nextPage}&key=36858767-c9bdee91508ce121a2eb6b95d&image_type=photo&orientation=horizontal&per_page=12`
      )
        .then(response => {
          if (response.ok) {
            return response.json();
          }

          return Promise.reject(new Error('Opps, something went wrong'));
        })
        .then(data => {
          const { hits, total, totalHits } = data;
          // console.log('hits.length: ', hits.length);

          this.setState(prevState => ({
            images: [...images, ...hits],
            pictureCount: prevState.pictureCount + hits.length,
            status: 'resolved',
          }));

          if (total === 0) {
            Notiflix.Notify.info('Sorry, there is no image found');
            return this.setState({ status: 'rejected' });
          }

          if (totalHits > this.state.pictureCount) {
            this.setState({
              isButtonVisible: true,
            });
          }

          if (totalHits < this.state.pictureCount) {
            this.setState({
              isButtonVisible: false,
            });
            return Notiflix.Notify.info(
              'Sorry, there are no more images matching your request'
            );
          }
        })
        .catch(error => {
          console.log(error.message);
          this.setState({
            isButtonVisible: false,
          });
          this.setState({ status: 'rejected' });
        });
    }
  }

  handleFormSubmit = searchQuery => {
    if (searchQuery === this.state.searchQuery) {
      return Notiflix.Notify.info(
        'You have already searched this :) Please enter something else'
      );
    }

    return this.setState({
      searchQuery,
      page: 1,
      images: [],
      pictureCount: 12,
    });
  };

  handleLoadMoreClick = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  handleImageClick = largeImageURL => {
    this.setState({ largeImageURL });
    this.toggleModal();
  };

  toggleModal = () => {
    this.setState(prevState => ({
      showModal: !prevState.showModal,
    }));
  };

  render() {
    const { status, images, largeImageURL } = this.state;
    return (
      <>
        <Searchbar onSubmit={this.handleFormSubmit} />
        {status === 'pending' && <Loader />}
        {status === 'rejected' && <h1>Oops, something went wrong</h1>}
        <ImageGallery
          className={css.ImageGallery}
          images={images}
          pageChanger={this.handleLoadMoreClick}
          status={status}
          onImageClick={this.handleImageClick}
          isButtonVisible={this.state.isButtonVisible}
          pictureCount={this.state.pictureCount}
        />
        {this.state.showModal && (
          <Modal closeModal={this.toggleModal} largeImageURL={largeImageURL} />
        )}
      </>
    );
  }
}
