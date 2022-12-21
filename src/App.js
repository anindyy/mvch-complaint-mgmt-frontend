
import React, { useState, useEffect } from 'react';
import { Route, Routes, useNavigate, Navigate } from 'react-router';
import { useCookies } from 'react-cookie';

import './App.css';
import Home from './pages/Home';
import Form from './pages/Form';
import Login from './pages/Login';
import Signup from './pages/Signup';
import NotFound from './pages/NotFound';
import { login, register } from './api/user';
import config from './config';
import View from './pages/View';
import TopBar from './component/TopBar';

export const AuthContext = React.createContext(null)

const ProtectedRoute = ({ isAuthPage = false, children }) => {
  const { token } = React.useContext(AuthContext);

  if (!token && !isAuthPage) {
    return <Navigate to="/login" replace />;
  } else if (token && isAuthPage) {
    return <Navigate to="/home" replace />;
  }

  return children;
};

const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const [cookie, setCookie, removeCookie] = useCookies([config.cookieName]);
  const [token, setToken] = useState(cookie[config.cookieName]);

  useEffect(() => {
    const biscoff = cookie[config.cookieName]
    if (!!biscoff) {
      setToken(biscoff)
    }
  })

  const handleLogin = async ({ email, password }) => {
    const { token } = await login({ email, password })
    setToken(token);
    setCookie(config.cookieName, token);
    navigate('/home');
  };

  const handleLogout = () => {
    setToken(null);
    removeCookie(config.cookieName);
  };

  const handleSignup = async (body) => {
    const { token } = await register(body);
    setToken(token);
    setCookie(config.cookieName, token);
    navigate('/home');
  }

  const value = {
    token,
    onLogin: handleLogin,
    onLogout: handleLogout,
    onSignup: handleSignup
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

function App() {
  return (
    <>
      <TopBar />
      <AuthProvider>
          <div className="App">
            <Routes>
              <Route index element={<ProtectedRoute isAuthPage><Login /></ProtectedRoute>} />
              <Route path="/login" element={<ProtectedRoute isAuthPage><Login /></ProtectedRoute>} />
              <Route path="/signup" element={<ProtectedRoute isAuthPage><Signup /></ProtectedRoute>} />
              <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
              <Route path="/form" element={<ProtectedRoute><Form /></ProtectedRoute>} />
              <Route path="/view" element={<ProtectedRoute><View /></ProtectedRoute>} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
      </AuthProvider>
    </>

  );
}

export default App;
