import type { Event } from '../types';

interface MessageListProps {
  logs: Event[];
}

export function MessageList({ logs }: MessageListProps) {
  return (
    <div style={{ flex: 1, overflowY: 'auto', padding: '10px', border: '1px solid #ccc' }}>
      <h3>Game Log</h3>
      {logs.length === 0 && <p>No messages yet...</p>}
      {logs.map((event) => {
        const isPlayerMessage = event.type === 'player_message';
        const message = event.payload.message || JSON.stringify(event.payload);
        const playerId = event.payload.player_id;
        
        return (
          <div 
            key={event.id} 
            style={{ 
              marginBottom: '10px', 
              padding: '8px', 
              background: isPlayerMessage ? '#99e949ff' : '#dd964aff',
              borderRadius: '4px',
              borderLeft: `4px solid ${isPlayerMessage ? '#2196f3' : '#8bc34a'}`
            }}
          >
            <div style={{ fontSize: '11px', color: '#666', marginBottom: '4px' }}>
              {isPlayerMessage ? `Player ${playerId}` : 'DM'}
            </div>
            <div>{message}</div>
          </div>
        );
      })}
    </div>
  );
}
