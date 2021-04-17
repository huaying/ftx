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

function formattedDollar(num) {
  return `$${parseFloat(Math.abs(num).toFixed(4)).toLocaleString()}`
}

export default function Summary({ accounts, total }) {
  const paymentMap = {};
  accounts.forEach(account => {
    account.payments.forEach((payment, idx) => {
      if (paymentMap[payment.time] === undefined) {
        paymentMap[payment.time] = { time: payment.time, payment: payment.payment };
      } else {
        paymentMap[payment.time].payment += payment.payment
      }
    });
  });

  const totalPayments = Object.values(paymentMap).sort((a, b) => moment(b.time) - moment(a.time)).slice(0, 48);

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
                <Typography component="p">Total Net USD value ≈ </Typography>
                <Typography component="h2" variant="h4">
                  {formattedDollar(total)}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Card className={styles.card} variant="outlined">
              <CardContent>
                <Typography component="p">Profit Yesterday: {formattedDollar(yesterdayProfit)}</Typography>
                <Typography component="p">Profit Today:</Typography>
                <Typography variant="h4">
                  {formattedDollar(profit)}
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
              {totalPayments.map((row, idx) => (
                <TableRow key={idx}>
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
