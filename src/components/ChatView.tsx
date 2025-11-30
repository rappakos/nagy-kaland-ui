import { useState, useEffect } from 'react';
import type { GameState } from '../types';
import { api } from '../api';
import { PlayerList } from './PlayerList';
import { MessageList } from './MessageList';
import { MessageInput } from './MessageInput';
import { CharacterSheet } from './CharacterSheet';

interface ChatViewProps {
  gameId: string;
  currentPlayerId: string;
  onNewGame: () => void;
}

export function ChatView({ gameId, currentPlayerId, onNewGame }: ChatViewProps) {
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadGame = async () => {
    try {
      const state = await api.getGame(gameId);
      setGameState(state);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load game');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadGame();
  }, [gameId]);

  const handleSendMessage = async (message: string) => {
    if (!gameState) return;

    try {
      const updatedState = await api.applyAction(gameId, {
        player_id: currentPlayerId,
        message,
      });
      setGameState(updatedState);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send message');
    }
  };

  if (loading) return <div style={{ padding: '20px' }}>Loading game...</div>;
  if (error) return <div style={{ padding: '20px', color: 'red' }}>Error: {error}</div>;
  if (!gameState) return <div style={{ padding: '20px' }}>No game state</div>;

  const currentCharacter = gameState.characters[currentPlayerId] || null;

  return (
    <div style={{ display: 'flex', height: '100vh', flexDirection: 'column' }}>
      <div style={{ padding: '10px', borderBottom: '2px solid #333', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ margin: '0 0 5px 0' }}>Game: {gameId}</h2>
          <p style={{ margin: 0 }}>You are: {gameState.players.find(p => p.id === currentPlayerId)?.name || 'Unknown'}</p>
        </div>
        <button
          onClick={onNewGame}
          style={{
            padding: '8px 16px',
            backgroundColor: '#f44336',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '14px',
          }}
        >
          New Game
        </button>
      </div>
      <CharacterSheet 
        key={currentCharacter ? `${currentCharacter.name}-${currentCharacter.level}-${currentCharacter.experience}` : 'no-char'} 
        character={currentCharacter} 
      />
      <PlayerList players={gameState.players} currentTurnIndex={gameState.turn_index} />
      <MessageList logs={gameState.logs} />
      <MessageInput playerId={currentPlayerId} onSendMessage={handleSendMessage} />
    </div>
  );
}
