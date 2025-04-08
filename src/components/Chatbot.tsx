import React, { useState } from 'react';
import { sendMessageToDialogflow } from '../services/dialogflowService';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import './Chatbot.css';

const Chatbot: React.FC<{ sessionId: string; userId: string }> = ({ sessionId, userId }) => {
  const [messages, setMessages] = useState<{ text: string; sender: string }[]>([]);
  const [input, setInput] = useState('');
  const db = getFirestore(); // Initialize Firestore

  const saveMessageToFirestore = async (text: string, sender: string) => {
    try {
      await addDoc(collection(db, 'chatHistory'), {
        sessionId,
        userId,
        text,
        sender,
        timestamp: new Date(), // Add a timestamp for sorting
      });
    } catch (error) {
      console.error('Error saving message to Firestore:', error);
    }
  };

  const handleSendMessage = async () => {
    if (input.trim() === '') return;

    const userMessage = { text: input, sender: 'user' };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    // Save user message to Firestore
    await saveMessageToFirestore(input, 'user');

    try {
      // Fetch the response from Dialogflow
      const botResponse = await sendMessageToDialogflow(input);
      const botMessage = { text: botResponse, sender: 'bot' };
      setMessages((prevMessages) => [...prevMessages, botMessage]);

      // Save bot message to Firestore
      await saveMessageToFirestore(botResponse, 'bot');
    } catch (error) {
      console.error('Error communicating with Dialogflow:', error);
      const errorMessage = { text: 'Oops! Something went wrong.', sender: 'bot' };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);

      // Save error message to Firestore
      await saveMessageToFirestore('Oops! Something went wrong.', 'bot');
    }

    setInput('');
  };

  return (
    <div className="chatbot">
      <div className="chatbot-messages">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.sender}`}>
            {message.text}
          </div>
        ))}
      </div>
      <div className="chatbot-input">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
          placeholder="Type a message..."
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Chatbot;