import { Grid, Typography } from "@mui/material";
import { useRouter } from 'next/router';
import React from "react";
import getData from "../../util/getData";
import { useEffect } from "react";
import PageTemplate from "../../templates/PageTemplate";
import { Button } from "@mui/material";

export default function TransportProfile() {
  const [route, setRoute] = React.useState();
  const [transportList, setTransportList] = React.useState([]);

  const router = useRouter();

  useEffect(() => { 
    const fetchData = async () => {
      if (router.isReady) {
        const { id } = router.query;
        await getData(('/route/' + id), setRoute);
        await getData(('/route/' + id + "/transport"), setTransportList);
      }
    }
    fetchData();
  }, [router.isReady]);

  const LeftPanel = () => {
    return (
      <>
        { 
          transportList.map((transport) => {
            const transport_id = transport["id"];
            return (
              <Grid item sx={{paddingX: '5%', paddingY: '2%'}}>
              <a href={"/transport/"+transport_id} style={{textDecoration: "none"}}>
                <Button style={{fontSize: 14, width: '100%', height: '100%'}}>
                  {transport["number"]}
                  <br/>
                  {transport["brand"] + " " + transport["model"]}
                  <br/>
                  {transport["type"] ? "<" + transport["type"] + ">" : ""}
                </Button>
              </a>
              </Grid>
            );
          })
        }
      </>
    );
  }

  const MainPanel = () => {
    return (
      <Grid container direction="column" justifyContent="center" alignItems="center" style={{width: '50%', height: '100%'}}>
        <Grid container justifyContent="center" alignItems="center" style={{width: '100%', height: '5%', backgroundColor: "#222533"}}>
          <Typography fontSize={18}>
            {"Маршрут №" + route["number"]}
          </Typography>
        </Grid>
        <Grid container style={{height: '0.5%'}}>
        </Grid>
        <Grid container direction="column" justifyContent="center" alignItems="center" style={{width: '100%', height: '15%', backgroundColor: "#222533"}}>
          { 
            route
            ?
            <Typography fontSize={16}>
              {route["startPoint"] + " → " + route["finishPoint"]}
            </Typography>
              :
            <></>
          }
        </Grid>
      </Grid>
    );
  }

  return (
    route
    ?
    <PageTemplate pageTitle={"Маршрут №" + route["number"]}
                  mainPanel={MainPanel()}
                  leftPanelTitle={"Привязанный транспорт (" + transportList.length + ")"}
                  leftPanel={LeftPanel()}/>
    :
    <PageTemplate pageTitle={"Маршрут не найден"} hasSidePanels={false} mainPanel={<Typography fontSize={20}>Маршрут не найден</Typography>}/>
  );
}
