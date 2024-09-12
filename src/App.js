import React, { useState } from 'react';
import './App.css';
import Login from './Pages/Login/Login';
import Register from './Pages/Register/Register';

function App() {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="App">
      {isLogin ? (
        <Login toggleForm={toggleForm} />
      ) : (
        <Register toggleForm={toggleForm} />
      )}
    </div>
  );
}

export default App;
