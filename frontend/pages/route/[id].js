import { Grid, Typography } from "@mui/material";
import { useRouter } from 'next/router';
import React from "react";
import getData from "../../util/getData";
import { useEffect } from "react";
import PageTemplate from "../../templates/PageTemplate";
import { Button } from "@mui/material";
import deleteRequest from "../../util/deleteRequest";
import RouteCard from "../../components/profile/RouteCard";


export default function RouteProfile() {
  const [route, setRoute] = React.useState();
  const [transportList, setTransportList] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  const router = useRouter();

  useEffect(() => { 
    const fetchData = async () => {
      if (router.isReady) {
        const { id } = router.query;
        await getData(('/route/' + id), setRoute);
        await getData(('/transport'), setTransportList, {routeId: id});
      }
    }
    fetchData();
    setLoading(false);
  }, [router.isReady]);

  const onDeleteClick = () => {
    deleteRequest("/route/" + route["id"]);
    location.href = "/route";
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

  const MainPanel = () => {
    return (
      <Grid container direction="column" justifyContent="center" alignItems="center" style={{width: '50%', height: '100%'}}>
        <RouteCard route={route} isMain={true} onDeleteClick={onDeleteClick}/>
      </Grid>
    );
  }

  return (
    loading
    ?
    <PageTemplate hasSidePanels={false} pageTitle={"Загрузка..."}/>
    :
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
