import { useState } from 'react';
import { api } from './api';
import { ConnectForm } from './components/ConnectForm';
import { ChatView } from './components/ChatView';
import './App.css';

function App() {
  const [gameId, setGameId] = useState<string | null>(null);
  const [currentPlayerId, setCurrentPlayerId] = useState<string | null>(null);

  const handleConnect = async (playerNames: string[]) => {
    try {
      const { game_id } = await api.createGame(playerNames);
      setGameId(game_id);
      // For MVP: assume first player is the current user
      setCurrentPlayerId('player_0');
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to create game');
    }
  };

  if (!gameId || !currentPlayerId) {
    return <ConnectForm onConnect={handleConnect} />;
  }

  return <ChatView gameId={gameId} currentPlayerId={currentPlayerId} />;
}

export default App;
