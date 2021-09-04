/* eslint-disable linebreak-style */
/* eslint-disable no-unused-expressions */
/* eslint-disable import/prefer-default-export */

import { $ } from './dom';

const stateModal = {
  opacity: '0',
  visibility: 'hidden',
};

const modal = $('.modal');
const modalContainer = $('.modal-container');

export const openModal = () => {
  stateModal.opacity === '1' ? stateModal.opacity = '0' : stateModal.opacity = '1';
  stateModal.visibility === 'hidden' ? stateModal.visibility = 'visible' : stateModal.visibility = 'hidden';

  if (stateModal.visibility === 'visible') {
    modalContainer.style.opacity = stateModal.opacity;
    modalContainer.style.visibility = stateModal.visibility;
  } else {
    setTimeout(() => {
      modalContainer.style.opacity = stateModal.opacity;
      modalContainer.style.visibility = stateModal.visibility;
    }, 500);
  }
  modal.classList.toggle('modal-close');
};
