import React from 'react';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';

export default function Main({ children, ...restProps }) {
  return (
    <Box component="main" role="main" my={5} {...restProps}>
      <Container maxWidth="sm">
        {children}
      </Container>
    </Box>
  )
}