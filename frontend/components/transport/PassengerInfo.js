import React from "react";
import getData from "../../util/getData";
import { useEffect } from "react";
import { Typography } from "@mui/material";
import { useRouter } from 'next/router';


export default function PassengerInfo() {
  const [passengerInfo, setPassengerInfo] = React.useState();
  
  const router = useRouter();
  
  useEffect(() => { 
    const fetchData = async () => {
      if (router.isReady) {
        const { id } = router.query;
        await getData(('transport/' + id + "/passenger-info"), setPassengerInfo);
      }
    }
    fetchData();
  }, [router.isReady]);

  return (
    passengerInfo
    ?
    <Typography fontSize={16}>
      Вместительность: {passengerInfo["capacity"]} человек(а)
    </Typography>
    :
    <></>
  )
}