import React from 'react';
// import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import { UserProvider } from './contexts/user.context';
import { CategoriesProvider } from './contexts/categories.context';

import './index.scss';

import { createRoot } from 'react-dom/client';
const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <CategoriesProvider>
          <App />
        </CategoriesProvider>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// const rootElement = document.getElementById('root');

// render(
//   <React.StrictMode>
//     <BrowserRouter>
//       <UserProvider>
//         <CategoriesProvider>
//           <CartProvider>
//             <App />
//           </CartProvider>
//         </CategoriesProvider>
//       </UserProvider>
//     </BrowserRouter>
//   </React.StrictMode>,
//   rootElement
// );
