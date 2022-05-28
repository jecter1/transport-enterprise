import React from "react";
import getData from "../../util/getData";
import { useEffect } from "react";
import { Typography } from "@mui/material";
import { useRouter } from 'next/router';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Link from 'next/link';


export default function PassengerInfo() {
  const [routeInfo, setRouteInfo] = React.useState();
  
  const router = useRouter();
  
  useEffect(() => { 
    const fetchData = async () => {
      if (router.isReady) {
        const { id } = router.query;
        await getData(('transport/' + id + "/route-info"), setRouteInfo);
      }
    }
    fetchData();
  }, [router.isReady]);

  return (
    <>
      <Grid container style={{height: '3%'}} />
      <Grid container justifyContent="center" alignItems="center" style={{width: '100%', height: '5%', backgroundColor: "#222533"}}>
        <Typography fontSize={18}>
          Маршрут
        </Typography>
      </Grid>
      <Grid container style={{height: '0.5%'}} />
      <Grid container direction="column" justifyContent="center" alignItems="center" style={{width: '100%', height: '15%', backgroundColor: "#222533"}}>
        {
          routeInfo 
          ? 
          <>
            <Typography fontSize={16}>
              Номер: {routeInfo["number"]}
            </Typography>
            <Typography fontSize={16}>
              Стоимость проезда: {routeInfo["fare"]} руб.
            </Typography>
            <Link passHref href={"/route/" + routeInfo["id"]}>
              <Button style={{fontSize: 14, marginTop: '2%'}}>
                Подробнее
              </Button>
            </Link>
          </>
        :
        <Typography fontSize={16}>
          Не привязан к маршруту
        </Typography>
        }
      </Grid>
    </>
  )
}
