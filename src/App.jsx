import './App.css';
// redux imports
import { Provider } from 'react-redux';
import store from './redux/store.js';
// router imports
import { BrowserRouter, Routes, Route } from 'react-router';
// ant design imports
import { Button } from 'antd';

// component imports
import Home from './pages/Home';

function App() {

  return(
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App
