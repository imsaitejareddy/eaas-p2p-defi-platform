import React, { useState } from 'react';
import axios from 'axios';

const Chat = () => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  const sendQuestion = async () => {
    const res = await axios.post('http://localhost:8080/ai/ask', { question });
    setAnswer(res.data.answer);
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h1>AI Assistant</h1>
      <textarea
        rows={4}
        style={{ width: '100%' }}
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Ask a question about your energy usage, DeFi or the market..."
      />
      <button onClick={sendQuestion}>Send</button>
      {answer && (
        <div>
          <h3>Answer:</h3>
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
};

export default Chat;
