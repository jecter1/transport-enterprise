import React from "react";
import getData from "../../util/getData";
import { useEffect } from "react";
import { Typography } from "@mui/material";
import { useRouter } from 'next/router';


export default function FreightInfo() {
  const [freightInfo, setFreightInfo] = React.useState();
  
  const router = useRouter();
  
  useEffect(() => { 
    const fetchData = async () => {
      if (router.isReady) {
        const { id } = router.query;
        await getData(('transport/' + id + "/freight-info"), setFreightInfo);
      }
    }
    fetchData();
  }, [router.isReady]);

  return (
      freightInfo
      ?
      <Typography fontSize={16}>
        Грузоподъемность: {freightInfo["capacity"]} кг
      </Typography>
      :
      <></>
  )
}
