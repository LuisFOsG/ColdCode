/* eslint-disable import/prefer-default-export */
/* eslint-disable no-restricted-globals */
/* eslint-disable import/no-unresolved */
import './styles/style.css';
import './styles/modal.css';

import Split from 'split-grid';
import { encode, decode } from 'js-base64';
import * as monaco from 'monaco-editor';

import HtmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker';
import CssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker';
import JsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker';

import { createHTML, hiHTML } from './exportHtml';
import { openModal } from './modal';

export const $ = (selector) => document.querySelector(selector);

const $iframe = $('#iframe');
const $grid = $('.grid');

const $html = $('#html');
const $css = $('#css');
const $js = $('#js');

window.MonacoEnvironment = {
  // eslint-disable-next-line consistent-return
  getWorker: (_, label) => {
    if (label === 'html') return new HtmlWorker();
    if (label === 'css') return new CssWorker();
    if (label === 'javascript') return new JsWorker();
  },
};

const configEditor = {
  value: '',
  fontSize: 14,
  theme: 'vs-dark',
  fontFamily: 'Fira Code',
  scrollBeyondLastLine: false,
  roundedSelection: false,
  automaticLayout: true,
  fontLigatures: true,
  fixedOverflowWidgets: true,
  lineNumbers: 'on',
  lineNumbersMinChars: 2,
  lineDecorationsWidth: 0,
  renderLineHighlight: 'none',
  wordWrap: 'on',
  minimap: {
    enabled: false,
  },
  padding: {
    top: 5,
  },
};

const htmlEditor = monaco.editor.create($html, {
  language: 'html',
  ...configEditor,
});
const cssEditor = monaco.editor.create($css, {
  language: 'css',
  ...configEditor,
});
const jsEditor = monaco.editor.create($js, {
  language: 'javascript',
  ...configEditor,
});

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

/* ============================================== */
const closeModal = $('.close-button');
closeModal.addEventListener('click', openModal);

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' || event.key === 'Esc') openModal();

  if (event.ctrlKey && event.altKey && event.key === '1') {
    $grid.style.setProperty('grid-template-columns', '1fr 5px 0');
    $grid.style.setProperty('grid-template-rows', '1fr 5px 0');
  }

  if (event.ctrlKey && event.altKey && event.key === '2') {
    $grid.style.setProperty('grid-template-columns', '0 5px 1fr');
    $grid.style.setProperty('grid-template-rows', '1fr 5px 0');
  }

  if (event.ctrlKey && event.altKey && event.key === '3') {
    $grid.style.setProperty('grid-template-columns', '1fr 5px 0');
    $grid.style.setProperty('grid-template-rows', '0 5px 1fr');
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

init();
