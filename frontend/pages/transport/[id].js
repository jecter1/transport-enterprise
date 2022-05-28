import { Grid, Typography } from "@mui/material";
import { useRouter } from 'next/router';
import React from "react";
import getData from "../../util/getData";
import { useEffect } from "react";
import PageTemplate from "../../templates/PageTemplate";
import { Button } from "@mui/material";

export default function TransportProfile() {
  const [transport, setTransport] = React.useState();
  const [drivers, setDrivers] = React.useState([]);

  const router = useRouter();

  useEffect(() => { 
    const fetchData = async () => {
      if (router.isReady) {
        const { id } = router.query;
        await getData(('/transport/' + id), setTransport);
        await getData(('/transport/' + id + '/drivers'), setDrivers);
      }
    }
    fetchData();
  }, [router.isReady]);

  const LeftPanel = () => {
    return (
      <>
        { 
          drivers.map((driver) => {
            const driver_id = driver["id"];
            return (
              <Grid item sx={{paddingX: '5%', paddingY: '2%'}}>
              <a href={"/employee/" + driver_id} style={{textDecoration: "none"}}>
                <Button style={{fontSize: 14, width: '100%', height: '100%'}}>
                  {driver["name"]}
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
            {transport["brand"] + " " + transport["model"] + " " + (transport["number"] ? transport["number"] : "(без номера)")}
          </Typography>
        </Grid>
        <Grid container style={{height: '0.5%'}}>
        </Grid>
        <Grid container direction="column" justifyContent="center" alignItems="center" style={{width: '100%', height: '25%', backgroundColor: "#222533"}}>
          { transport["type"] ?
          <Typography fontSize={16}>
            Тип: {transport["type"]}
          </Typography>
            :
            <></>
          }
          { transport["color"] ?
          <Typography fontSize={16}>
            Цвет: {transport["color"]}
          </Typography>
            :
            <></>
          }
          { transport["receiveDate"] ?
          <Typography fontSize={16}>
            Дата получения: {transport["receiveDate"]}
          </Typography>
            :
            <></>
          }
          { transport["decommissioningDate"] ?
          <Typography fontSize={16}>
            Дата списания: {transport["decommissioningDate"]}
          </Typography>
            :
            <></>
          }
          { transport["garageLocation"] ?
          <Typography fontSize={16}>
            Гараж: {transport["garageLocation"]}
          </Typography>
            :
            <></>
          }
        </Grid>
      </Grid>
    );
  }

  return (
    transport
    ?
    <PageTemplate pageTitle={transport["brand"] + " " + transport["model"] + " " + transport["number"]}
                  mainPanel={MainPanel()}
                  leftPanelTitle={"Водители (" + drivers.length + ")"}
                  leftPanel={LeftPanel()}/>
    :
    <PageTemplate pageTitle={"Транспорт не найден"} hasSidePanels={false} mainPanel={<Typography fontSize={20}>Транспорт не найден</Typography>}/>
  );
}
