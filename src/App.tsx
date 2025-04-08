import React, { useState } from 'react';
import Chatbot from './components/Chatbot';
import SignUp from './components/SignUp';
import './App.css';
import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import './firebase/firebaseConfig'; // Import Firebase initialization

// Import the History component
import History from './components/History';

// Login Component
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
    const auth = getAuth(); // Ensure Firebase is initialized before calling this

    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert('Login successful!');
      setIsLoggedIn(true); // Mark the user as logged in
      setShowLoginPage(false); // Return to the chatbot page
      setEmail('');
      setPassword('');
      setError('');
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleLogin} className="login-form">
        <h2>Login</h2>
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
          Login
        </button>
        <button
          type="button"
          className="login-button"
          onClick={() => setShowLoginPage(false)}
        >
          Back to Chatbot
        </button>
        <button
          type="button"
          className="login-button"
          onClick={() => {
            setShowLoginPage(false);
            setShowSignUpPage(true);
          }}
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

// Main App Component
const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Tracks if the user is logged in
  const [showLoginPage, setShowLoginPage] = useState(false); // Tracks if the login page is shown
  const [showSignUpPage, setShowSignUpPage] = useState(false); // Tracks if the sign-up page is shown
  const [showModal, setShowModal] = useState(true); // Tracks if the modal is shown
  const [showHistory, setShowHistory] = useState(false); // Tracks if the history page is shown
  const [sessionId, setSessionId] = useState(() => Date.now().toString()); // Generate a unique session ID

  const auth = getAuth();
  const userId = auth.currentUser?.uid || 'anonymous'; // Use 'anonymous' if the user is not logged in

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setIsLoggedIn(false); // Reset login state
      setShowLoginPage(true); // Redirect to login page
      alert('You have been logged out.');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const handleStayAnonymous = () => {
    setShowModal(false); // Close the modal
  };

  const createNewChatbot = () => {
    setSessionId(Date.now().toString()); // Generate a new session ID
    setShowHistory(false); // Ensure the chatbot view is shown
    console.log('New Chatbot Session ID:', sessionId); // Debugging log
  };

  return (
    <div>
      {showSignUpPage ? (
        // Show the sign-up page
        <SignUp setShowSignUpPage={setShowSignUpPage} />
      ) : showLoginPage ? (
        // Show the login page
        <Login
          setIsLoggedIn={setIsLoggedIn}
          setShowLoginPage={setShowLoginPage}
          setShowSignUpPage={setShowSignUpPage}
        />
      ) : showHistory ? (
        // Show the history page
        <History userId={userId} /> // Pass the userId to the History component
      ) : (
        // Show the chatbot page
        <>
          {/* Modal for choosing options */}
          {showModal && (
            <div className="modal-overlay">
              <div className="modal-box">
                <h2>Welcome to NovaTutor</h2>
                <p>Please choose an option to continue:</p>
                <button
                  className="modal-button"
                  onClick={() => {
                    setShowModal(false);
                    setShowLoginPage(true);
                  }}
                >
                  Login
                </button>
                <button
                  className="modal-button"
                  onClick={() => {
                    setShowModal(false);
                    setShowSignUpPage(true);
                  }}
                >
                  Sign Up
                </button>
                <button className="modal-button" onClick={handleStayAnonymous}>
                  Stay Anonymous
                </button>
              </div>
            </div>
          )}

          {/* Header Section */}
          <header className="app-header">
            <div className="app-logo-container">
              <img src="/logo.png" alt="NovaTutor Logo" className="app-logo" />
              <h1 className="app-title">Welcome to NovaTutor</h1>
            </div>
            <div className="header-buttons">
              {isLoggedIn ? (
                <button className="logout-button" onClick={handleLogout}>
                  Logout
                </button>
              ) : (
                <>
                  <button
                    className="login-button"
                    onClick={() => setShowLoginPage(true)} // Navigate to the login page
                  >
                    Login
                  </button>
                  <button
                    className="login-button"
                    onClick={() => setShowSignUpPage(true)} // Navigate to the sign-up page
                  >
                    Sign Up
                  </button>
                </>
              )}
            </div>
          </header>

          {/* Chatbot Section */}
          <Chatbot sessionId={sessionId} userId={userId} />

          {/* Footer Section */}
          <footer className="app-footer">
            <button
              className="footer-button"
              onClick={createNewChatbot} // Create a new chatbot session
            >
              Create New Chatbot
            
            </button>
            <button
              className="footer-button"
              onClick={() => setShowHistory(true)} // Navigate to the history page
            >
              View History
            </button>
          </footer>
        </>
      )}
    </div>
  );
};

export default App;