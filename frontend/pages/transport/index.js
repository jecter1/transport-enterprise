import TransportTable from "../../components/transport/tables/TransportTable";
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
import { Switch } from "@mui/material";


export default function All() {
  const pageTitle = "Список транспорта";
  
  const [rows, setRows] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [receiveFromValue, setReceiveFromValue] = React.useState(null);
  const [receiveToValue, setReceiveToValue] = React.useState(null);
  const [decommissioningFromValue, setDecommissioningFromValue] = React.useState(null);
  const [decommissioningToValue, setDecommissioningToValue] = React.useState(null);
  const [decommissioned, setDecommissioned] = React.useState(false);
  
  useEffect(() => {
    getRequest('transport/all', setRows);
      setLoading(false);
  }, []);

  const handleClick = async () => {
    setLoading(true);
    const urlparams = {
      receiveFrom: dateToString(receiveFromValue), 
      receiveTo: dateToString(receiveToValue), 
      decommissioningFrom: decommissioned ? dateToString(decommissioningFromValue) : null, 
      decommissioningTo: decommissioned ? dateToString(decommissioningToValue) : null
    }
    console.log(urlparams);
    await getRequest(('transport/all'), setRows, urlparams);
    setLoading(false);
  };

  const LeftPanel = () => {
    return (
      <Grid container direction="column" justifyContent="center" alignItems="center" style={{width: '100%', height: '100%'}}>
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
        <Grid container direction="row" justifyContent="center" alignItems="center">
          <Typography fontSize={16} margin="5%">Списан</Typography>
          <Switch
            checked={decommissioned}
            onChange={(e) => {setDecommissioned(!decommissioned)}}
          />
        </Grid>
        <Grid container direction="row" justifyContent="center" alignItems="center">
          <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ruLocale}>
            <DatePicker label="с"
                        inputProps={{autoComplete: "off"}}
                        disabled={!decommissioned}
                        value={decommissioningFromValue}
                        onChange={(newValue) => {
                          setDecommissioningFromValue(newValue);
                        }}
                        renderInput={(params) => 
                          <TextField {...params} style={{width: '80%', paddingBottom: '5%'}} sx={{svg: {color: "#ffffff"}, input: {color: "#ffffff"}, label: {color: "#ffffff"}}} />
                        }/>
          </LocalizationProvider>
        </Grid>
        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ruLocale}>
          <DatePicker label="по"
                      inputProps={{autoComplete: "off"}}
                      disabled={!decommissioned}
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
    <PageTemplate hasSidePanels={false} pageTitle={"Загрузка..."}/>
    :
    <PageTemplate pageTitle={pageTitle} mainPanel={TableMainPanel(pageTitle, TransportTable, rows)} leftPanel={LeftPanel()}/>
  );
}