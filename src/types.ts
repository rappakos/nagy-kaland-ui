export interface Player {
  id: string;
  name: string;
}

export interface Action {
  player_id: string;
  type: string;
  payload: Record<string, any>;
}

export interface Event {
  id: string;
  type: string;
  payload: Record<string, any>;
}

export interface GameState {
  game_id: string;
  players: Player[];
  turn_index: number;
  logs: Event[];
  meta: Record<string, any>;
}

export interface CreateGameRequest {
  player_names: string[];
}

export interface CreateGameResponse {
  game_id: string;
  players: Player[];
}
