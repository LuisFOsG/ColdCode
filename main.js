/* eslint-disable consistent-return */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-restricted-globals */

import './style.css';
import Split from 'split-grid';
import { encode, decode } from 'js-base64';
import * as monaco from 'monaco-editor';

import HtmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker';
import CssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker';
import JsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker';

const $ = (selector) => document.querySelector(selector);

const $iframe = $('#iframe');
const $js = $('#js');
const $css = $('#css');
const $html = $('#html');

window.MonacoEnvironment = {
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
  contextmenu: false,
  fixedOverflowWidgets: true,
  lineNumbers: 'on',
  lineNumbersMinChars: 2,
  lineDecorationsWidth: 0,
  renderLineHighlight: 'none',
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

const createHTML = ({ html, css, js }) => `
    <!DOCTYPE html>
    <html lang="es">
      <head>
        <meta charset="UTF-8">
        <style>
          ${css}
        </style>
      </head>
      <body>
        ${html}

        <script>
        ${js}
        </script>
      </body>
    </html>
  `;

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

init();
