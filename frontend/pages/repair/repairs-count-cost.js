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
import FormControl from '@mui/material/FormControl';
import RepairsCountCostTable from "../../components/tables/repair/RepairsCountCostTable";

export default function All() {
  const router = useRouter();
  
  const pageTitle = "Число ремонтов и их стоимость";

  const [loading, setLoading] = React.useState(true);
  
  const [rows, setRows] = React.useState([]);

  const [dateFromValue, setDateFromValue] = React.useState(null);
  const [dateToValue, setDateToValue] = React.useState(null);
  
  const [assemblySelected, setAssemblySelected] = React.useState(0);
  const [assemblyList, setAssemblyList] = React.useState([]);

  const [transportBrandSelected, setTransportBrandSelected] = React.useState("Любой");
  const [transportBrands, setTransportBrands] = React.useState([]);

  const [transportTypeSelected, setTransportTypeSelected] = React.useState("Любой");
  const [transportTypes, setTransportTypes] = React.useState([]);
  
  const [transportIdSelected, setTransportIdSelected] = React.useState("Любой");
  const [transportList, setTransportList] = React.useState([]);
  
  useEffect(() => { 
    const fetchData = async () => {
      if (router.isReady) {
        const { transportId, transportBrand, transportType, assembly, dateFrom, dateTo } = router.query;
        setTransportBrandSelected(transportBrand ? transportBrand : "Любой");
        setTransportTypeSelected(transportType ? transportType : "Любой");
        setAssemblySelected(assembly ? assembly : "Любой");
        setTransportIdSelected(transportId ? transportId : 0);
        if (!isNaN(stringToDate(dateFrom))) {
          setDateFromValue(stringToDate(dateFrom));
        }
        if (!isNaN(stringToDate(dateTo))) {
          setDateToValue(stringToDate(dateTo));
        }
        await getRequest('/repair/repairs-count-cost', setRows, router.query);
        await getRequest('/repair/assembly', setAssemblyList);
        await getRequest('/transport/brands', setTransportBrands);
        await getRequest('/transport/types', setTransportTypes);
        await getRequest('/transport/all', setTransportList);
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
    if (transportBrandSelected && transportBrandSelected != "Любой") {
      query.transportBrand = transportBrandSelected
    } 
    if (assemblySelected && assemblySelected != "Любой") {
      query.assembly = assemblySelected
    } 
    if (!isNaN(dateFromValue) && dateFromValue) {
      query.dateFrom = dateToString(dateFromValue);
    } 
    if (!isNaN(dateToValue) && dateToValue) {
      query.dateTo = dateToString(dateToValue);
    } 
    await router.push({ 
      pathname: '/repair/repairs-count-cost', 
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
          <InputLabel>узел</InputLabel>
          <Select value={assemblySelected}
                  label="узел"
                  onChange={(event) => {setAssemblySelected(event.target.value)}}
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
              assemblyList
              ?
              assemblyList.map((assembly) => {
                return (
                  <MenuItem value={assembly} style={{width: "100%"}}>
                    {assembly}
                  </MenuItem>
                );
              })
              :
              <></>
            }
          </Select>
        </FormControl>
        <FormControl fullWidth style={{width: '80%', paddingBottom: '5%'}} sx={{svg: {color: "#ffffff"}, input: {color: "#ffffff"}, label: {color: "#ffffff"}}}>
          <InputLabel>марка транспорта</InputLabel>
          <Select value={transportBrandSelected}
                  label="марка транспорта"
                  onChange={(event) => {
                    if (event.target.value != transportBrandSelected) {
                      setTransportBrandSelected(event.target.value)
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
              transportBrands
              ?
              transportBrands.map((brand) => {
                return (
                  <MenuItem value={brand} style={{width: "100%"}}>
                    {brand}
                  </MenuItem>
                );
              })
              :
              <></>
            }
          </Select>
        </FormControl>
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
                  <MenuItem value={transport["id"]} style={{width: "100%"}} 
                    onClick={(e) => {
                      setTransportTypeSelected(transport["type"]);
                      setTransportBrandSelected(transport["brand"]);
                    }}
                  >
                    {transport["brand"] + " " + transport["model"] + " " + transport["color"] + " (" + (transport["number"] ? transport["number"] : "без номера") + ")"}
                  </MenuItem>
                );
              })
              :
              <></>
            }
          </Select>
        </FormControl>
        <Typography fontSize={16} margin="5%">Дата ремонта</Typography>
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
      mainPanel={TableMainPanel(pageTitle, RepairsCountCostTable, rows, 
        { 
          transportSelected: router.query.transportId != null
        })}
      leftPanel={LeftPanel()}
    />
  );
}