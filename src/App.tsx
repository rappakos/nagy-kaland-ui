import { useState, useEffect } from 'react';
import { api } from './api';
import { ConnectForm } from './components/ConnectForm';
import { CharacterSelect } from './components/CharacterSelect';
import { ChatView } from './components/ChatView';
import './App.css';

type AppState = 'connect' | 'character-select' | 'game';

function App() {
  const [state, setState] = useState<AppState>('connect');
  const [playerName, setPlayerName] = useState<string>('');
  const [gameId, setGameId] = useState<string | null>(null);
  const [currentPlayerId, setCurrentPlayerId] = useState<string | null>(null);

  // Load saved game session from localStorage on mount
  useEffect(() => {
    const savedGameId = localStorage.getItem('gameId');
    const savedPlayerId = localStorage.getItem('playerId');
    const savedPlayerName = localStorage.getItem('playerName');
    
    if (savedGameId && savedPlayerId && savedPlayerName) {
      setGameId(savedGameId);
      setCurrentPlayerId(savedPlayerId);
      setPlayerName(savedPlayerName);
      setState('game');
    }
  }, []);

  // Save game session to localStorage whenever it changes
  useEffect(() => {
    if (gameId && currentPlayerId && playerName) {
      localStorage.setItem('gameId', gameId);
      localStorage.setItem('playerId', currentPlayerId);
      localStorage.setItem('playerName', playerName);
    }
  }, [gameId, currentPlayerId, playerName]);

  const handleConnect = async (playerNames: string[]) => {
    if (playerNames.length === 0) return;
    
    // For now, handle single player flow
    const name = playerNames[0];
    setPlayerName(name);
    setState('character-select');
  };

  const handleCharacterSelect = async (characterId: string | null) => {
    try {
      // Create game with the player
      const { game_id, players } = await api.createGame([playerName]);
      setGameId(game_id);
      
      if (players && players.length > 0) {
        const playerId = players[0].id;
        setCurrentPlayerId(playerId);
        
        // If character selected, assign it to the game
        if (characterId) {
          await api.selectCharacter(game_id, playerId, characterId);
        }
        
        setState('game');
      }
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to start game');
    }
  };

  const handleBack = () => {
    setState('connect');
    setPlayerName('');
  };

  const handleNewGame = () => {
    // Clear saved game and start fresh
    localStorage.removeItem('gameId');
    localStorage.removeItem('playerId');
    localStorage.removeItem('playerName');
    setGameId(null);
    setCurrentPlayerId(null);
    setPlayerName('');
    setState('connect');
  };

  if (state === 'connect') {
    return <ConnectForm onConnect={handleConnect} />;
  }

  if (state === 'character-select') {
    return (
      <CharacterSelect
        playerName={playerName}
        onSelectCharacter={handleCharacterSelect}
        onBack={handleBack}
      />
    );
  }

  if (state === 'game' && gameId && currentPlayerId) {
    return <ChatView gameId={gameId} currentPlayerId={currentPlayerId} onNewGame={handleNewGame} />;
  }

  return null;
}

export default App;
