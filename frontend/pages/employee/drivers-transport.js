import { Button, Grid } from "@mui/material";
import DriversTransportTable from "../../components/tables/employee/DriversTransportTable";
import React from "react";
import getRequest from "../../util/getRequest";
import { useEffect } from "react";
import { FormControl } from "@mui/material";
import { InputLabel } from "@mui/material";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import PageTemplate from "../../templates/PageTemplate";
import TableMainPanel from "../../templates/TableMainPanel";
import { useRouter } from "next/router";

export default function DriversTransport() {
  const router = useRouter();

  const pageTitle = "Распределение водителей по транспорту";

  const [loading, setLoading] = React.useState(true);
  const [rows, setRows] = React.useState([]);
  const [transportList, setTransportList] = React.useState([]);
  const [transportIdSelected, setTransportIdSelected] = React.useState(0);

  useEffect(() => { 
    const fetchData = async () => {
      if (router.isReady) {
        const { transportId } = router.query;
        setTransportIdSelected(transportId);
        await getRequest('/employee/drivers-transport', setRows, transportId == 0 ? {} : {transportId: transportId});
        await getRequest('/transport/all', setTransportList);
      }
    }
    fetchData();
    setLoading(false);
  }, [router.isReady]);

  const onClick = async (e) => {
    await router.push({ 
      pathname: '/employee/drivers-transport', 
      query: { transportId: transportIdSelected }, 
    }); 
    router.reload();
  } 
  
  const LeftPanel = () => {
    return (
      <Grid 
        container 
        direction="column" 
        justifyContent="center" 
        alignItems="center" 
        style={{height: '100%', width: '100%'}} 
        sx={{
          svg: {color: "#ffffff"}, 
          input: {color: "#ffffff"}, 
          label: {color: "#ffffff"},
          '& label.Mui-focused': {
            color: '#ffffff',
          },
          '& .MuiInput-underline:after': {
            borderBottomColor: '#ffffff',
              color: '#ffffff'
          },
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: '#ffffff',
              color: '#ffffff'
            },
            '&:hover fieldset': {
              borderColor: '#ffffff',
              color: '#ffffff'
            },
            '&.Mui-focused fieldset': {
              borderColor: '#ffffff',
              color: '#ffffff'
            }
          },
        }}
      >
        <FormControl fullWidth style={{width: '80%', paddingBottom: '5%'}} sx={{svg: {color: "#ffffff"}, input: {color: "#ffffff"}, label: {color: "#ffffff"}}}>
          <InputLabel>транспорт</InputLabel>
          <Select value={transportIdSelected}
                  label="транспорт"
                  onChange={(event) => {
                    setTransportIdSelected(event.target.value)
                  }}
                  style={{color: "#ffffff"}}
                  MenuProps={{
                    PaperProps: {
                      style: {
                        maxHeight: '30%',
                        width: '20%',
                      },
                    },
                  }}>
            <MenuItem value={0}>
              Все
            </MenuItem>
            {
              transportList
              ?
              transportList.map((transport) => {
                return (
                  <MenuItem value={transport["id"]} style={{width: "100%"}}>
                    {transport["brand"] + " " + transport["model"] + " " + transport["color"] + " " + (transport["number"] ? transport["number"] : " ")}
                  </MenuItem>
                );
              })
              :
              <></>
            }
          </Select>
        </FormControl>
            <Button fontSize={16} onClick={onClick}>
              Применить
            </Button>
      </Grid>
    );
  }

  return (
    loading
    ?
    <PageTemplate 
      hasSidePanels={false} 
      pageTitle={"Загрузка..."}
    />
    :
    <PageTemplate 
      pageTitle={pageTitle}
      mainPanel={TableMainPanel(pageTitle, DriversTransportTable, rows)}
      leftPanel={LeftPanel()}
    />
  );
}