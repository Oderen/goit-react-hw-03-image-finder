import css from './Button.module.css';

const Button = ({ pageChanger }) => {
  return (
    <button type="button" className={css.loadButton} onClick={pageChanger}>
      Load more
    </button>
  );
};

export default Button;
