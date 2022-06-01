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
import { InputLabel } from "@mui/material";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import MileageTable from "../../components/tables/usage/MileageTable";

const dateParams = {
  "day": ["year", "month", "day"],
  "month": ["year", "month"],
  "year": ["year"],
  "all": []
}

export default function All() {
  const router = useRouter();
  
  const pageTitle = "Пробег транспорта";
  
  const [rows, setRows] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  const [dateValue, setDateValue] = React.useState(null);
  const [dateTypeSelected, setDateTypeSelected] = React.useState();

  const [transportList, setTransportList] = React.useState([]);
  const [transportIdSelected, setTransportIdSelected] = React.useState(0);
  const [transportTypeSelected, setTransportTypeSelected] = React.useState("Любой");
  const [transportTypes, setTransportTypes] = React.useState([]);
  
  useEffect(() => { 
    const fetchData = async () => {
      if (router.isReady) {
        const { transportId, transportType, date, dateType } = router.query;
        setTransportIdSelected(transportId ? transportId : 0);
        setTransportTypeSelected(transportType ? transportType : "Любой");
        setDateTypeSelected(dateType ? dateType : "all")
        if (!isNaN(stringToDate(date))) {
          setDateValue(stringToDate(date));
        }
        await getRequest('/usage/mileage', setRows, router.query);
        await getRequest('/transport/all', setTransportList);
        await getRequest('/transport/types', setTransportTypes);
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
    if (transportTypeSelected && transportTypeSelected != "Любой") {
      query.transportType = transportTypeSelected
    } 
    if (dateTypeSelected && dateTypeSelected != "all" && !isNaN(dateValue) && dateValue) {
      query.date = dateToString(dateValue);
      query.dateType = dateTypeSelected
    } 
    await router.push({ 
      pathname: '/usage/mileage', 
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
          <Select value={transportTypeSelected}
                  label="тип транспорта"
                  onChange={(event) => {
                    if (event.target.value != transportTypeSelected) {
                      setTransportTypeSelected(event.target.value)
                      setTransportIdSelected(0)
                    }
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
              transportTypes.map((type) => {
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
                  <MenuItem value={transport["id"]} style={{width: "100%"}} onClick={(e) => setTransportTypeSelected(transport["type"])}>
                    {transport["brand"] + " " + transport["model"] + " " + transport["color"] + " (" + (transport["number"] ? transport["number"] : "без номера") + ")"}
                  </MenuItem>
                );
              })
              :
              <></>
            }
          </Select>
        </FormControl>
        <Typography fontSize={16} margin="5%">Интервал</Typography>
        <FormControl>
          <RadioGroup row onChange={(e) => {setDateTypeSelected(e.target.value)}}>
            <FormControlLabel checked={dateTypeSelected === 'all'} labelPlacement="top" value="all" control={<Radio disableRipple size="small" />} label="все время" />
            <FormControlLabel checked={dateTypeSelected === 'day'} labelPlacement="top" value="day" control={<Radio disableRipple size="small" />} label="день" />
            <FormControlLabel checked={dateTypeSelected === 'month'} labelPlacement="top" value="month" control={<Radio disableRipple size="small" />} label="месяц" />
            <FormControlLabel checked={dateTypeSelected === 'year'} labelPlacement="top" value="year" control={<Radio disableRipple size="small" />} label="год" />
          </RadioGroup>
        </FormControl>
        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ruLocale}>
          <DatePicker label="с"
                      disabled={dateTypeSelected == "all"}
                      views={dateParams[dateTypeSelected]}
                      inputProps={{autoComplete: "off"}}
                      value={dateValue}
                      onChange={(newValue) => {
                        setDateValue(newValue);
                      }}
                      renderInput={(params) => 
                        <TextField {...params} style={{width: '80%', margin: '5%'}} sx={{svg: {color: "#ffffff"}, input: {color: "#ffffff"}, label: {color: "#ffffff"}}} />
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
      mainPanel={TableMainPanel(pageTitle, MileageTable, rows, 
        { 
          transportSelected: router.query.transportId != null,
          transportType: router.query.transportType,
        })}
      leftPanel={LeftPanel()}
    />
  );
}