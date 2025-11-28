import type { Player } from '../types';

interface PlayerListProps {
  players: Player[];
  currentTurnIndex: number;
}

export function PlayerList({ players, currentTurnIndex }: PlayerListProps) {
  return (
    <div style={{ padding: '10px', borderBottom: '1px solid #ccc' }}>
      <h3>Players</h3>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {players.map((player, index) => (
          <li
            key={player.id}
            style={{
              padding: '5px',
              fontWeight: index === currentTurnIndex ? 'bold' : 'normal',
              color: index === currentTurnIndex ? 'green' : 'inherit',
            }}
          >
            {player.name} {index === currentTurnIndex && '← Current Turn'}
          </li>
        ))}
      </ul>
    </div>
  );
}
