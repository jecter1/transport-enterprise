import { Grid, Typography } from "@mui/material";
import { useRouter } from 'next/router';
import React from "react";
import getData from "../../util/getData";
import { useEffect } from "react";
import PageTemplate from "../../templates/PageTemplate";
import deleteRequest from "../../util/deleteRequest";
import UsageCard from "../../components/profile/UsageCard"
import TransportCard from "../../components/profile/TransportCard";


export default function UsageProfile() {
  const [usage, setUsage] = React.useState();
  const [transport, setTransport] = React.useState();
  const [loading, setLoading] = React.useState(true);

  const router = useRouter();

  useEffect(() => { 
    const fetchData = async () => {
      if (router.isReady) {
        const { id } = router.query;
        await getData(('/usage/' + id), setUsage);
        await getData(('/transport'), setTransport, {transportUsageId: id});
      }
    }
    fetchData();
    setLoading(false);
  }, [router.isReady]);

  const onDeleteClick = (e) => {
    deleteRequest("/usage/" + usage["id"]);
    location.href = "/usage";
  }

  const MainPanel = () => {
    return (
      <Grid container direction="column" justifyContent="center" alignItems="center" style={{width: '50%', height: '100%'}}>
        <UsageCard usage={usage} isMain={true} onDeleteClick={onDeleteClick}/>
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
    usage
    ?
    <PageTemplate pageTitle={"Поездка #" + usage["id"]}
                  mainPanel={MainPanel()}/>
    :
    <PageTemplate pageTitle={"Поездка не найдена"} hasSidePanels={false} mainPanel={<Typography fontSize={20}>Поездка не найден</Typography>}/>
  );
}
