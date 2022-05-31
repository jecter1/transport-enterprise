import GarageTable from "../../components/list/GarageTable";
import React from "react";
import getRequest from "../../util/getRequest";
import { useEffect } from "react";
import PageTemplate from "../../templates/PageTemplate";
import TableMainPanel from "../../templates/TableMainPanel";
import { Button, Grid, FormControl, InputLabel, Select, MenuItem, TextField } from "@mui/material";


export default function All() {
  const pageTitle = "Список гаражей";
  
  const [rows, setRows] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [category, setCategory] = React.useState("");
  const [categories, setCategories] = React.useState([]);
  
  useEffect(() => {
      getRequest('garage/all', setRows);
      getRequest('transport/types', setCategories);
      setLoading(false);
  }, []);

  const LeftPanel = () => {
    return (
      <Grid container direction="column" justifyContent="center" alignItems="center" style={{width: '100%', height: '100%'}}>
        <FormControl fullWidth style={{width: '80%', paddingBottom: '5%'}} sx={{svg: {color: "#ffffff"}, input: {color: "#ffffff"}, label: {color: "#ffffff"}}}>
          <InputLabel>категория</InputLabel>
          <Select value={category}
                  label="категория"
                  onChange={(event) => {
                    setCategory(event.target.value)
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
            {
              categories
              ?
              categories.map((category, index) => {
                return (
                  <MenuItem key={index} value={index} style={{width: "100%"}}>
                    {category}
                  </MenuItem>
                );
              })
              :
              <></>
            }
          </Select>
        </FormControl>
        <Button fontSize={16}>
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