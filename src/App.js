import { BrowserRouter, Routes, Route } from 'react-router-dom';

// components
import ProtectedRoute from './components/ProtectedRoute';
import Home from './components/home/Home';
import Login from './components/login/Login';
import ErrorPage from './components/error_page/ErrorPage';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path='/login' element={<Login />} />
        <Route path='*' element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>

  );
}

export default App;
