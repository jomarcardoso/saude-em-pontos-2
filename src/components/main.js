import React from 'react';
import Box from '@material-ui/core/Box';

export default function Main({ children, ...restProps }) {
  return (
    <Box component="main" role="main" my={5} {...restProps}>
      {children}
    </Box>
  )
}