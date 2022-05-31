import { Grid, Typography } from "@mui/material";
import { useRouter } from 'next/router';
import React from "react";
import getData from "../../util/getData";
import { useEffect } from "react";
import PageTemplate from "../../templates/PageTemplate";
import { Button } from "@mui/material";
import deleteRequest from "../../util/deleteRequest";
import TransportCard from "../../components/profile/TransportCard";
import GarageCard from "../../components/profile/GarageCard";
import RouteCard from "../../components/profile/RouteCard";


export default function TransportProfile() {
  const [transport, setTransport] = React.useState();
  const [garage, setGarage] = React.useState();
  const [route, setRoute] = React.useState();
  const [drivers, setDrivers] = React.useState([]);
  const [repairs, setRepairs] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  const router = useRouter();

  useEffect(() => { 
    const fetchData = async () => {
      if (router.isReady) {
        const { id } = router.query;
        await getData(('/transport/' + id), setTransport);
        await getData(('/garage'), setGarage, {transportId: id});
        await getData(('/route'), setRoute, {transportId: id});
        await getData(('/employee'), setDrivers, {transportId: id});
        await getData(('/repair'), setRepairs, {transportId: id});
      }
    }
    fetchData();
    setLoading(false);
  }, [router.isReady]);

  const onDeleteClick = () => {
    deleteRequest("/transport/" + transport["id"]);
    location.href = "/transport/";
  }

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

  const RightPanel = () => {
    return (
      <>
        { 
          repairs.map((repair) => {
            const repair_id = repair["id"];
            return (
              <Grid item sx={{paddingX: '5%', paddingY: '2%'}}>
              <a href={"/repair/" + repair_id} style={{textDecoration: "none"}}>
                <Button style={{fontSize: 14, width: '100%', height: '100%'}}>
                  {"Ремонт #" + repair["id"]}
                  <br></br>
                  {(repair["assembly"] ? repair["assembly"] : "Узел не выяснен")}
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
        <TransportCard transport={transport} isMain={true} onDeleteClick={onDeleteClick}/>
        
        <Grid container style={{height: '3%'}}/>
        <GarageCard garage={garage}/>

        {
          transport["type"] == "Маршрутный" ||
          transport["type"] == "Маршрутное такси" ||
          transport["type"] == "Автобус"
          ?
          <>
            <Grid container style={{height: '3%'}}/>
            <RouteCard route={route}/>
          </>
          :
          <></>
        }
      </Grid>
    );
  }

  return (
    loading
    ?
    <PageTemplate hasSidePanels={false} pageTitle={"Загрузка..."}/>
    :
    transport
    ?
    <PageTemplate pageTitle={transport["brand"] + " " + transport["model"] + " " + (transport["number"] ? transport["number"] : "(без номера)")}
                  mainPanel={MainPanel()}
                  leftPanelTitle={"Водители (" + drivers.length + ")"}
                  leftPanel={LeftPanel()}
                  rightPanelTitle={"Ремонты (" + repairs.length + ")"}
                  rightPanel={RightPanel()}/>
    :
    <PageTemplate pageTitle={"Транспорт не найден"} hasSidePanels={false} mainPanel={<Typography fontSize={20}>Транспорт не найден</Typography>}/>
  );
}
