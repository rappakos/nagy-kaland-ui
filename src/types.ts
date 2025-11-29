export interface Player {
  id: string;
  name: string;
}

export interface Character {
  name: string;
  class_type: string;
  level: number;
  experience: number;
  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charisma: number;
  hit_points: number;
  max_hit_points: number;
  backstory?: string;
}

export interface Action {
  player_id: string;
  message: string;
}

export interface Event {
  id: string;
  type: string;
  payload: Record<string, any>;
}

export interface GameState {
  game_id: string;
  players: Player[];
  characters: Record<string, Character | null>;
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
