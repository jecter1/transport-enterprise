import { Grid, Typography } from "@mui/material";
import { useRouter } from 'next/router';
import React from "react";
import getRequest from "../../util/getRequest";
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
  const [deleted, setDeleted] = React.useState(false);

  const router = useRouter();

  useEffect(() => { 
    const fetchData = async () => {
      if (router.isReady) {
        const { id } = router.query;
        await getRequest(('/transport/' + id), setTransport);
        await getRequest(('/garage'), setGarage, {transportId: id});
        await getRequest(('/route'), setRoute, {transportId: id});
        await getRequest(('/employee'), setDrivers, {transportId: id});
        await getRequest(('/repair'), setRepairs, {transportId: id});
      }
    }
    fetchData();
    setLoading(false);
  }, [router.isReady]);

  const onDeleteClick = () => {
    deleteRequest("/transport/" + transport["id"], setDeleted);
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
                  {"???????????? #" + repair["id"]}
                  <br></br>
                  {(repair["assembly"] ? repair["assembly"] : "???????? ???? ??????????????")}
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
    if (deleted) {
      location.href = "/transport";
    }

    return (
      <Grid container direction="column" justifyContent="center" alignItems="center" style={{width: '50%', height: '100%'}}>
        <TransportCard transport={transport} isMain={true} onDeleteClick={onDeleteClick}/>
        
        <Grid container style={{height: '3%'}}/>
        <GarageCard garage={garage}/>

        {
          transport["type"] == "????????????????????" ||
          transport["type"] == "???????????????????? ??????????" ||
          transport["type"] == "??????????????"
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
    <PageTemplate hasSidePanels={false} pageTitle={"????????????????..."}/>
    :
    transport
    ?
    <PageTemplate pageTitle={transport["brand"] + " " + transport["model"] + " " + (transport["number"] ? transport["number"] : "(?????? ????????????)")}
                  mainPanel={MainPanel()}
                  leftPanelTitle={"???????????????? (" + drivers.length + ")"}
                  leftPanel={LeftPanel()}
                  rightPanelTitle={"?????????????? (" + repairs.length + ")"}
                  rightPanel={RightPanel()}/>
    :
    <PageTemplate pageTitle={"?????????????????? ???? ????????????"} hasSidePanels={false} mainPanel={<Typography fontSize={20}>?????????????????? ???? ????????????</Typography>}/>
  );
}
