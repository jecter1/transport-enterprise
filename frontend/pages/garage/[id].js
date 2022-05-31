import { Grid, Typography } from "@mui/material";
import { useRouter } from 'next/router';
import React from "react";
import getData from "../../util/getData";
import { useEffect } from "react";
import PageTemplate from "../../templates/PageTemplate";
import { Button } from "@mui/material";
import deleteRequest from "../../util/deleteRequest";
import GarageCard from "../../components/profile/GarageCard";

export default function GarageProfile() {
  const [garage, setGarage] = React.useState();
  const [transportList, setTransportList] = React.useState([]);
  const [repairList, setRepairList] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  const router = useRouter();

  useEffect(() => { 
    const fetchData = async () => {
      if (router.isReady) {
        const { id } = router.query;
        await getData(('/garage/' + id), setGarage);
        await getData(('/transport'), setTransportList, {garageId: id});
        await getData(('/repair'), setRepairList, {garageId: id});
      }
    }
    fetchData();
    setLoading(false);
  }, [router.isReady]);

  const onDeleteClick = () => {
    deleteRequest("/garage/" + garage["id"]);
    location.href = "/garage";
  }

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
                    {transport["number"] ? transport["number"] : "Без номера"}
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

  const RightPanel = () => {
    return (
      <>
        { 
          repairList.map((repair) => {
            const repair_id = repair["id"];
            return (
              <Grid item sx={{paddingX: '5%', paddingY: '2%'}}>
                <a href={"/repair/"+repair_id} style={{textDecoration: "none"}}>
                  <Button style={{fontSize: 14, width: '100%', height: '100%'}}>
                    {repair["transportNumber"] ? repair["transportNumber"] : "Без номера"}
                    <br/>
                    {repair["transportBrand"] + " " + repair["transportModel"]}
                    <br/>
                    {"<" + repair["assembly"] + ">"}
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
        <GarageCard garage={garage} isMain={true} onDeleteClick={onDeleteClick}/>
      </Grid>
    );
  }

  return (
    loading
    ?
    <PageTemplate hasSidePanels={false} pageTitle={"Загрузка..."}/>
    :
    garage
    ?
    <PageTemplate pageTitle={"Гараж (" + garage["location"] + ")"}
                  mainPanel={MainPanel()}
                  leftPanelTitle={"Привязанный транспорт (" + transportList.length + ")"}
                  leftPanel={LeftPanel()}
                  rightPanelTitle={"Проведенные ремонты (" + repairList.length + ")"}
                  rightPanel={RightPanel()}/>
    :
    <PageTemplate pageTitle={"Гараж не найден"} hasSidePanels={false} mainPanel={<Typography fontSize={20}>Гараж не найден</Typography>}/>
  );
}
