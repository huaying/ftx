import React from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import PaymentTable from '../components/payment-table';
import Summary from '../components/summary';

import styles from '../styles/home.module.css'

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box py={3}>{children}</Box>}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function Home({ accounts, total }) {
  const [accountValue, setAccountValue] = React.useState(0);

  const handleAccountChange = (event, newValue) => {
    setAccountValue(newValue);
  };

  return (
    <div className={styles.container}>
      <Paper variant="outlined">
        <Tabs value={accountValue} variant="scrollable" onChange={handleAccountChange}>
          <Tab key={"__"} label="Summary" {...a11yProps(0)} />
          {accounts.map((account, idx) =>
            <Tab key={"_" + account.name} label={account.name || "Main"} {...a11yProps(idx + 1)} />
          )}
        </Tabs>
      </Paper>
      <TabPanel value={accountValue} index={0} component="div">
        <Summary total={total} accounts={accounts}/>
      </TabPanel>
      {accounts.map((account, idx) =>
        <TabPanel key={idx+1} value={accountValue} index={idx + 1}>
          <PaymentTable payments={account.payments}/>
        </TabPanel>
      )}
    </div>
  )
}

export async function getServerSideProps() {
  const res = await fetch(`http://localhost:8000`)
  const { accounts, total } = await res.json();

  // Pass data to the page via props
  return { props: { accounts, total } }
}
