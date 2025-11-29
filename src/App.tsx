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
      const { game_id, players } = await api.createGame(playerNames);
      setGameId(game_id);
      // Use the actual first player ID from the response
      if (players && players.length > 0) {
        setCurrentPlayerId(players[0].id);
      }
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
