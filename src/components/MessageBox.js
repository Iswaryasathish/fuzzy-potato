// MessageBox.js
import React from 'react';
import './MessageBox.css'; // Make sure to create this CSS file

const MessageBox = ({ message, type, onClose }) => {
  if (!message) return null;

  return (
    <div className={`message-box ${type}`}>
      <span>{message}</span>
      <button onClick={onClose} className="close-button">&times;</button>
    </div>
  );
};

export default MessageBox;
