import GarageTable from "../../components/list/GarageTable";
import React from "react";
import getRequest from "../../util/getRequest";
import { useEffect } from "react";
import PageTemplate from "../../templates/PageTemplate";
import TableMainPanel from "../../templates/TableMainPanel";
import { Button, Grid, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { useRouter } from "next/router";


export default function All() {
  const router = useRouter();
  
  const pageTitle = "Список гаражей";
  
  const [rows, setRows] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [transportType, setTransportType] = React.useState("Любой");
  const [transportTypes, setTransportTypes] = React.useState([]);
  
  useEffect(() => { 
    const fetchData = async () => {
      if (router.isReady) {
        await getRequest('/garage/all', setRows, router.query);
        await getRequest('/transport/types', setTransportTypes);
      }
    }
    fetchData();
    setLoading(false);
    if (router.query.transportType) {
      setTransportType(router.query.transportType);
    }
  }, [router.isReady]);

  const handleClick = async () => {
    setLoading(true);
    var query = {};
    if (transportType != "Любой") {
      query.transportType = transportType;
    }
    await router.push({ 
      pathname: '/garage', 
      query: query, 
    }); 
    router.reload();
  };

  const LeftPanel = () => {
    return (
      <Grid 
        container 
        direction="column" 
        justifyContent="center" 
        alignItems="center" 
        style={{width: '100%', height: '100%'}}
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
          <InputLabel>тип транспорта</InputLabel>
          <Select value={transportType}
                  label="тип транспорта"
                  onChange={(event) => {
                    setTransportType(event.target.value)
                  }}
                  style={{color: "#ffffff"}}
                  MenuProps={{
                    PaperProps: {
                      style: {
                        maxHeight: '30%',
                        width: '10%',
                      },
                    },
                  }}
          >
            
            <MenuItem value={"Любой"} style={{width: "100%"}}>
              Любой
            </MenuItem>
            {
              transportTypes
              ?
              transportTypes.map((type, index) => {
                return (
                  <MenuItem value={type} style={{width: "100%"}}>
                    {type}
                  </MenuItem>
                );
              })
              :
              <></>
            }
          </Select>
        </FormControl>
        <Button fontSize={16} onClick={(e) => handleClick()}>
          Применить
        </Button>
      </Grid>
    );
  }

  return (
    loading
    ?
    <PageTemplate hasSidePanels={false} pageTitle={"Загрузка..."}/>
    :
    <PageTemplate pageTitle={pageTitle} mainPanel={TableMainPanel(pageTitle, GarageTable, rows)} leftPanel={LeftPanel()}/>
  );
}