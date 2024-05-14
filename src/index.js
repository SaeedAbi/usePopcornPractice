import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
      {/*<StarRating maxRating={5} message={['terrible','bad','ok','good','amazing']} defaultRating={3}/>*/}
    {/*  <StarRating maxRating={10} color='green' size={12}/>*/}
  </React.StrictMode>
);


