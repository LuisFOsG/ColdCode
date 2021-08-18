/* eslint-disable linebreak-style */
/* eslint-disable import/prefer-default-export */

export const createHTML = ({ html, css, js }) => `
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

export const hiHTML = () => `
 <h1>Bienvenido</h1>
 <p>Ahora contamos con atajos de teclado!!</p>
 <ul>
    <li><strong>esc</strong> abrir modal</li>
    <li><strong>ctrl + alt &nbsp1 - 5</strong> moverse entre las diferentes ventajas</li>
 </ul>
 <br><hr><br>
 <small>Somos conscientes de que al dar clic en la previsualizacion estos atajos dejan de funcionar</small>
 <br>
 <p>Proyecto basado en <a target="_blank" href="https://codi.link/">codi.link</a></p>
`;
