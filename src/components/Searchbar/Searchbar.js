import { useState } from 'react';
import { Button } from 'components/Button/Button';
import css from './Searchbar.module.css'
import { Notify } from 'notiflix';

export const Searchbar = ({ onSubmit }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleInput = event => {
    setSearchQuery(event.currentTarget.value.toLowerCase());
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (searchQuery.trim() === '') {
      return Notify.warning('Plese enter what you are looking for');
    }

    onSubmit(searchQuery);

    setSearchQuery('');
  };


    return (
      <header className={css.searchbar}>
        <form className={css.form} onSubmit={handleSubmit}>
          <Button text="Search" onBtnClick={handleSubmit}/>
          <input
            className={css.input}
            type="text"
            autoComplete="off"
            autoFocus
            onInput={handleInput}
            value={searchQuery}
            placeholder="Search for images and photos"
          />
        </form>
      </header>
    );
  }

