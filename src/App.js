import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import LaundryForm from './components/LaundryForm';
import UserForm from './components/userForm';
import PrevRequest from './components/prevRequest';
import Profile from './components/profile';
import { useSelector } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './components/utility/store';
import { Provider } from 'react-redux'; // Import provider
import "./App.css" // Assuming you have an App.css file
import Navbar from './components/NavBar';
import { useDispatch } from 'react-redux';
import { logout } from './components/utility/authSlice';

const App = () => {
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  //console.log('App component rendered. isLoggedIn:', isLoggedIn);

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };



  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}> {/* Adjust 'loading' prop if needed */}
        <BrowserRouter>
          {isLoggedIn && <Navbar onLogout={handleLogout} />}
          <Routes>
            <Route path="/" element={<LoginForm />} />
            <Route path="/signup" element={<SignupForm />} />
            <Route
              path="/userform"
              element={isLoggedIn && <Navbar onLogout={handleLogout} /> ? <UserForm /> : <Navigate to="/" replace />}
            />
            <Route
              path="/laundryform"
              element={isLoggedIn && <Navbar onLogout={handleLogout} /> ? <LaundryForm /> : <Navigate to="/userform" replace />}
            />
            {/* Add more routes as needed for PrevRequest, Profile, etc. */}
          </Routes>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
};

export default App;
