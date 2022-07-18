import { BsSearch } from 'react-icons/bs';
import PropTypes from 'prop-types';
import {
  SearchbarStyled,
  SearchForm,
  SearchFormButton,
  SearchFormInput,
} from './Searchbar.styled';

export const Searchbar = ({ onSubmit }) => {
  const formSubmit = e => {
    e.preventDefault();
    onSubmit(e.currentTarget.elements.query.value);
    e.target.reset();
  };

  return (
    <SearchbarStyled as="header">
      <SearchForm onSubmit={formSubmit}>
        <SearchFormButton type="submit">
          <span>
            <BsSearch />
          </span>
        </SearchFormButton>
        <SearchFormInput
          type="text"
          name="query"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </SearchForm>
    </SearchbarStyled>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
