import { useState } from 'react';

interface MessageInputProps {
  playerId: string;
  onSendMessage: (message: string) => void;
}

export function MessageInput({ playerId, onSendMessage }: MessageInputProps) {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    
    onSendMessage(message);
    setMessage('');
  };

  return (
    <form onSubmit={handleSubmit} style={{ padding: '10px', borderTop: '1px solid #ccc', display: 'flex', gap: '10px' }}>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message..."
        style={{ flex: 1, padding: '8px' }}
      />
      <button type="submit" style={{ padding: '8px 16px' }}>
        Send
      </button>
    </form>
  );
}
