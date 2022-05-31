import { Button, Grid } from "@mui/material";
import DriverTable from "../../components/employee/tables/DriverTable";
import React from "react";
import getData from "../../util/getData";
import { useEffect } from "react";
import { FormControl } from "@mui/material";
import { InputLabel } from "@mui/material";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import PageTemplate from "../../templates/PageTemplate";
import TableMainPanel from "../../templates/TableMainPanel";

export default function Drivers() {
  const pageTitle = "Распределение водителей";

  const [rows, setRows] = React.useState([{}]);
  const [transports, setTransports] = React.useState([]);
  const [transportId, setTransportId] = React.useState(0);
  const [loading, setLoading] = React.useState(true);
  
  useEffect(() => {
    getData('driver/all', setRows);
    getData('transport/short-all', setTransports);
    setLoading(false);
  }, []);

  const handleClick = () => {
    getData(('employee/drivers'), setRows, {transportId: transportId});
  };
  
  const LeftPanel = () => {
    return (
      <Grid container direction="column" justifyContent="center" alignItems="center" style={{height: '100%', width: '100%'}}>
        <FormControl fullWidth style={{width: '80%', paddingBottom: '5%'}} sx={{svg: {color: "#ffffff"}, input: {color: "#ffffff"}, label: {color: "#ffffff"}}}>
          <InputLabel>транспорт</InputLabel>
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

  return (
    loading
    ?
    <PageTemplate hasSidePanels={false} pageTitle={"Загрузка..."}/>
    :
    <PageTemplate pageTitle={pageTitle}
                  mainPanel={TableMainPanel(pageTitle, DriverTable, rows)}
                  leftPanel={LeftPanel()}/>
  );
}