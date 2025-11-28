import type { Event } from '../types';

interface MessageListProps {
  logs: Event[];
}

export function MessageList({ logs }: MessageListProps) {
  return (
    <div style={{ flex: 1, overflowY: 'auto', padding: '10px', border: '1px solid #ccc' }}>
      <h3>Game Log</h3>
      {logs.length === 0 && <p>No events yet...</p>}
      {logs.map((event) => (
        <div key={event.id} style={{ marginBottom: '10px', padding: '5px', background: '#f0f0f0' }}>
          <strong>{event.type}</strong>
          <pre style={{ margin: 0, fontSize: '12px' }}>{JSON.stringify(event.payload, null, 2)}</pre>
        </div>
      ))}
    </div>
  );
}
