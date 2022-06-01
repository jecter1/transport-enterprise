import TransportTable from "../../components/list/TransportTable";
import React from "react";
import getRequest from "../../util/getRequest";
import { useEffect } from "react";
import PageTemplate from "../../templates/PageTemplate";
import TableMainPanel from "../../templates/TableMainPanel";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import ruLocale from 'date-fns/locale/ru';
import { Button, Grid, TextField, Typography } from "@mui/material";
import dateToString from '../../util/dateToString';
import stringToDate from '../../util/stringToDate';
import { useRouter } from "next/router";

export default function All() {
  const router = useRouter();
  
  const pageTitle = "Список транспорта";
  
  const [loading, setLoading] = React.useState(true);
  const [rows, setRows] = React.useState([]);

  const [receiveFromValue, setReceiveFromValue] = React.useState(null);
  const [receiveToValue, setReceiveToValue] = React.useState(null);
  const [decommissioningFromValue, setDecommissioningFromValue] = React.useState(null);
  const [decommissioningToValue, setDecommissioningToValue] = React.useState(null);
  
  useEffect(() => { 
    const fetchData = async () => {
      if (router.isReady) {
        const { receiveFrom, receiveTo, decommissioningFrom, decommissioningTo } = router.query;
        if (!isNaN(stringToDate(receiveFrom))) {
          setReceiveFromValue(stringToDate(receiveFrom));
        }
        if (!isNaN(stringToDate(receiveTo))) {
          setReceiveToValue(stringToDate(receiveTo));
        }
        if (!isNaN(stringToDate(decommissioningFrom))) {
          setDecommissioningFromValue(stringToDate(decommissioningFrom));
        }
        if (!isNaN(stringToDate(decommissioningTo))) {
          setDecommissioningToValue(stringToDate(decommissioningTo));
        }
        await getRequest('/transport/all', setRows, router.query);
      }
    }
    fetchData();
    setLoading(false);
  }, [router.isReady]);

  const handleClick = async () => {
    setLoading(true);
    var query = {};
    if (!isNaN(receiveFromValue) && receiveFromValue) {
      query.receiveFrom = dateToString(receiveFromValue);
    }
    if (!isNaN(receiveToValue) && receiveToValue) {
      query.receiveTo = dateToString(receiveToValue);
    }
    if (!isNaN(decommissioningFromValue) && decommissioningFromValue) {
      query.decommissioningFrom = dateToString(decommissioningFromValue);
    }
    if (!isNaN(decommissioningToValue) && decommissioningToValue) {
      query.decommissioningTo = dateToString(decommissioningToValue);
    }
    await router.push({ 
      pathname: '/transport', 
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
        <Typography fontSize={16} margin="5%">Получен</Typography>
        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ruLocale}>
          <DatePicker label="с"
                      inputProps={{autoComplete: "off"}}
                      value={receiveFromValue}
                      onChange={(newValue) => {
                        setReceiveFromValue(newValue);
                      }}
                      renderInput={(params) => 
                        <TextField {...params} style={{width: '80%', paddingBottom: '5%'}} sx={{svg: {color: "#ffffff"}, input: {color: "#ffffff"}, label: {color: "#ffffff"}}} />
                      }/>
        </LocalizationProvider>
        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ruLocale}>
          <DatePicker label="по"
                      inputProps={{autoComplete: "off"}}
                      value={receiveToValue}
                      onChange={(newValue) => {
                        setReceiveToValue(newValue);
                      }}
                      renderInput={(params) => 
                        <TextField {...params} style={{width: '80%', paddingBottom: '5%'}} sx={{svg: {color: "#ffffff"}, input: {color: "#ffffff"}, label: {color: "#ffffff"}}} />
                      }/>
        </LocalizationProvider>
        <Typography fontSize={16} margin="5%">Списан</Typography>
        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ruLocale}>
          <DatePicker label="с"
                      inputProps={{autoComplete: "off"}}
                      value={decommissioningFromValue}
                      onChange={(newValue) => {
                        setDecommissioningFromValue(newValue);
                      }}
                      renderInput={(params) => 
                        <TextField {...params} style={{width: '80%', paddingBottom: '5%'}} sx={{svg: {color: "#ffffff"}, input: {color: "#ffffff"}, label: {color: "#ffffff"}}} />
                      }/>
        </LocalizationProvider>
        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ruLocale}>
          <DatePicker label="по"
                      inputProps={{autoComplete: "off"}}
                      value={decommissioningToValue}
                      onChange={(newValue) => {
                        setDecommissioningToValue(newValue);
                      }}
                      renderInput={(params) => 
                        <TextField {...params} style={{width: '80%', paddingBottom: '5%'}} sx={{svg: {color: "#ffffff"}, input: {color: "#ffffff"}, label: {color: "#ffffff"}}} />
                      }/>
        </LocalizationProvider>
        <Button fontSize={16} onClick={handleClick}>
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
      mainPanel={TableMainPanel(pageTitle, TransportTable, rows)} 
      leftPanel={LeftPanel()}
    />
  );
}