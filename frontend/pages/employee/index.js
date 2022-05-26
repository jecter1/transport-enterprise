import Head from "next/head";
import Header from "../../components/Header";
import { Grid, Typography } from "@mui/material";
import EmployeeTable from "../../components/EmployeeTable";
import React from "react";
import getData from "../../util/getData";
import { useEffect } from "react";

export default function All() {
  const [rows, setRows] = React.useState([{}]);
  
  useEffect(() => {
      getData('employee/all', setRows)
  }, [])

  return (
    <>
      <Head>
        <title>Список сотрудников</title>
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
          <Grid container justifyContent="center" alignItems="center" style={{width: '17%', height: '100%', backgroundColor: "#222533"}}>
            <Typography color="#ffffff" fontSize={16}>
            </Typography>
          </Grid>
          <Grid container direction="column" justifyContent="center" alignItems="center" style={{width: '60%', height: '100%', backgroundColor: "#1a1c26"}}>
            <Grid container justifyContent="center" alignItems="center" style={{width: '100%', height: '5%', backgroundColor: "#222533"}}>
              <Typography color="#ffffff" fontSize={18}>
                Список сотрудников
              </Typography>
            </Grid>
            <Grid container style={{height: '0.5%'}}>
            </Grid>
            <Grid container justifyContent="center" alignItems="center" style={{width: '100%', height: '85%', backgroundColor: "#222533"}}>
              <EmployeeTable rows={rows}/>
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