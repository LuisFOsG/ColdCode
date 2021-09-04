/* eslint-disable linebreak-style */
import Split from 'split-grid';

import { $ } from './util/dom';
import { openModal } from './util/modal';

Split({
  columnGutters: [{
    track: 1,
    element: $('.vertical-gutter'),
  }],
  rowGutters: [{
    track: 1,
    element: $('.horizontal-gutter'),
  }],
});

const closeModal = $('.close-button');
closeModal.addEventListener('click', openModal);
