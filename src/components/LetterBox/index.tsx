import React from 'react';

import { Box } from './style';

export default function LetterBox({
  Letter,
  CurrentBox,
  BGColor
}: {
  Letter: string;
  CurrentBox: boolean;
  BGColor: string | undefined;
}) {
  return (
    <Box isActive={CurrentBox} BGColor={BGColor}>
      {Letter.toUpperCase()}
    </Box>
  );
}
