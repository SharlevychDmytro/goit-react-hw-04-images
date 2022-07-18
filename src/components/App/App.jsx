import { useState, useEffect } from 'react';
import { Searchbar } from 'components/Searchbar/Searchbar';
import { AppStyled } from 'components/App/App.styled';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { requestToServer } from 'js/request-to-server';
import { Button } from 'components/Button/Button';
import { Loader } from 'components/Loader/Loader';
import { Modal } from 'components/Modal/Modal';

export const App = () => {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentItem, setCurrentItem] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [loadMore, setLoadMore] = useState(false);

  useEffect(() => {
    if (query.trim() === '') {
      setLoadMore(false);
      return;
    }
    async function getImages() {
      const perPage = 12;
      setIsLoading(true);
      const response = await requestToServer(query, page);
      setIsLoading(false);
      const data = response.data.hits;

      if (data.length) {
        setLoadMore(true);
      } else {
        setLoadMore(false);
      }

      if (Math.ceil(response.data.totalHits / perPage) === Number(page)) {
        setLoadMore(false);
      }

      if (!data.length) {
        alert(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      }
      setImages(state => [...state, ...data]);
    }
    getImages();
  }, [page, query]);

  const onLoadMore = () => {
    setPage(page + 1);
  };

  const formSubmit = query => {
    setPage(1);
    setImages([]);
    setQuery(query);
  };

  const clickItem = e => {
    setIsOpen(true);
    setCurrentItem(e.currentTarget.id);
  };

  const closeModal = () => {
    setIsOpen(false);
    setCurrentItem('');
  };

  const currentImage = images.filter(image => String(image.id) === currentItem);

  return (
    <AppStyled>
      <Searchbar onSubmit={formSubmit} />
      <ImageGallery images={images} onClick={clickItem} />
      {isLoading && <Loader />}
      {loadMore && <Button onClick={onLoadMore} />}
      {isOpen && <Modal onClose={closeModal} data={currentImage} />}
    </AppStyled>
  );
};
