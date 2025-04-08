import React, { useEffect, useState } from 'react';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';

const History: React.FC<{ userId: string }> = ({ userId }) => {
  const [sessions, setSessions] = useState<{ sessionId: string; messages: { text: string; sender: string }[] }[]>([]);
  const db = getFirestore();

  useEffect(() => {
    const fetchHistory = async () => {
      const q = query(collection(db, 'chatHistory'), where('userId', '==', userId));
      const querySnapshot = await getDocs(q);

      const sessionMap: { [key: string]: { text: string; sender: string }[] } = {};
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        if (!sessionMap[data.sessionId]) {
          sessionMap[data.sessionId] = [];
        }
        sessionMap[data.sessionId].push({ text: data.text, sender: data.sender });
      });

      const sessionArray = Object.keys(sessionMap).map((sessionId) => ({
        sessionId,
        messages: sessionMap[sessionId],
      }));
      setSessions(sessionArray);
    };

    fetchHistory();
  }, [db, userId]);

  return (
    <div>
      <h2>Chat History</h2>
      {sessions.map((session) => (
        <div key={session.sessionId}>
          <h3>Session {session.sessionId}</h3>
          {session.messages.map((message, index) => (
            <p key={index}>
              <strong>{message.sender === 'user' ? 'You' : 'Bot'}:</strong> {message.text}
            </p>
          ))}
        </div>
      ))}
    </div>
  );
};

export default History;