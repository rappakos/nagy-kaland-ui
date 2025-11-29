import { useState } from 'react';

interface Character {
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

interface CharacterSheetProps {
  character: Character | null;
}

export function CharacterSheet({ character }: CharacterSheetProps) {
  const [expanded, setExpanded] = useState(false);

  if (!character) {
    return (
      <div style={{ padding: '10px', borderBottom: '1px solid #ccc', background: '#a1bae2ff' }}>
        <p style={{ margin: 0, fontSize: '14px', color: '#666' }}>No character created yet</p>
      </div>
    );
  }

  const xpNeeded = 100 * character.level;
  const xpProgress = (character.experience / xpNeeded) * 100;

  return (
    <div style={{ padding: '12px', borderBottom: '2px solid #333', background: '#a1bae2ff' }}>
      {/* Compact View */}
      <div 
        style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}
        onClick={() => setExpanded(!expanded)}
      >
        {/* Avatar Placeholder */}
        <div 
          style={{ 
            width: '50px', 
            height: '50px', 
            borderRadius: '50%', 
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: '20px',
            fontWeight: 'bold'
          }}
        >
          {character.name[0].toUpperCase()}
        </div>

        {/* Basic Info */}
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 'bold', fontSize: '16px' }}>
            {character.name}
          </div>
          <div style={{ fontSize: '12px', color: '#666' }}>
            Level {character.level} {character.class_type}
          </div>
          {/* XP Bar */}
          <div style={{ marginTop: '4px', background: '#e0e0e0', height: '6px', borderRadius: '3px', overflow: 'hidden' }}>
            <div 
              style={{ 
                width: `${Math.min(xpProgress, 100)}%`, 
                height: '100%', 
                background: '#4caf50',
                transition: 'width 0.3s'
              }}
            />
          </div>
          <div style={{ fontSize: '10px', color: '#666', marginTop: '2px' }}>
            XP: {character.experience} / {xpNeeded}
          </div>
        </div>

        {/* Expand/Collapse Icon */}
        <div style={{ fontSize: '12px', color: '#666' }}>
          {expanded ? '▼' : '▶'}
        </div>
      </div>

      {/* Expanded View */}
      {expanded && (
        <div style={{ marginTop: '12px', paddingTop: '12px', borderTop: '1px solid #ddd' }}>
          {/* HP */}
          <div style={{ marginBottom: '8px' }}>
            <strong>HP:</strong> {character.hit_points} / {character.max_hit_points}
            <div style={{ marginTop: '4px', background: '#e0e0e0', height: '8px', borderRadius: '4px', overflow: 'hidden' }}>
              <div 
                style={{ 
                  width: `${(character.hit_points / character.max_hit_points) * 100}%`, 
                  height: '100%', 
                  background: '#f44336'
                }}
              />
            </div>
          </div>

          {/* Attributes */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', fontSize: '13px' }}>
            <div><strong>STR:</strong> {character.strength}</div>
            <div><strong>DEX:</strong> {character.dexterity}</div>
            <div><strong>CON:</strong> {character.constitution}</div>
            <div><strong>INT:</strong> {character.intelligence}</div>
            <div><strong>WIS:</strong> {character.wisdom}</div>
            <div><strong>CHA:</strong> {character.charisma}</div>
          </div>

          {/* Backstory */}
          {character.backstory && (
            <div style={{ marginTop: '8px', fontSize: '12px', fontStyle: 'italic', color: '#555' }}>
              <strong>Backstory:</strong> {character.backstory}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
