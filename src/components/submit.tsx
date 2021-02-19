import React, { FC } from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

const SubmitComponent: FC = ({ children }) => (
  <Grid container justify="flex-end">
    <Grid item>
      <Button type="submit" variant="contained" color="primary">
        {children}
      </Button>
    </Grid>
  </Grid>
);

export default SubmitComponent;
