import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import 'react-toastify/ReactToastify.css';
import { DarkThemeToggle, Flowbite } from "flowbite-react";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Flowbite>
      {/* Make the dark theme toggle fixed on the right side */}
      <div className="fixed top-4 right-4 z-50">
        <DarkThemeToggle />
      </div>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Flowbite>
  </StrictMode>
);
