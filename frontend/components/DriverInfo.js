import React from "react";
import getData from "../util/getData";
import { useEffect } from "react";
import { Divider, Typography } from "@mui/material";
import { useRouter } from 'next/router';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Link from 'next/link';


export default function DriverInfo() {
  const [data, setData] = React.useState({});
  
  const router = useRouter();
  
  useEffect(() => { 
    const fetchData = async () => {
      if (router.isReady) {
        const { id } = router.query;
        await getData(('employee/driver/' + id), setData);
      }
    }
    fetchData();
  }, [router.isReady]);

  return (
    <>
      <Grid container style={{height: '3%'}} />
      <Grid container justifyContent="center" alignItems="center" style={{width: '50%', height: '5%', backgroundColor: "#222533"}}>
        <Typography color="#ffffff" fontSize={18}>
          Привязанный транспорт
        </Typography>
      </Grid>
      <Grid container style={{height: '0.5%'}} />
      <Grid container direction="column" justifyContent="center" alignItems="center" style={{width: '50%', height: '25%', backgroundColor: "#222533"}}>
        {data 
        ? 
        <>
          <Typography color="#ffffff" fontSize={16}>
            Тип: {data["type"]}
          </Typography>
          <Typography color="#ffffff" fontSize={16}>
            Номер: {data["number"]}
          </Typography>
          <Typography color="#ffffff" fontSize={16}>
            Марка: {data["brand"]}
          </Typography>
          <Typography color="#ffffff" fontSize={16}>
            Модель: {data["model"]}
          </Typography>
          <Typography color="#ffffff" fontSize={16}>
            Цвет: {data["color"]}
          </Typography>
          <Link passHref href={"/transport/" + data["id"]}>
            <Button variant="text"
                    style={{textTransform: 'none', 
                            color: '#ffffff', 
                            backgroundColor: "#2b2f40", 
                            fontSize: 14,
                            marginTop: 10}} 
                    disableRipple
                    sx={{
                        textTransform: 'none', 
                        textColor: 'white'
                      }}>
              Подробнее
            </Button>
          </Link>
        </>
        :
        <Typography color="#ffffff" fontSize={16}>
          Не привязан к транспорту
        </Typography>
        }
      </Grid>
    </>
  )
}
