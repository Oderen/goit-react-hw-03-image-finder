import { Component } from 'react';
import ImageGallery from './ImageGallery/ImageGallery';
import Searchbar from './Searchbar/Searchbar';
import css from '../styles.module.css';
import Notiflix from 'notiflix';
// import getData from './API';

export class App extends Component {
  state = {
    searchQueary: '',
    page: 1,
    pageCount: 0,
    images: null,
    largeImageURL: '',
    status: 'idle',
  };

  async componentDidUpdate(prevProps, prevState) {
    const { page, searchQueary } = this.state;
    const newQueary = searchQueary;
    const prevQueary = prevState.searchQueary;

    if (prevQueary !== newQueary) {
      this.setState({ status: 'pending' });

      fetch(
        `https://pixabay.com/api/?q=${newQueary}&page=${page}&key=36858767-c9bdee91508ce121a2eb6b95d&image_type=photo&orientation=horizontal&per_page=12`
      )
        .then(response => {
          if (response.ok) {
            return response.json();
          }

          return Promise.reject(new Error('Opps, something went wrong'));
        })
        .then(images => {
          this.setState({ images, status: 'resolved' });

          if (images.total === 0) {
            this.setState({ status: 'rejected' });
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
      Notiflix.Notify.info(
        'You have already searched this :) Please enter something else'
      );
      return;
    }

    this.setState({ searchQueary });
  };

  handleLoadMoreClick = () => {
    this.setState(({ page }) => ({ page: page + 1 }));

    fetch(
      `https://pixabay.com/api/?q=${this.state.searchQueary}&page=${this.state.page}&key=36858767-c9bdee91508ce121a2eb6b95d&image_type=photo&orientation=horizontal&per_page=12`
    )
      .then(response => {
        if (response.ok) {
          return response.json();
        }

        return Promise.reject(new Error('Opps, something went wrong'));
      })
      .then(images => {
        this.setState({ images, status: 'resolved' });

        if (images.total === 0) {
          this.setState({ status: 'rejected' });
        }
      })
      .catch(error => {
        console.log(error.message);
        this.setState({ status: 'rejected' });
      });
  };

  // calculatePageCount = (totalItems, itemsPerPage) => {
  //   return Math.ceil(totalItems / itemsPerPage);
  // };

  // handleImageClick = ({ target: { dataset } }) => {
  //   const largeImageURL = dataset.largeimg;
  //   this.setState({ largeImageURL });
  // };

  // onCloseModal = () => {
  //   this.setState({ largeImageURL: '' });
  // };

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
        />
      </div>
    );
  }
}
