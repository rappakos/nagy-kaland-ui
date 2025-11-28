import { useState } from 'react';

interface ConnectFormProps {
  onConnect: (playerNames: string[]) => void;
}

export function ConnectForm({ onConnect }: ConnectFormProps) {
  const [playerInput, setPlayerInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const names = playerInput.split(',').map(n => n.trim()).filter(n => n);
    if (names.length > 0) {
      onConnect(names);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ padding: '20px', maxWidth: '500px', margin: '0 auto' }}>
      <h2>Start New Game</h2>
      <p>Enter player names (comma-separated):</p>
      <input
        type="text"
        value={playerInput}
        onChange={(e) => setPlayerInput(e.target.value)}
        placeholder="Alice, Bob, Charlie"
        style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
      />
      <button type="submit" style={{ padding: '8px 16px' }}>
        Create Game
      </button>
    </form>
  );
}
