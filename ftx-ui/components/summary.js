import React from 'react';
import moment from 'moment';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';

import styles from '../styles/summary.module.css'

function getProfit(payments, date) {
  return payments.filter(p => moment(p.time).format('M/D/YYYY') === date).reduce((accu, cur) => accu + cur.payment, 0);
}

export default function Summary({ accounts, total }) {
  const totalPayments = [];

  accounts.forEach(account => {
    account.payments.forEach((payment, idx) => {
      console.log(payment.paymnet)
      if (idx >= totalPayments.length) {
        totalPayments.push({ time: payment.time, payment: payment.payment });
      } else {
        totalPayments[idx].payment += payment.payment;
      }
    })
  })

  const today = moment().format('M/D/YYYY');
  const yesterday = moment().subtract(1, 'days').format('M/D/YYYY');
  const profit = getProfit(totalPayments, today);
  const yesterdayProfit = getProfit(totalPayments, yesterday);
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Grid container spacing={3} >
          <Grid item xs={12} sm={6}>
            <Card className={styles.card} variant="outlined">
              <CardContent>
                <Typography>Total Net USD value ≈ </Typography>
                <Typography variant="h4">
                  ${total.toFixed(4)}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Card className={styles.card} variant="outlined">
              <CardContent>
                <Typography>Profit Yesterday: ${-1 * yesterdayProfit.toFixed(4)}</Typography>
                <Typography>Profit Today:</Typography>
                <Typography variant="h4">
                  ${-1 * profit.toFixed(4)}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Time</TableCell>
                <TableCell align="right">Payment</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {totalPayments.map((row) => (
                <TableRow key={row.id}>
                  <TableCell component="th" scope="row">
                    {moment(row.time).format('M/D/YYYY, hh:mm A z')}
                  </TableCell>
                  <TableCell align="right">{-1 * row.payment.toFixed(4)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
}
