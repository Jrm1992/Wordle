import React from 'react';

import { Box } from './style';

export default function LetterBox({
  Letter,
  CurrentBox
}: {
  Letter: string;
  CurrentBox: boolean;
}) {
  return <Box Active={CurrentBox}>{Letter.toUpperCase()}</Box>;
}
