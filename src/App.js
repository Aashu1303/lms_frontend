import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import LaundryForm from './components/LaundryForm';
import { useState } from 'react';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router>
      <div>
        <nav className="bg-gray-800 p-4 text-white">
          <ul className="flex">
            <li className="mr-6">
              <Link to="/" className="hover:text-gray-300">Home</Link>
            </li>
            <li className="mr-6">
              <Link to="/login" className="hover:text-gray-300">Login</Link>
            </li>
            <li className="mr-6">
              <Link to="/signup" className="hover:text-gray-300">Signup</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/login" element={<LoginForm setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/laundryform" element={isLoggedIn ? <LaundryForm /> : <Navigate to="/login" replace />}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
