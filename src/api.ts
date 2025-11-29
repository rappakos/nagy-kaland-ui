import type { CreateGameRequest, CreateGameResponse, GameState, Action } from './types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export const api = {
  async createGame(playerNames: string[]): Promise<CreateGameResponse> {
    const response = await fetch(`${API_URL}/games`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ player_names: playerNames } as CreateGameRequest),
    });
    if (!response.ok) throw new Error('Failed to create game');
    return response.json();
  },

  async getGame(gameId: string): Promise<GameState> {
    const response = await fetch(`${API_URL}/games/${gameId}`);
    if (!response.ok) throw new Error('Failed to get game');
    return response.json();
  },

  async applyAction(gameId: string, action: Action): Promise<GameState> {
    const response = await fetch(`${API_URL}/games/${gameId}/action`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(action),
    });
    if (!response.ok) throw new Error('Failed to apply action');
    return response.json();
  },

  async listCharacters(playerName: string): Promise<{ player_name: string; characters: Array<{ id: string; name: string; class_type: string; level: number; created_at: string }> }> {
    const response = await fetch(`${API_URL}/characters/${encodeURIComponent(playerName)}`);
    if (!response.ok) throw new Error('Failed to list characters');
    return response.json();
  },

  async getCharacter(playerName: string, characterId: string): Promise<any> {
    const response = await fetch(`${API_URL}/characters/${encodeURIComponent(playerName)}/${characterId}`);
    if (!response.ok) throw new Error('Failed to get character');
    return response.json();
  },

  async selectCharacter(gameId: string, playerId: string, characterId: string): Promise<any> {
    const response = await fetch(`${API_URL}/games/${gameId}/select-character/${playerId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ character_id: characterId }),
    });
    if (!response.ok) throw new Error('Failed to select character');
    return response.json();
  },
};
