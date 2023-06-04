import { Component } from 'react';
import ImageGallery from './ImageGallery/ImageGallery';
import Searchbar from './Searchbar/Searchbar';
import css from '../styles.module.css';
import Notiflix from 'notiflix';

import getData from './API';

export class App extends Component {
  state = {
    searchQuery: '',
    images: null,
    page: 1,
    loading: false,
    error: null,
    status: 'idle',
  };

  componentDidUpdate(_, prevState) {
    if (prevState.searchQuery !== this.state.searchQuery) {
      this.setState({ status: 'pending' });

      fetch(
        `https://pixabay.com/api/?q=${this.state.searchQuery}&page=1&key=36858767-c9bdee91508ce121a2eb6b95d&image_type=photo&orientation=horizontal&per_page=12`
      )
        .then(response => {
          const { total, hits, totalHits } = response.data;

          if (response.ok) {
            return response.json();
          }

          if (total === 0) {
            console.log('Проблема');
            return;
          }

          return Promise.reject(
            new Error(`Немає фотографій з іменем ${this.searchQuery}`)
          );
        })
        .then(images => this.setState({ images, status: 'resolved' }))
        .catch(error => this.setState({ error, status: 'rejected' }));
    }

    // ...............................................................
    // try {
    //   const { searchQuery } = this.state;
    //   const newQuery = searchQuery;
    //   const prevQuery = prevState.searchQuery;

    //   if (prevQuery !== newQuery) {
    //     this.setState({ loading: true });

    //     const response = await getData(this.state.searchQuery, this.state.page);
    //     const { total, hits, totalHits } = response.data;

    //     if (total === 0) {
    //       this.setState({ error: true });
    //       Notiflix.Notify.failure('Sorry, there is no images');
    //       return;
    //     }
    //   }
    // } catch (error) {
    //   this.setState({ error: true });
    //   Notiflix.Notify.failure('Sorry, somethig went wrong');
    //   console.log(error.message);
    // } finally {
    //   this.setState({ loading: false });
    // }
    // .............................................................
  }

  // this.setState(prevState => ({
  //   page: prevState.page + 1,
  // }));

  // console.log('Старий запит');
  // console.log('Додаємо сторінку...');

  // this.fetchData(searchQuery);
  // console.log(
  //   `Відбувся рендер із ${this.state.searchQuery} на сторінці ${this.state.page}`
  // );
  // return;

  // fetchData = async name => {
  //   try {
  //     const response = await getData(name, this.state.page);

  //     const { total, hits, totalHits } = response.data;
  //     // console.log('total', total);
  //     // console.log('hits', hits);
  //     // console.log('totalHits', totalHits);

  //     this.setState({
  //       images: { hits: [...hits] },
  //     });

  //     // console.log('images', this.state.images);
  //   } catch {
  //     console.log('Error 404');
  //   }
  // };

  onHandleSubmit = searchQuery => {
    this.setState({ searchQuery });
  };

  IncreasePage = () => {
    this.fetchData(this.state.searchQuery);
  };

  render() {
    // console.log('Page >>>', this.state.page);
    return (
      <div
      // style={{
      //   height: '100vh',
      //   display: 'flex',
      //   justifyContent: 'center',
      //   alignItems: 'center',
      //   fontSize: 40,
      //   color: '#010101',
      // }}
      >
        <Searchbar onSubmit={this.onHandleSubmit} />
        {/* List */}
        <ImageGallery
          className={css.ImageGallery}
          images={this.state.images}
          loading={this.state.loading}
          error={this.state.error}
          pageChanger={this.onHandleSubmit}
          status={this.state.status}
        />
      </div>
    );
  }
}

// Логіка
// 1. Коли вже є 12 фото, то при натисканні на "load more" появляються ще 12
