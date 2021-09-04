/* eslint-disable linebreak-style */
/* eslint-disable import/prefer-default-export */
/* eslint-disable import/no-unresolved */
import * as monaco from 'monaco-editor';
import { emmetHTML } from 'emmet-monaco-es';

import HtmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker';
import CssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker';
import JsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker';

window.MonacoEnvironment = {
  // eslint-disable-next-line consistent-return
  getWorker: (_, label) => {
    if (label === 'html') return new HtmlWorker();
    if (label === 'css') return new CssWorker();
    if (label === 'javascript') return new JsWorker();
  },
};

const CONFIG_EDITOR = {
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
  lineNumbersMinChars: 3,
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

export const createEditor = ({ domElement, language }) => (
  monaco.editor.create(domElement, {
    language,
    ...CONFIG_EDITOR,
  })
);

emmetHTML(monaco);
