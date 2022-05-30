import React from "react";
import getData from "../../util/getData";
import { useEffect } from "react";
import { Typography } from "@mui/material";
import { useRouter } from 'next/router';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Link from 'next/link';


export default function DriverInfo() {
  const [driverInfo, setDriverInfo] = React.useState();
  
  const router = useRouter();
  
  useEffect(() => { 
    const fetchData = async () => {
      if (router.isReady) {
        const { id } = router.query;
        await getData(('/driver/' + id), setDriverInfo);
      }
    }
    fetchData();
  }, [router.isReady]);

  return (
    <>
      <Grid container style={{height: '3%'}} />
      <Grid container justifyContent="center" alignItems="center" style={{width: '100%', height: '5%', backgroundColor: "#222533"}}>
        <Typography fontSize={18}>
          Привязанный транспорт
        </Typography>
      </Grid>
      <Grid container style={{height: '0.5%'}} />
      <Grid container direction="column" justifyContent="center" alignItems="center" style={{width: '100%', height: '25%', backgroundColor: "#222533"}}>
        {driverInfo 
        ? 
        <>
          <Typography fontSize={16}>
            Тип: {driverInfo["transportType"]}
          </Typography>
          <Typography fontSize={16}>
            Номер: {driverInfo["transportNumber"]}
          </Typography>
          <Typography fontSize={16}>
            Марка: {driverInfo["transportBrand"]}
          </Typography>
          <Typography fontSize={16}>
            Модель: {driverInfo["transportModel"]}
          </Typography>
          <Typography fontSize={16}>
            Цвет: {driverInfo["transportColor"]}
          </Typography>
          <Link passHref href={"/transport/" + driverInfo["id"]}>
            <Button style={{fontSize: 14, marginTop: '2%'}}>
              Подробнее
            </Button>
          </Link>
        </>
        :
        <Typography fontSize={16}>
          Не привязан к транспорту
        </Typography>
        }
      </Grid>
    </>
  )
}
