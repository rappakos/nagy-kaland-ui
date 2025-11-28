import { useState } from 'react';

interface MessageInputProps {
  playerId: string;
  onSendAction: (type: string, payload: Record<string, any>) => void;
}

export function MessageInput({ playerId, onSendAction }: MessageInputProps) {
  const [actionType, setActionType] = useState('');
  const [payloadInput, setPayloadInput] = useState('{}');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!actionType.trim()) return;
    
    try {
      const payload = JSON.parse(payloadInput);
      onSendAction(actionType, payload);
      setActionType('');
      setPayloadInput('{}');
    } catch (err) {
      alert('Invalid JSON payload');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ padding: '10px', borderTop: '1px solid #ccc' }}>
      <div style={{ marginBottom: '10px' }}>
        <label>
          Action Type:
          <input
            type="text"
            value={actionType}
            onChange={(e) => setActionType(e.target.value)}
            placeholder="move, attack, speak..."
            style={{ marginLeft: '10px', padding: '5px' }}
          />
        </label>
      </div>
      <div style={{ marginBottom: '10px' }}>
        <label>
          Payload (JSON):
          <textarea
            value={payloadInput}
            onChange={(e) => setPayloadInput(e.target.value)}
            style={{ marginLeft: '10px', padding: '5px', width: '100%', minHeight: '60px' }}
          />
        </label>
      </div>
      <button type="submit" style={{ padding: '8px 16px' }}>
        Send Action
      </button>
    </form>
  );
}
