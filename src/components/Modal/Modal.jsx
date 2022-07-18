import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Overlay, ModalStyled } from 'components/Modal/Modal.styled';

const modalRoot = document.querySelector('#modal-root');

export const Modal = ({ onClose, data }) => {
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  });

  const handleKeyDown = e => {
    if (e.code === 'Escape') {
      onClose();
    }
  };

  const handleBackdropClick = event => {
    if (event.currentTarget === event.target) {
      onClose();
    }
  };

  const { largeImageURL, id } = data[0];

  return createPortal(
    <Overlay onClick={handleBackdropClick}>
      <ModalStyled>
        <img src={largeImageURL} alt={id} />
      </ModalStyled>
    </Overlay>,
    modalRoot
  );
};

Modal.propTypes = {
  onClose: PropTypes.func,
  data: PropTypes.array,
};
