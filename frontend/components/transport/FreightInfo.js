import React from "react";
import getRequest from "../../util/getRequest";
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
        await getRequest(('transport/' + id + "/freight-info"), setFreightInfo);
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
