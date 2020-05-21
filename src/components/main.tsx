import React from 'react';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';

const Main: React.SFC = ({ children, ...restProps }) => (
  <Box component="main" role="main" my={5} {...restProps}>
    <Container maxWidth="md">{children}</Container>
  </Box>
);

export default Main;
