import Head from "next/head";
import Header from "../../../components/Header";
import { Button, Grid, Typography } from "@mui/material";
import EmployeeTable from "../../../components/EmployeeRepairsTable";
import React from "react";
import getData from "../../../util/getData";
import { useEffect } from "react";
import { useRouter } from 'next/router';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TextField } from "@mui/material";
import ruLocale from 'date-fns/locale/ru';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { FormControl } from "@mui/material";
import { InputLabel } from "@mui/material";
import Link from 'next/link';

function formatDate(date) {
  if (date) {
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();

    if (isNaN(year)) {
      return;
    }

    let res = "" + year;
    if (month < 9) {
      res = res + "0";
    }
    res = res + (month + 1);
    if (day < 10) {
      res = res + "0";
    }
    res = res + day;

    return res;
  }
}


export default function EmployeeRepair() {
  const [repairs, setRepairs] = React.useState([]);
  const [employee, setEmployee] = React.useState([]);
  const [transports, setTransports] = React.useState([]);
  const [fromValue, setFromValue] = React.useState(null);
  const [toValue, setToValue] = React.useState(null);
  const [transportId, setTransportId] = React.useState('');
  const router = useRouter();

  useEffect(() => { 
    const fetchData = async () => {
      if (router.isReady) {
        const { id } = router.query;
        await getData(('employee/' + id), setEmployee);
        await getData(('employee/repairs'), setRepairs, {id: id});
        await getData(('transport/all'), setTransports);
      }
    }
    fetchData();
  }, [router.isReady]);

  const handleClick = async () => {
    if (router.isReady) {
      const { id } = router.query;
      await getData(('employee/repairs'), setRepairs, {id: id, from: formatDate(fromValue), to: formatDate(toValue), transportId: transportId});
    }
  };

  return (
    <>
      <Head>
        <title>Ремонтные работы | {employee["name"]}</title>
      </Head>

      <Grid container direction="column" style={{
        height: "100vh",
        width: '100vw'
      }}>
        <Grid container style={{height: '6.6%'}}>
          <Header/>
        </Grid>
        <Grid container justifyContent="space-between" alignItems="center" direction="row" style={{
          height: "93.4%",
          width: '100%'
        }}>
          <Grid container direction="column" justifyContent="center" alignItems="center" style={{width: '17%', height: '100%', backgroundColor: "#222533"}}>
            <Grid container justifyContent="center" alignItems="center" style={{height: '10%', width: '80%'}}>
              <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ruLocale}>
                <DatePicker label="с"
                            value={fromValue}
                            onChange={(newValue) => {
                              setFromValue(newValue);
                            }}
                            renderInput={(params) => <TextField {...params} sx={{svg: {color: "#ffffff"}, input: {color: "#ffffff"}, label: {color: "#ffffff"}}} />}/>
              </LocalizationProvider>
            </Grid>
            <Grid container justifyContent="center" alignItems="center" style={{height: '10%', width: '80%'}}>
              <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ruLocale}>
                <DatePicker label="по"
                            value={toValue}
                            onChange={(newValue) => {
                              setToValue(newValue);
                            }}
                            renderInput={(params) => <TextField {...params} sx={{svg: {color: "#ffffff"}, input: {color: "#ffffff"}, label: {color: "#ffffff"}}} />}/>
              </LocalizationProvider>
            </Grid>
            <Grid container justifyContent="center" alignItems="center" style={{height: '10%', width: '100%'}}>
              <FormControl fullWidth style={{width: '80%'}} sx={{svg: {color: "#ffffff"}, input: {color: "#ffffff"}, label: {color: "#ffffff"}}}>
                <InputLabel id="demo-simple-select-label">транспорт</InputLabel>
                <Select value={transportId}
                        label="транспорт"
                        onChange={(event) => {
                          setTransportId(event.target.value)
                        }}
                        style={{color: "#ffffff"}}
                        MenuProps={{
                          PaperProps: {
                            style: {
                              maxHeight: '30%',
                              width: '20%',
                            },
                          },
                        }}>
                  <MenuItem value={0}>
                    Все
                  </MenuItem>
                  {
                    transports
                    ?
                    transports.map((transport) => {
                      return (
                        <MenuItem value={transport["id"]} style={{width: "100%"}}>
                          {transport["brand"] + " " + transport["model"] + " " + transport["color"] + " " + (transport["number"] ? transport["number"] : " ")}
                        </MenuItem>
                      );
                    })
                    :
                    <></>
                  }
                </Select>
              </FormControl>
            </Grid>
            <Grid container justifyContent="center" alignItems="center" style={{height: '10%'}}>
              <Button variant="text"
                      style={{textTransform: 'none', 
                              color: '#ffffff', 
                              backgroundColor: "#2b2f40", 
                              fontSize: 14}} 
                      disableRipple
                      disableElevation
                      sx={{textTransform: 'none', 
                          textColor: 'white',
                          height: '40%',
                          width: '50%'}}
                          onClick={handleClick}>
                Применить
              </Button>
            </Grid>
          </Grid>
          <Grid container direction="column" justifyContent="center" alignItems="center" style={{width: '60%', height: '100%', backgroundColor: "#1a1c26"}}>
            <Grid container justifyContent="center" alignItems="center" style={{width: '100%', height: '5%', backgroundColor: "#222533"}}>
              <Typography color="#ffffff" fontSize={18}>
                {employee["name"]} → Ремонтные работы
              </Typography>
            </Grid>
            <Grid container style={{height: '0.5%'}}>
            </Grid>
            <Grid container justifyContent="center" alignItems="center" style={{width: '100%', height: '85%', backgroundColor: "#222533"}}>
              <EmployeeTable rows={repairs}/>
            </Grid>
          </Grid>
          <Grid container justifyContent="center" alignItems="center" style={{width: '17%', height: '100%', backgroundColor: "#222533"}}>
            <Link href={"/employee/" + employee["id"]} passHref>
              <Button variant="text"
                      style={{textTransform: 'none', 
                              color: '#ffffff', 
                              backgroundColor: "#2b2f40", 
                              fontSize: 14}} 
                      disableRipple
                      disableElevation>
                Страница сотрудника
              </Button>
            </Link>
          </Grid>
        </Grid>
      </Grid>
      
    </>
  );
}