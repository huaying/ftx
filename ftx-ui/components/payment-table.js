import React from 'react';
import moment from 'moment';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

export default function PaymentTable({ payments }) {
  return (
    <TableContainer>
      <Table size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Time</TableCell>
            <TableCell>Market</TableCell>
            <TableCell align="right">Payment</TableCell>
            <TableCell align="right">Rate</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {payments.map((row) => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">
                {moment(row.time).format('M/D/YYYY, hh:mm A z')}
              </TableCell>
              <TableCell>{row.future}</TableCell>
              <TableCell align="right">{-1 * row.payment}</TableCell>
              <TableCell align="right">{row.rate}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
