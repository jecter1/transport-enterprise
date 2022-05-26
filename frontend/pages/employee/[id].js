import Head from "next/head";
import Header from "../../components/Header";
import { Grid, Typography } from "@mui/material";
import { useRouter } from 'next/router';
import React from "react";
import getData from "../../util/getData";
import { useEffect } from "react";
import { Button } from "@mui/material";
import { Box } from "@mui/material";
import DriverInfo from "../../components/DriverInfo";
import ServiceStaffInfo from "../../components/ServiceStaffInfo";

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

  return (
    <>
      <Head>
        <title>{data["name"]}</title>
      </Head>

      <Grid container direction="column" style={{
        height: "100vh",
        width: '100vw'
      }}>
        <Grid container style={{height: '6.6%'}}>
          <Header/>
        </Grid>
        <Grid container justifyContent="space-between" alignItems="center" direction="row" style={{
          height: "93.4%",
          width: '100%', 
          backgroundColor: "#1a1c26"
        }}>
          <Grid container style={{width: '17%', height: '100%', backgroundColor: "#222533"}}>
            <Grid container justifyContent="center" alignItems="center" style={{width: '100%', height: '5%', backgroundColor: "#222533"}}>
              <Typography color="#ffffff" fontSize={16}>
                Начальники ({superiors.length}):
              </Typography>
            </Grid>
            <Box container direction="row" justifyContent="center" alignItems="flex-start" style={{width: '100%', height: '95%', overflow: 'auto'}}>
                { superiors.map((superior) => {
                  const superior_id = superior["id"];
                  return (
                    <Grid item sx={{padding: 1}}>
                    <a href={"/employee/"+superior_id} style={{textDecoration: "none"}}>
                      <Button variant="text"
                              style={{textTransform: 'none', 
                                      color: '#ffffff', 
                                      backgroundColor: superior["position"] ? "#2b2f40" : "#222533", 
                                      fontSize: 14}} 
                              disableRipple
                              sx={{
                                  textTransform: 'none', 
                                  textColor: 'white',
                                  width: '100%',
                                  height: '100%'
                                }}>
                        {superior["name"]}
                          <br/>
                        {superior["position"] ? "<" + superior["position"] + ">" : ""}
                      </Button>
                    </a>
                    </Grid>
                  );
                  })
                }
            </Box>
          </Grid>
          <Grid container direction="column" justifyContent="center" alignItems="center" style={{width: '60%', height: '100%'}}>
            <Grid container justifyContent="center" alignItems="center" style={{width: '50%', height: '5%', backgroundColor: "#222533"}}>
              <Typography color="#ffffff" fontSize={18}>
                {data["name"]}
              </Typography>
            </Grid>
            <Grid container style={{height: '0.5%'}}>
            </Grid>
            <Grid container direction="column" justifyContent="center" alignItems="center" style={{width: '50%', height: '25%', backgroundColor: "#222533"}}>
              { data["type"] ?
              <Typography color="#ffffff" fontSize={16}>
                Специализация: {data["type"]}
              </Typography>
               :
               <></>
              }
              { data["position"] ?
              <Typography color="#ffffff" fontSize={16}>
                Должность: {data["position"]}
              </Typography>
               :
               <></>
              }
              { data["birthDate"] ?
              <Typography color="#ffffff" fontSize={16}>
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
          <Grid container style={{width: '17%', height: '100%', backgroundColor: "#222533"}}>
            <Grid container justifyContent="center" alignItems="center" style={{width: '100%', height: '5%'}}>
              <Typography color="#ffffff" fontSize={16}>
                Подчиненные ({subordinates.length}):
              </Typography>
            </Grid>
            <Box container direction="row" justifyContent="center" alignItems="flex-start" style={{width: '100%', height: '95%', overflow: 'auto'}}>
                { subordinates.map((subordinate) => {
                  const subordinate_id = subordinate["id"];
                  return (
                    <Grid item sx={{padding: 1}}>
                      <a href={"/employee/"+subordinate_id} style={{textDecoration: "none"}}>
                        <Button variant="text"
                                style={{textTransform: 'none', 
                                        color: '#ffffff', 
                                        backgroundColor: subordinate["position"] ? "#2b2f40" : "#222533", 
                                        fontSize: 14}} 
                                disableRipple
                                sx={{
                                    textTransform: 'none', 
                                    textColor: 'white',
                                    width: '100%',
                                    height: '100%'
                                  }}>
                          {subordinate["name"]}
                            <br/>
                          {subordinate["position"] ? "<" + subordinate["position"] + ">" : ""}
                        </Button>
                      </a>
                    </Grid>
                  );
                  })
                }
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
