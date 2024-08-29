import { pixelArt } from '@dicebear/collection';
import { createAvatar } from '@dicebear/core';
import { useMemo } from 'react';

interface AvatarProps {
  seed: string;
  size?: number;
}

const Avatar = ({ seed, size = 32 }: AvatarProps) => {
  const avatar = useMemo(() => {
    return createAvatar(pixelArt, {
      size,
      seed,
    }).toDataUri();
  }, [seed, size]);

  return (
    <div
      style={{
        position: 'relative',
        width: size,
        height: size,
        borderRadius: '50%',
        overflow: 'hidden',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        backgroundColor: '#f0f0f0',
      }}
    >
      <img
        src={avatar}
        alt={`avatar of ${seed}`}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          borderRadius: '50%',
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, rgba(255,255,255,0.4), rgba(0,0,0,0.2))',
          mixBlendMode: 'overlay',
        }}
      />
    </div>
  );
};

export default Avatar;
