import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client'; // Correct import path
import { BrowserRouter } from "react-router-dom";
import './index.css';
import App from './App.jsx';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);