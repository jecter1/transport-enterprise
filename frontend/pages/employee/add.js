import Head from "next/head";
import Header from "../../components/Header";
import { Grid, Typography } from "@mui/material";
import { useRouter } from 'next/router';
import React from "react";
import getData from "../../util/getData";
import { useEffect } from "react";
import { Button } from "@mui/material";
import { Box } from "@mui/material";

function CustomButton(props) {
  return (
    <Button variant="text"
            style={{textTransform: 'none', 
                    color: "#ffffff", 
                    backgroundColor: "#2b2f40", 
                    fontSize: 18,
                    width: '80%',
                    margin: 10}} 
            disableRipple
            disableElevation>
      {props.label}
    </Button>
  );
}

export default function AddEmployee() {
  const [data, setData] = React.useState({});

  return (
    <>
      <Head>
        <title>Добавление сотрудника</title>
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
          width: '100%', 
          backgroundColor: "#1a1c26"
        }}>
          <Grid container style={{width: '17%', height: '100%', backgroundColor: "#222533"}}>
            <Grid container justifyContent="center" alignItems="center" style={{width: '100%', height: '5%', backgroundColor: "#222533"}}>
            </Grid>
            <Box container direction="row" justifyContent="center" alignItems="flex-start" style={{width: '100%', height: '95%', overflow: 'auto'}}>
            </Box>
          </Grid>
          <Grid container direction="column" justifyContent="center" alignItems="center" style={{width: '60%', height: '100%'}}>
            <Grid container justifyContent="center" alignItems="center" style={{width: '50%', height: '5%', backgroundColor: "#222533"}}>
              <Typography color="#ffffff" fontSize={18}>
                Добавление сотрудника → Выбор специализации
              </Typography>
            </Grid>
            <Grid container style={{height: '0.5%'}}>
            </Grid>
            <Grid container direction="column" justifyContent="center" alignItems="center" style={{width: '50%', height: '50%', backgroundColor: "#222533"}}>
              <CustomButton label="Водитель"/>
              <CustomButton label="Техник"/>
              <CustomButton label="Слесарь"/>
              <CustomButton label="Сборщик"/>
              <CustomButton label="Сварщик"/>
              <CustomButton label="Нет специализации"/>
            </Grid>
          </Grid>
          <Grid container style={{width: '17%', height: '100%', backgroundColor: "#222533"}}>
            <Grid container justifyContent="center" alignItems="center" style={{width: '100%', height: '5%'}}>
            </Grid>
            <Box container direction="row" justifyContent="center" alignItems="flex-start" style={{width: '100%', height: '95%', overflow: 'auto'}}>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
