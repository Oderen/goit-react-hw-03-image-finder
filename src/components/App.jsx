import { Component } from 'react';
import ImageGallery from './ImageGallery/ImageGallery';
import Searchbar from './Searchbar/Searchbar';
import css from '../styles.module.css';
import Notiflix from 'notiflix';
import Modal from './Modal/Modal';

export class App extends Component {
  state = {
    searchQueary: '',
    page: 1,
    pageAmount: 12,
    images: [],
    status: 'idle',
    largeImageURL: '',
    showModal: false,
    error: false,
  };

  async componentDidUpdate(prevProps, prevState) {
    const { page, searchQueary } = this.state;
    const newQueary = searchQueary;
    const nextPage = page;
    const prevPage = prevState.page;
    const prevQueary = prevState.searchQueary;
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

          this.setState({
            images: [...images, ...hits],
            pageCount: Math.ceil(totalHits / 12),
            status: 'resolved',
          });

          if (total === 0) {
            Notiflix.Notify.info('Sorry, there is no image found');
            return this.setState({ status: 'rejected' });
          }
        })
        .catch(error => {
          console.log(error.message);
          this.setState({ status: 'rejected' });
        });
    }
  }

  handleFormSubmit = searchQueary => {
    if (searchQueary === this.state.searchQueary) {
      return Notiflix.Notify.info(
        'You have already searched this :) Please enter something else'
      );
    }

    return this.setState({ searchQueary, page: 1, images: [], pageCount: 12 });
  };

  handleLoadMoreClick = () => {
    this.setState(({ page }) => ({ page: page + 1 }));
  };

  handleImageClick = largeImgURL => {
    console.log('largeImageURL >>>', largeImgURL);
    this.setState({ largeImageURL: largeImgURL });
    this.toggleModal();
  };

  toggleModal = () => {
    this.setState({ showModal: !this.state.showModal });
  };

  render() {
    return (
      <div>
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery
          className={css.ImageGallery}
          images={this.state.images}
          error={this.state.error}
          pageChanger={this.handleLoadMoreClick}
          status={this.state.status}
          onImageClick={this.handleImageClick}
        />
        {this.state.showModal && (
          <Modal
            closeModal={this.toggleModal}
            largeImageURL={this.state.largeImageURL}
          />
        )}
      </div>
    );
  }
}
