import { Grid, Typography } from "@mui/material";
import { useRouter } from 'next/router';
import React from "react";
import getData from "../../util/getData";
import { useEffect } from "react";
import PageTemplate from "../../templates/PageTemplate";

export default function TransportProfile() {
  const [data, setData] = React.useState({});

  const router = useRouter();

  useEffect(() => { 
    const fetchData = async () => {
      if (router.isReady) {
        const { id } = router.query;
        await getData(('transport/' + id), setData);
      }
    }
    fetchData();
  }, [router.isReady]);

  const MainPanel = () => {
    return (
      <Grid container direction="column" justifyContent="center" alignItems="center" style={{width: '50%', height: '100%'}}>
        <Grid container justifyContent="center" alignItems="center" style={{width: '100%', height: '5%', backgroundColor: "#222533"}}>
          <Typography fontSize={18}>
            {data["brand"] + " " + data["model"] + " " + data["number"]}
          </Typography>
        </Grid>
        <Grid container style={{height: '0.5%'}}>
        </Grid>
        <Grid container direction="column" justifyContent="center" alignItems="center" style={{width: '100%', height: '25%', backgroundColor: "#222533"}}>
          { data["type"] ?
          <Typography fontSize={16}>
            Тип: {data["type"]}
          </Typography>
            :
            <></>
          }
          { data["color"] ?
          <Typography fontSize={16}>
            Цвет: {data["color"]}
          </Typography>
            :
            <></>
          }
          { data["receiveDate"] ?
          <Typography fontSize={16}>
            Дата получения: {data["receiveDate"]}
          </Typography>
            :
            <></>
          }
          { data["decommissioningDate"] ?
          <Typography fontSize={16}>
            Дата списания: {data["decommissioningDate"]}
          </Typography>
            :
            <></>
          }
          { data["garageLocation"] ?
          <Typography fontSize={16}>
            Гараж: {data["garageLocation"]}
          </Typography>
            :
            <></>
          }
        </Grid>
      </Grid>
    );
  }

  return (
    <PageTemplate pageTitle={data["brand"] + " " + data["model"] + " " + data["number"]}
                  mainPanel={MainPanel()}
                  leftPanelTitle={"Водители (N)"}/>
  );
}
