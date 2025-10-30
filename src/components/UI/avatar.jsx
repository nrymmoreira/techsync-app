import React from 'react';
import styled from 'styled-components';
import { getTheme } from '../../styles/themes';

const AvatarRoot = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 999px;
  overflow: hidden;
  background: ${(p) => getTheme(p.$isDarkMode).colors.primary || '#F97316'};
  color: ${(p) => getTheme(p.$isDarkMode).colors.background || '#fff'};
  font-weight: 600;
`;

export default function Avatar({ name, src, size = 40, className, $isDarkMode }) {
  const initials = name
    ? name
        .split(' ')
        .map((s) => s[0])
        .slice(0, 2)
        .join('')
        .toUpperCase()
    : 'U';

  return (
    <AvatarRoot
      className={className}
      style={{ width: size, height: size, fontSize: Math.round(size / 2.6) }}
      $isDarkMode={$isDarkMode}
      aria-hidden={!name}
    >
      {src ? <img src={src} alt={name || 'Avatar'} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : initials}
    </AvatarRoot>
  );
}
