import React from 'react';
import Table from '@material-ui/core/Table';
import Box from '@material-ui/core/Box';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { AminoAcids, TRANSLATED_AMINO_ACIDS } from '../services/food.service';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  cell: {
    padding: '8px 0',
  },
  lastCell: {
    padding: '8px 0',
    paddingRight: '4px !important',
  },
  bar: {
    minHeight: '20px',
  },
});

interface Props {
  aminoAcids: AminoAcids;
}

const AminoAcidsTable: React.SFC<Props> = ({ aminoAcids }) => {
  const classes = useStyles();
  const aminoAcidsArray = Object.entries(aminoAcids);
  const abundantAminoAcidFromPortion = Object.values(
    aminoAcids
  ).reduce((previous, current) => Math.max(previous, current));

  function renderRow([aminoAcid, quantity]) {
    const lowQuantity = quantity >= abundantAminoAcidFromPortion / 5;
    const regularQuantity = quantity >= (abundantAminoAcidFromPortion / 5) * 2;
    const highQuantity = quantity >= (abundantAminoAcidFromPortion / 5) * 3;
    const veryHighQuantity = quantity >= (abundantAminoAcidFromPortion / 5) * 4;

    return (
      <TableRow key={aminoAcid}>
        <TableCell component="th" scope="row">
          {TRANSLATED_AMINO_ACIDS[aminoAcid]}
        </TableCell>
        <TableCell className={classes.cell} align="right">
          {lowQuantity ? (
            <Box className={classes.bar} bgcolor="primary.main" />
          ) : (
            <Box className={classes.bar} />
          )}
        </TableCell>
        <TableCell className={classes.cell} align="right">
          {regularQuantity ? (
            <Box className={classes.bar} bgcolor="primary.main" />
          ) : (
            <Box className={classes.bar} />
          )}
        </TableCell>
        <TableCell className={classes.cell} align="right">
          {highQuantity ? (
            <Box className={classes.bar} bgcolor="primary.main" />
          ) : (
            <Box className={classes.bar} />
          )}
        </TableCell>
        <TableCell className={classes.lastCell} align="right">
          {veryHighQuantity ? (
            <Box className={classes.bar} bgcolor="primary.main" />
          ) : (
            <Box className={classes.bar} />
          )}
        </TableCell>
      </TableRow>
    );
  }

  return (
    <Paper variant="outlined">
      <TableContainer>
        <Table size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>Alimento</TableCell>
              <TableCell align="right">1</TableCell>
              <TableCell align="right">2</TableCell>
              <TableCell align="right">3</TableCell>
              <TableCell align="right">4</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{aminoAcidsArray.map(renderRow)}</TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default AminoAcidsTable;
