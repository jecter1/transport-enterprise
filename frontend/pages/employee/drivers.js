import Head from "next/head";
import Header from "../../components/Header";
import { Button, Grid, Typography } from "@mui/material";
import DriverTable from "../../components/DriverTable";
import React from "react";
import getData from "../../util/getData";
import { useEffect } from "react";
import { FormControl } from "@mui/material";
import { InputLabel } from "@mui/material";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

export default function Drivers() {
  const [rows, setRows] = React.useState([{}]);
  const [transports, setTransports] = React.useState([]);
  const [transportId, setTransportId] = React.useState(0);
  
  useEffect(() => {
    getData('employee/drivers', setRows);
    getData('transport/all', setTransports);
  }, [])

  const handleClick = () => {
    getData(('employee/drivers'), setRows, {transportId: transportId});
  };

  return (
    <>
      <Head>
        <title>Распределение водителей</title>
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
                Распределение водителей
              </Typography>
            </Grid>
            <Grid container style={{height: '0.5%'}}>
            </Grid>
            <Grid container justifyContent="center" alignItems="center" style={{width: '100%', height: '85%', backgroundColor: "#222533"}}>
              <DriverTable rows={rows}/>
            </Grid>
          </Grid>
          <Grid container justifyContent="center" alignItems="center" style={{width: '17%', height: '100%', backgroundColor: "#222533"}}>
            <Typography color="#ffffff" fontSize={16}>
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      
    </>
  );
}