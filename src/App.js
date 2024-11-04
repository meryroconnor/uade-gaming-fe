import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import './App.css';
import Login from './pages/Login';
import Register from './pages/Register';
import Catalog from './pages/Catalog';
import Homepage from './pages/Homepage';
import useModal from './useModal';
import { UserProvider } from './userContext';
import UserProfile from './pages/UserProfile';
import Footer from './components/Footer';
import Cart from './pages/Cart';

function App() {

  const loginModal = useModal();
  const registerModal = useModal();

  return (
    <Router>
      <UserProvider>

        <div className="App">
          <Navbar openLoginModal={loginModal.openModal}
            openRegisterModal={registerModal.openModal}
          />
          <Register
            isOpen={registerModal.isOpen}
            onClose={registerModal.closeModal}

          />
          <Login
            isOpen={loginModal.isOpen}
            onClose={loginModal.closeModal}
          />

          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/catalog" element={<Catalog />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/profile" element={<UserProfile />} />
          </Routes>


        </div>

        <Footer />
      </UserProvider>
    </Router>

  );
}

export default App;