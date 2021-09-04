/* eslint-disable linebreak-style */
/* eslint-disable no-restricted-globals */

import './styles/style.css';
import './styles/modal.css';

import { encode, decode } from 'js-base64';

import * as editor from './editor';
import './grid';
import { $, createHTML, hiHTML } from './util/dom';
import { openModal } from './util/modal';

const $iframe = $('#iframe');

const $html = $('#html');
const $css = $('#css');
const $js = $('#js');

export const htmlEditor = editor.createEditor({ domElement: $html, language: 'html' });
export const cssEditor = editor.createEditor({ domElement: $css, language: 'css' });
export const jsEditor = editor.createEditor({ domElement: $js, language: 'javascript' });

const update = () => {
  const html = htmlEditor.getValue();
  const css = cssEditor.getValue();
  const js = jsEditor.getValue();

  const hashedCode = `${encode(html)}|${encode(css)}|${encode(js)}`;
  history.replaceState(null, null, `/${hashedCode}`);

  const resHTML = createHTML({ html, css, js });
  $iframe.setAttribute('srcdoc', resHTML);
};

const init = () => {
  const { pathname } = window.location;
  if (pathname === '/' || pathname === '/%7C%7C') {
    history.replaceState(null, null, '||');
    $iframe.setAttribute('srcdoc', hiHTML());
    htmlEditor.focus();
    return;
  }

  const hash = pathname.slice(1).split('%7C');

  htmlEditor.setValue(decode(hash[0]));
  cssEditor.setValue(decode(hash[1]));
  jsEditor.setValue(decode(hash[2]));

  update();
};

htmlEditor.onDidChangeModelContent(update);
cssEditor.onDidChangeModelContent(update);
jsEditor.onDidChangeModelContent(update);

init();

/* ============================================== */
const $grid = $('.grid');
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' || event.key === 'Esc') openModal();

  if (event.ctrlKey && event.altKey && event.key === '1') {
    $grid.style.setProperty('grid-template-columns', '1fr 5px 0');
    $grid.style.setProperty('grid-template-rows', '1fr 5px 0');
    htmlEditor.focus();
  }

  if (event.ctrlKey && event.altKey && event.key === '2') {
    $grid.style.setProperty('grid-template-columns', '0 5px 1fr');
    $grid.style.setProperty('grid-template-rows', '1fr 5px 0');
    cssEditor.focus();
  }

  if (event.ctrlKey && event.altKey && event.key === '3') {
    $grid.style.setProperty('grid-template-columns', '1fr 5px 0');
    $grid.style.setProperty('grid-template-rows', '0 5px 1fr');
    jsEditor.focus();
  }

  if (event.ctrlKey && event.altKey && event.key === '4') {
    $grid.style.setProperty('grid-template-columns', '0 5px 1fr');
    $grid.style.setProperty('grid-template-rows', '0 5px 1fr');
  }

  if (event.ctrlKey && event.altKey && event.key === '5') {
    $grid.style.setProperty('grid-template-columns', '1fr 5px 1fr');
    $grid.style.setProperty('grid-template-rows', '1fr 5px 1fr');
  }
});
