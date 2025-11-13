import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// redux imports
import { Provider } from 'react-redux';
import store from './redux/store.js';
// router imports
import { BrowserRouter, Routes, Route } from 'react-router';
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
)
