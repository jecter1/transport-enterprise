import RepairTable from "../../components/list/RepairTable";
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
import { FormControl } from "@mui/material";
import { InputLabel } from "@mui/material";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

export default function All() {
  const router = useRouter();
  
  const pageTitle = "Список ремонтов";
  
  const [rows, setRows] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  const [dateFromValue, setDateFromValue] = React.useState(null);
  const [dateToValue, setDateToValue] = React.useState(null);

  const [transportList, setTransportList] = React.useState([]);
  const [transportIdSelected, setTransportIdSelected] = React.useState(0);

  const [staffList, setStaffList] = React.useState([]);
  const [staffIdSelected, setStaffIdSelected] = React.useState(0);
  
  useEffect(() => { 
    const fetchData = async () => {
      if (router.isReady) {
        const { dateFrom, dateTo, transportId, staffId } = router.query;
        setTransportIdSelected(transportId ? transportId : 0);
        setStaffIdSelected(staffId ? staffId : 0);
        if (!isNaN(stringToDate(dateFrom))) {
          setDateFromValue(stringToDate(dateFrom));
        }
        if (!isNaN(stringToDate(dateTo))) {
          setDateToValue(stringToDate(dateTo));
        }
        await getRequest('/repair/all', setRows, router.query);
        await getRequest('/transport/all', setTransportList);
        await getRequest('/employee/staff/all', setStaffList);
      }
    }
    fetchData();
    setLoading(false);
  }, [router.isReady]);

  const handleClick = async () => {
    setLoading(true);
    var query = {};
    if (transportIdSelected && transportIdSelected != 0) {
      query.transportId = transportIdSelected
    } 
    if (staffIdSelected && staffIdSelected != 0) {
      query.staffId = staffIdSelected
    }
    if (!isNaN(dateFromValue) && dateFromValue) {
      query.dateFrom = dateToString(dateFromValue);
    }
    if (!isNaN(dateToValue) && dateToValue) {
      query.dateTo = dateToString(dateToValue);
    }
    await router.push({ 
      pathname: '/repair', 
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
          <InputLabel>специалист</InputLabel>
          <Select value={staffIdSelected}
                  label="специалист"
                  onChange={(event) => {
                    setStaffIdSelected(event.target.value)
                  }}
                  style={{color: "#ffffff"}}
                  MenuProps={{
                    PaperProps: {
                      style: {
                        maxHeight: '30%',
                        width: '25%',
                      },
                    },
                  }}>
            <MenuItem value={0}>
              Все
            </MenuItem>
            {
              staffList
              ?
              staffList.map((staff) => {
                return (
                  <MenuItem value={staff["id"]} style={{width: "100%"}}>
                    {staff["name"] + " " + "<" + staff["type"] + ">"}
                  </MenuItem>
                );
              })
              :
              <></>
            }
          </Select>
        </FormControl>
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
                        width: '25%',
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
                    {transport["brand"] + " " + transport["model"] + " " + transport["color"] + " (" + (transport["number"] ? transport["number"] : "без номера") + ")"}
                  </MenuItem>
                );
              })
              :
              <></>
            }
          </Select>
        </FormControl>
        <Typography fontSize={16} margin="5%">Дата проведения</Typography>
        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ruLocale}>
          <DatePicker label="с"
                      inputProps={{autoComplete: "off"}}
                      value={dateFromValue}
                      onChange={(newValue) => {
                        setDateFromValue(newValue);
                      }}
                      renderInput={(params) => 
                        <TextField {...params} style={{width: '80%', paddingBottom: '5%'}} sx={{svg: {color: "#ffffff"}, input: {color: "#ffffff"}, label: {color: "#ffffff"}}} />
                      }/>
        </LocalizationProvider>
        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ruLocale}>
          <DatePicker label="по"
                      inputProps={{autoComplete: "off"}}
                      value={dateToValue}
                      onChange={(newValue) => {
                        setDateToValue(newValue);
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
      mainPanel={TableMainPanel(pageTitle, RepairTable, rows, { transportSelected: router.query.transportId != null })}
      leftPanel={LeftPanel()}
    />
  );
}