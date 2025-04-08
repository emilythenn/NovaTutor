import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import './Login.css';

interface SignUpProps {
  setShowSignUpPage: (value: boolean) => void;
}

const SignUp: React.FC<SignUpProps> = ({ setShowSignUpPage }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    const auth = getAuth();

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert('Account created successfully!');
      setEmail('');
      setPassword('');
      setError('');
      setShowSignUpPage(false);
    } catch (err: any) {
      console.error('Sign-up failed:', err.message);
      setError(err.message);
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSignUp} className="login-form">
        <h2>Sign Up</h2>
        {error && <p className="error-message">{error}</p>}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="login-button">
          Sign Up
        </button>
        <button
          type="button"
          className="login-button"
          onClick={() => setShowSignUpPage(false)}
        >
          Back to Chatbot
        </button>
      </form>
    </div>
  );
};

export default SignUp;