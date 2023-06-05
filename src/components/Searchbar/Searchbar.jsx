import { Component } from 'react';
import css from './Searchbar.module.css';
import Notiflix from 'notiflix';
import PropTypes from 'prop-types';

export default class Searchbar extends Component {
  state = {
    searchQuery: '',
  };

  onHandleInputChange = e => {
    const { value } = e.currentTarget;

    this.setState({ searchQuery: value });
  };

  onSubmit = e => {
    e.preventDefault();

    const searchValue = this.state.searchQuery.trim().toLowerCase();

    if (searchValue === '') {
      Notiflix.Notify.info('Please enter something');
      return;
    }

    this.props.onSubmit(searchValue);
  };

  render() {
    return (
      <header className={css.searchbar}>
        <form className={css.searchForm} onSubmit={this.onSubmit}>
          <button type="submit" className={css.searchFormButton}>
            <span className={css.searchFormButtonLabel}>Search</span>
          </button>
          <input
            className={css.searchFormInput}
            value={this.state.searchQuery}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.onHandleInputChange}
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
