import Head from "next/head";
import Header from "../../components/Header";
import { Grid, Typography } from "@mui/material";
import { useRouter } from 'next/router';
import React from "react";
import getData from "../../util/getData";
import { useEffect } from "react";
import { Button } from "@mui/material";
import { Box } from "@mui/material";

export default function TransportProfile() {
  const [data, setData] = React.useState({});

  const router = useRouter();

  useEffect(() => { 
    const fetchData = async () => {
      if (router.isReady) {
        const { id } = router.query;
        await getData(('transport/' + id), setData);
      }
    }
    fetchData();
  }, [router.isReady]);

  return (
    <>
      <Head>
        <title>{data["brand"] + " " + data["model"] + " " + data["number"]}</title>
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
              <Typography color="#ffffff" fontSize={16}>
                Список водителей(N):
              </Typography>
            </Grid>
            <Box container direction="row" justifyContent="center" alignItems="flex-start" style={{width: '100%', height: '95%', overflow: 'auto'}}>
            </Box>
          </Grid>
          <Grid container direction="column" justifyContent="center" alignItems="center" style={{width: '60%', height: '100%'}}>
            <Grid container justifyContent="center" alignItems="center" style={{width: '50%', height: '5%', backgroundColor: "#222533"}}>
              <Typography color="#ffffff" fontSize={18}>
                {data["brand"] + " " + data["model"] + " " + data["number"]}
              </Typography>
            </Grid>
            <Grid container style={{height: '0.5%'}}>
            </Grid>
            <Grid container direction="column" justifyContent="center" alignItems="center" style={{width: '50%', height: '25%', backgroundColor: "#222533"}}>
              { data["type"] ?
              <Typography color="#ffffff" fontSize={16}>
                Тип: {data["type"]}
              </Typography>
               :
               <></>
              }
              { data["color"] ?
              <Typography color="#ffffff" fontSize={16}>
                Цвет: {data["color"]}
              </Typography>
               :
               <></>
              }
              { data["receiveDate"] ?
              <Typography color="#ffffff" fontSize={16}>
                Дата получения: {data["receiveDate"]}
              </Typography>
               :
               <></>
              }
              { data["decommissioningDate"] ?
              <Typography color="#ffffff" fontSize={16}>
                Дата списания: {data["decommissioningDate"]}
              </Typography>
               :
               <></>
              }
              { data["garageLocation"] ?
              <Typography color="#ffffff" fontSize={16}>
                Гараж: {data["garageLocation"]}
              </Typography>
               :
               <></>
              }
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
