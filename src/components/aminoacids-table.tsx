import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { AminoAcids, TRANSLATED_AMINO_ACIDS } from '../services/food.service';

interface Props {
  aminoAcids: AminoAcids;
}

const AminoAcidsTable: React.SFC<Props> = ({ aminoAcids }) => {
  const aminoAcidsArray = Object.entries(aminoAcids);
  const abundantAminoAcidFromPortion = Object.values(
    aminoAcids
  ).reduce((previous, current) => Math.max(previous, current));

  function renderRow([aminoAcid, quantity]) {
    return (
      <TableRow key={aminoAcid}>
        <TableCell component="th" scope="row">
          {TRANSLATED_AMINO_ACIDS[aminoAcid]}
        </TableCell>
        <TableCell align="right">{quantity}</TableCell>
      </TableRow>
    );
  }

  return (
    <TableContainer component={Paper}>
      <Table size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Alimento</TableCell>
            <TableCell align="right">1</TableCell>
            <TableCell align="right">2</TableCell>
            <TableCell align="right">3</TableCell>
            <TableCell align="right">4</TableCell>
            <TableCell align="right">5</TableCell>
            <TableCell align="right">6</TableCell>
            <TableCell align="right">7</TableCell>
            <TableCell align="right">8</TableCell>
            <TableCell align="right">9</TableCell>
            <TableCell align="right">10</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>{aminoAcidsArray.map(renderRow)}</TableBody>
      </Table>
    </TableContainer>
  );
};

export default AminoAcidsTable;
