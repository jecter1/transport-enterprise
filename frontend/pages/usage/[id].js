import { Grid, Typography } from "@mui/material";
import { useRouter } from 'next/router';
import React from "react";
import getRequest from "../../util/getRequest";
import { useEffect } from "react";
import PageTemplate from "../../templates/PageTemplate";
import deleteRequest from "../../util/deleteRequest";
import UsageCard from "../../components/profile/UsageCard"
import TransportCard from "../../components/profile/TransportCard";


export default function UsageProfile() {
  const [usage, setUsage] = React.useState();
  const [transport, setTransport] = React.useState();
  const [loading, setLoading] = React.useState(true);
  const [deleted, setDeleted] = React.useState(false);

  const router = useRouter();

  useEffect(() => { 
    const fetchData = async () => {
      if (router.isReady) {
        const { id } = router.query;
        await getRequest(('/usage/' + id), setUsage);
        await getRequest(('/transport'), setTransport, {transportUsageId: id});
      }
    }
    fetchData();
    setLoading(false);
  }, [router.isReady]);

  const onDeleteClick = (e) => {
    deleteRequest("/usage/" + usage["id"], setDeleted);
  }

  const MainPanel = () => {
    if (deleted) {
      location.href = "/usage";
    }
    return (
      <Grid container direction="column" justifyContent="center" alignItems="center" style={{width: '50%', height: '100%'}}>
        <UsageCard usage={usage} isMain={true} onDeleteClick={onDeleteClick}/>
        <Grid container style={{height: '3%'}}/>
        <TransportCard transport={transport} disableUnbind={true}/>
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
