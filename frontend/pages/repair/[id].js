import { Grid, Typography } from "@mui/material";
import { useRouter } from 'next/router';
import React from "react";
import getData from "../../util/getData";
import { useEffect } from "react";
import PageTemplate from "../../templates/PageTemplate";
import { Button } from "@mui/material";
import deleteRequest from "../../util/deleteRequest";
import RepairCard from "../../components/profile/RepairCard";
import GarageCard from "../../components/profile/GarageCard";
import TransportCard from "../../components/profile/TransportCard";

export default function RepairProfile() {
  const [repair, setRepair] = React.useState();
  const [garage, setGarage] = React.useState();
  const [transport, setTransport] = React.useState();
  const [staffList, setStaffList] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  const router = useRouter();

  useEffect(() => { 
    const fetchData = async () => {
      if (router.isReady) {
        const { id } = router.query;
        await getData(('/repair/' + id), setRepair);
        await getData(('/transport'), setTransport, {repairId: id});
        await getData(('/employee'), setStaffList, {repairId: id});
        await getData(('/garage'), setGarage, {repairId: id});
      }
    }
    fetchData();
    setLoading(false);
  }, [router.isReady]);

  const onDeleteClick = () => {
    deleteRequest("/repair/" + repair["id"]);
    location.href = "/repair/";
  }

  const LeftPanel = () => {
    return (
      <>
        { 
          staffList.map((staff) => {
            const staff_id = staff["id"];
            return (
              <Grid item sx={{paddingX: '5%', paddingY: '2%'}}>
                <a href={"/employee/" + staff_id} style={{textDecoration: "none"}}>
                  <Button style={{fontSize: 14, width: '100%', height: '100%'}}>
                    {staff["name"]}
                      <br/>
                    {"<" + staff["type"] + ">"}
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
        <RepairCard repair={repair} isMain={true} onDeleteClick={onDeleteClick}/>
        
        <Grid container style={{height: '3%'}}/>
        <GarageCard garage={garage}/>

        <Grid container style={{height: '3%'}}/>
        <TransportCard transport={transport}/>
      </Grid>
    );
  }

  return (
    loading
    ?
    <PageTemplate hasSidePanels={false} pageTitle={"Загрузка..."}/>
    :
    repair // && staffList
    ?
    <PageTemplate pageTitle={"Ремонт #" + repair["id"]}
                  mainPanel={MainPanel()}
                  leftPanelTitle={"Задействованный персонал (" + staffList.length + ")"}
                  leftPanel={LeftPanel()}/>
    :
    <PageTemplate pageTitle={"Ремонт не найден"} hasSidePanels={false} mainPanel={<Typography fontSize={20}>Ремонт не найден</Typography>}/>
  );
}
