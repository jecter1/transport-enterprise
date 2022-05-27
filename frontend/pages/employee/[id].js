import { Grid, Typography } from "@mui/material";
import { useRouter } from 'next/router';
import React from "react";
import getData from "../../util/getData";
import { useEffect } from "react";
import { Button } from "@mui/material";
import DriverInfo from "../../components/DriverInfo";
import ServiceStaffInfo from "../../components/ServiceStaffInfo";
import PageTemplate from "../../templates/PageTemplate";

export default function EmployeeProfile() {
  const [data, setData] = React.useState({});
  const [subordinates, setSubordinates] = React.useState([{}]);
  const [superiors, setSuperiors] = React.useState([{}]);

  const router = useRouter();

  useEffect(() => { 
    const fetchData = async () => {
      if (router.isReady) {
        const { id } = router.query;
        await getData(('employee/' + id), setData);
        await getData(('employee/subordinates/' + id), setSubordinates);
        await getData(('employee/superiors/' + id), setSuperiors);
      }
    }
    fetchData();
  }, [router.isReady]);

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
                <a href={"/employee/"+subordinate_id} style={{textDecoration: "none"}}>
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
    return (
      <Grid container direction="column" justifyContent="center" alignItems="center" style={{width: '50%', height: '100%'}}>
        <Grid container justifyContent="center" alignItems="center" style={{width: '100%', height: '5%', backgroundColor: "#222533"}}>
          <Typography fontSize={18}>
            {data["name"]}
          </Typography>
        </Grid>
        <Grid container style={{height: '0.5%'}}>
        </Grid>
        <Grid container direction="column" justifyContent="center" alignItems="center" style={{width: '100%', height: '25%', backgroundColor: "#222533"}}>
          { data["type"] ?
          <Typography fontSize={16}>
            Специализация: {data["type"]}
          </Typography>
            :
            <></>
          }
          { data["position"] ?
          <Typography fontSize={16}>
            Должность: {data["position"]}
          </Typography>
            :
            <></>
          }
          { data["birthDate"] ?
          <Typography fontSize={16}>
            Дата рождения: {data["birthDate"]}
          </Typography>
            :
            <></>
          }
          { 
            (data["type"] && data["type"] != "Водитель") 
            ?
            <ServiceStaffInfo/> 
            :
            <></>
          }
        </Grid>
        { 
          data["type"] == "Водитель" 
          ?
          <DriverInfo />
          :
          <></>
        }
      </Grid>
    );
  }

  return (
    <PageTemplate pageTitle={data["name"]}
                  mainPanel={MainPanel()}
                  leftPanel={LeftPanel()}
                  leftPanelTitle={"Начальники (" + superiors.length + ")"}
                  rightPanel={RightPanel()}
                  rightPanelTitle={"Подчиненные (" + subordinates.length + ")"}/>
  );
}
