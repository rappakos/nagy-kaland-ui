import { useState, useEffect } from 'react';
import { api } from '../api';

interface CharacterListItem {
  id: string;
  name: string;
  class_type: string;
  level: number;
  created_at: string;
}

interface CharacterSelectProps {
  playerName: string;
  onSelectCharacter: (characterId: string | null) => void;
  onBack: () => void;
}

export function CharacterSelect({ playerName, onSelectCharacter, onBack }: CharacterSelectProps) {
  const [characters, setCharacters] = useState<CharacterListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  useEffect(() => {
    loadCharacters();
  }, [playerName]);

  const loadCharacters = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await api.listCharacters(playerName);
      setCharacters(data.characters);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load characters');
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = (id: string) => {
    setSelectedId(id);
  };

  const handleContinue = () => {
    onSelectCharacter(selectedId);
  };

  const handleCreateNew = () => {
    onSelectCharacter(null);
  };

  if (loading) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <p>Loading characters...</p>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h2>Welcome, {playerName}!</h2>
      
      {error && (
        <div style={{ color: 'red', marginBottom: '10px' }}>
          {error}
        </div>
      )}

      {characters.length > 0 ? (
        <>
          <p>Select an existing character or create a new one:</p>
          
          <div style={{ marginBottom: '20px' }}>
            {characters.map((char) => (
              <div
                key={char.id}
                onClick={() => handleSelect(char.id)}
                style={{
                  border: selectedId === char.id ? '2px solid #4CAF50' : '1px solid #ddd',
                  borderRadius: '8px',
                  padding: '15px',
                  marginBottom: '10px',
                  cursor: 'pointer',
                  backgroundColor: selectedId === char.id ? '#f0f8f0' : 'white',
                  transition: 'all 0.2s',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <strong style={{ fontSize: '18px' }}>{char.name}</strong>
                    <div style={{ color: '#666', marginTop: '5px' }}>
                      Level {char.level} {char.class_type}
                    </div>
                  </div>
                  <div style={{ textAlign: 'right', fontSize: '12px', color: '#999' }}>
                    {new Date(char.created_at).toLocaleDateString()}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '10px', justifyContent: 'space-between' }}>
            <button
              onClick={onBack}
              style={{
                padding: '10px 20px',
                backgroundColor: '#999',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              Back
            </button>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                onClick={handleCreateNew}
                style={{
                  padding: '10px 20px',
                  backgroundColor: '#2196F3',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                }}
              >
                Create New Character
              </button>
              <button
                onClick={handleContinue}
                disabled={!selectedId}
                style={{
                  padding: '10px 20px',
                  backgroundColor: selectedId ? '#4CAF50' : '#ccc',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: selectedId ? 'pointer' : 'not-allowed',
                }}
              >
                Continue with Selected
              </button>
            </div>
          </div>
        </>
      ) : (
        <>
          <p>You don't have any characters yet. Let's create your first one!</p>
          <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
            <button
              onClick={onBack}
              style={{
                padding: '10px 20px',
                backgroundColor: '#999',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              Back
            </button>
            <button
              onClick={handleCreateNew}
              style={{
                padding: '10px 20px',
                backgroundColor: '#4CAF50',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              Create Character
            </button>
          </div>
        </>
      )}
    </div>
  );
}
