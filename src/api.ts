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
};
