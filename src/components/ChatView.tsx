import { useState, useEffect } from 'react';
import type { GameState } from '../types';
import { api } from '../api';
import { PlayerList } from './PlayerList';
import { MessageList } from './MessageList';
import { MessageInput } from './MessageInput';

interface ChatViewProps {
  gameId: string;
  currentPlayerId: string;
}

export function ChatView({ gameId, currentPlayerId }: ChatViewProps) {
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

  const handleSendAction = async (type: string, payload: Record<string, any>) => {
    if (!gameState) return;

    try {
      const updatedState = await api.applyAction(gameId, {
        player_id: currentPlayerId,
        type,
        payload,
      });
      setGameState(updatedState);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send action');
    }
  };

  if (loading) return <div style={{ padding: '20px' }}>Loading game...</div>;
  if (error) return <div style={{ padding: '20px', color: 'red' }}>Error: {error}</div>;
  if (!gameState) return <div style={{ padding: '20px' }}>No game state</div>;

  return (
    <div style={{ display: 'flex', height: '100vh', flexDirection: 'column' }}>
      <div style={{ padding: '10px', borderBottom: '2px solid #333' }}>
        <h2>Game: {gameId}</h2>
        <p>You are: {gameState.players.find(p => p.id === currentPlayerId)?.name || 'Unknown'}</p>
      </div>
      <PlayerList players={gameState.players} currentTurnIndex={gameState.turn_index} />
      <MessageList logs={gameState.logs} />
      <MessageInput playerId={currentPlayerId} onSendAction={handleSendAction} />
    </div>
  );
}
