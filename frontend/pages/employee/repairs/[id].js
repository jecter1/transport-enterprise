import React from "react";
import { useEffect } from "react";
import Link from 'next/link';
import EmployeeRepairsTable from "../../../components/employee/tables/EmployeeRepairsTable";
import { useRouter } from 'next/router';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import ruLocale from 'date-fns/locale/ru';
import { Button, Grid, FormControl, InputLabel, Select, MenuItem, TextField } from "@mui/material";
import getData from "../../../util/getData";
import dateToString from '../../../util/dateToString';
import PageTemplate from "../../../templates/PageTemplate";
import TableMainPanel from "../../../templates/TableMainPanel";

export default function EmployeeRepair() {
  const [rows, setRows] = React.useState([]);
  const [employee, setEmployee] = React.useState([]);
  const [transports, setTransports] = React.useState([]);
  const [fromValue, setFromValue] = React.useState(null);
  const [toValue, setToValue] = React.useState(null);
  const [transportId, setTransportId] = React.useState('');
  const router = useRouter();

  useEffect(() => { 
    const fetchData = async () => {
      if (router.isReady) {
        const { id } = router.query;
        await getData(('employee/' + id), setEmployee);
        await getData(('employee/repairs'), setRows, {id: id});
        await getData(('transport/short-all'), setTransports);
      }
    }
    fetchData();
  }, [router.isReady]);

  const handleClick = async () => {
    if (router.isReady) {
      const { id } = router.query;
      const urlparams = {
        id: id, 
        from: dateToString(fromValue), 
        to: dateToString(toValue), 
        transportId: transportId
      }
      await getData(('employee/repairs'), setRows, urlparams);
    }
  };

  const LeftPanel = () => {
    return (
      <Grid container direction="column" justifyContent="center" alignItems="center" style={{width: '100%', height: '100%'}}>
        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ruLocale}>
          <DatePicker label="с"
                      value={fromValue}
                      onChange={(newValue) => {
                        setFromValue(newValue);
                      }}
                      renderInput={(params) => 
                        <TextField {...params} style={{width: '80%', paddingBottom: '5%'}} sx={{svg: {color: "#ffffff"}, input: {color: "#ffffff"}, label: {color: "#ffffff"}}} />
                      }/>
        </LocalizationProvider>
        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ruLocale}>
          <DatePicker label="по"
                      value={toValue}
                      onChange={(newValue) => {
                        setToValue(newValue);
                      }}
                      renderInput={(params) => 
                        <TextField {...params} style={{width: '80%', paddingBottom: '5%'}} sx={{svg: {color: "#ffffff"}, input: {color: "#ffffff"}, label: {color: "#ffffff"}}} />
                      }/>
        </LocalizationProvider>
        <FormControl fullWidth style={{width: '80%', paddingBottom: '5%'}} sx={{svg: {color: "#ffffff"}, input: {color: "#ffffff"}, label: {color: "#ffffff"}}}>
          <InputLabel id="demo-simple-select-label">транспорт</InputLabel>
          <Select value={transportId}
                  label="транспорт"
                  onChange={(event) => {
                    setTransportId(event.target.value)
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
              transports
              ?
              transports.map((transport) => {
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
        <Button fontSize={16} onClick={handleClick}>
          Применить
        </Button>
      </Grid>
    );
  }

  const RightPanel = () => {
    return (
      <Grid container justifyContent="center" alignItems="center" style={{width: '100%', height: '100%', backgroundColor: "#222533"}}>
        <Link href={"/employee/" + employee["id"]} passHref>
          <Button fontSize={16}>
            Страница сотрудника
          </Button>
        </Link>
      </Grid>
    );
  }

  return (
    <PageTemplate pageTitle={"Ремонтные работы | " + employee["name"]}
                  mainPanel={TableMainPanel(employee["name"] + " → Ремонтные работы", EmployeeRepairsTable, rows)}
                  leftPanel={LeftPanel()}
                  rightPanel={RightPanel()}/>
  );
}