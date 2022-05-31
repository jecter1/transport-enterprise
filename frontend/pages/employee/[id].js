import { Grid, Typography } from "@mui/material";
import { useRouter } from 'next/router';
import React from "react";
import getRequest from "../../util/getRequest";
import { useEffect } from "react";
import { Button } from "@mui/material";
import PageTemplate from "../../templates/PageTemplate";
import deleteRequest from "../../util/deleteRequest";
import EmployeeCard from "../../components/profile/EmployeeCard";
import TransportCard from "../../components/profile/TransportCard";

export default function EmployeeProfile() {
  const [employee, setEmployee] = React.useState();
  const [transport, setTransport] = React.useState();
  const [subordinates, setSubordinates] = React.useState([]);
  const [superiors, setSuperiors] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [deleted, setDeleted] = React.useState(false);

  const router = useRouter();

  useEffect(() => { 
    const fetchData = async () => {
      if (router.isReady) {
        const { id } = router.query;
        await getRequest(('/employee/' + id), setEmployee);
        await getRequest(('/transport'), setTransport, {driverId: id});
        await getRequest(('/employee/' + id + "/subordinates"), setSubordinates);
        await getRequest(('/employee/' + id + "/superiors"), setSuperiors);
      }
    }
    fetchData();
    setLoading(false);
  }, [router.isReady]);

  const onDeleteClick = () => {
    deleteRequest("/employee/" + employee["id"], setDeleted);
  }

  const LeftPanel = () => {
    return (
      <>
        { 
          superiors.map((superior) => {
            const superior_id = superior["id"];
            return (
              <Grid item sx={{paddingX: '5%', paddingY: '2%'}}>
              <a href={"/employee/"+superior_id} style={{textDecoration: "none"}}>
                <Button style={{fontSize: 14, width: '100%', height: '100%'}}>
                  {superior["name"]}
                    <br/>
                  {superior["position"] ? "<" + superior["position"] + ">" : ""}
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
          subordinates.map((subordinate) => {
            const subordinate_id = subordinate["id"];
            return (
              <Grid item sx={{paddingX: '5%', paddingY: '2%'}}>
                <a href={"/employee/" + subordinate_id} style={{textDecoration: "none"}}>
                  <Button style={{fontSize: 14, width: '100%', height: '100%'}}>
                    {subordinate["name"]}
                      <br/>
                    {subordinate["position"] ? "<" + subordinate["position"] + ">" : ""}
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
      location.href = "/employee/";
    }
    return (
      <Grid container direction="column" justifyContent="center" alignItems="center" style={{width: '50%', height: '100%'}}>
        <EmployeeCard disableDelete={subordinates.length != 0} employee={employee} isMain={true} onDeleteClick={onDeleteClick}/>
        {
          employee["type"] == "Водитель"
          ?
          <>
            <Grid container style={{height: '3%'}}/>
            <TransportCard transport={transport}/>
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
      employee 
      ? 
      <PageTemplate pageTitle={employee["name"]}
                    mainPanel={MainPanel()}
                    leftPanel={LeftPanel()}
                    leftPanelTitle={"Начальники (" + superiors.length + ")"}
                    rightPanel={RightPanel()}
                    rightPanelTitle={"Подчиненные (" + subordinates.length + ")"}/>
      :
      <PageTemplate pageTitle={"Сотрудник не найден"} hasSidePanels={false} mainPanel={<Typography fontSize={20}>Сотрудник не найден</Typography>}/>
  );
}
