import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import './Login.css';

interface LoginProps {
  setIsLoggedIn: (value: boolean) => void;
  setShowLoginPage: (value: boolean) => void;
  setShowSignUpPage: (value: boolean) => void;
}

const Login: React.FC<LoginProps> = ({ setIsLoggedIn, setShowLoginPage, setShowSignUpPage }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const auth = getAuth();

    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert('Login successful!');
      setIsLoggedIn(true);
      setShowLoginPage(false);
      setEmail('');
      setPassword('');
      setError('');
    } catch (err: any) {
      console.error('Login failed:', err.message);
      setError(err.message);
    }
  };

  return (
    <div className="login-container">
      <form className="login-form">
        <h2>Login</h2>
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <button className="login-button">Login</button>
      </form>
    </div>
  );
};

export default Login;