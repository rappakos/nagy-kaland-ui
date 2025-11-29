import { useState } from 'react';

interface ConnectFormProps {
  onConnect: (playerNames: string[]) => void;
}

export function ConnectForm({ onConnect }: ConnectFormProps) {
  const [playerInput, setPlayerInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const name = playerInput.trim();
    if (name) {
      onConnect([name]);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ padding: '20px', maxWidth: '500px', margin: '0 auto' }}>
      <h2>Welcome to Nagy Kaland!</h2>
      <p>Enter your name to begin your adventure:</p>
      <input
        type="text"
        value={playerInput}
        onChange={(e) => setPlayerInput(e.target.value)}
        placeholder="Your name"
        style={{ width: '100%', padding: '10px', marginBottom: '15px', fontSize: '16px' }}
        autoFocus
      />
      <button
        type="submit"
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          backgroundColor: '#4CAF50',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          width: '100%',
        }}
      >
        Continue
      </button>
    </form>
  );
}
