import Head from "next/head";
import Header from "../../components/Header";
import HierarchyTable from "../../components/HierarchyTable";
import { Grid, Typography } from "@mui/material";
import React from "react";
import getData from "../../util/getData";
import { useEffect } from "react";

export default function Hierarchy() {
  const [rows, setRows] = React.useState([{}]);
  
  useEffect(() => {
      getData('employee/hierarchy', setRows)
  }, [])

  return (
    <>
      <Head>
        <title>Подчиненность сотрудников</title>
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
                Подчиненность сотрудников
              </Typography>
            </Grid>
            <Grid container style={{height: '0.5%'}}>
            </Grid>
            <Grid container justifyContent="center" alignItems="center" style={{width: '100%', height: '85%', backgroundColor: "#222533"}}>
              <HierarchyTable rows={rows}/>
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