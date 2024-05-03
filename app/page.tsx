'use client'
import styles from "./page.module.css";
import React, { useState } from "react";
import Dashboard from "./dashboard/page";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Accounts from "./components/Accounts";
import AccountDetail from "./components/AccountDetail";
import { useForm } from 'react-hook-form';
import { WitdrawButtonandInput } from "./components/WithdrawButtonandInput";
import { AddressInput, TcknInput } from "./components/Input";
import {  ClearSaveButton } from "./components/Buttons";
import Navigation from "./components/Navigation";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography component="div">{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}


export default function Home() {

  const [message, setMessage] = useState("")

  const [value, setValue] = React.useState(0);

  const {register,watch}=useForm();

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <main className={styles.main}>
      <Navigation/>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs className="my-5" value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Kişisel Bilgiler" {...a11yProps(0)} />
          <Tab label="Hesap Bilgileri" {...a11yProps(1)} />
          <Tab label="tckn Bilgileri" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <Dashboard/>
        <div>
            <AddressInput register={register}/>
            <ClearSaveButton/>
        </div>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <div>
          <Dashboard/>
          <Accounts register={register}/>
        </div>
        
        <AccountDetail/>
        <WitdrawButtonandInput register={register}/>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <TcknInput register={register}/>
        <ClearSaveButton/>
      </CustomTabPanel>
    </main>
  );
}
