import { Grid, Typography } from "@mui/material";
import React from "react";
import { Button } from "@mui/material";
import PageTemplate from "../../templates/PageTemplate";

function CustomButton(props) {
  return (
    <Button variant="text"
            style={{textTransform: 'none', 
                    color: "#ffffff", 
                    backgroundColor: "#2b2f40", 
                    fontSize: 18,
                    width: '80%',
                    margin: 10}} 
            disableRipple
            disableElevation>
      {props.label}
    </Button>
  );
}

export default function AddEmployee() {
  const MainPanel = () => {
    return (
      <Grid container direction="column" justifyContent="center" alignItems="center" style={{width: '50%', height: '100%'}}>
        <Grid container justifyContent="center" alignItems="center" style={{width: '100%', height: '5%', backgroundColor: "#222533"}}>
          <Typography color="#ffffff" fontSize={18}>
            Добавление сотрудника → Выбор специализации
          </Typography>
        </Grid>
        <Grid container style={{height: '0.5%'}}>
        </Grid>
        <Grid container direction="column" justifyContent="center" alignItems="center" style={{width: '100%', height: '50%', backgroundColor: "#222533"}}>
          <CustomButton label="Водитель"/>
          <CustomButton label="Техник"/>
          <CustomButton label="Слесарь"/>
          <CustomButton label="Сборщик"/>
          <CustomButton label="Сварщик"/>
          <CustomButton label="Нет специализации"/>
        </Grid>
      </Grid>
    );
  }

  return (
    <PageTemplate pageTitle={"Добавление сотрудника | Выбор специализации"}
                  mainPanel={MainPanel()}
                  leftPanelTitle={"Водители (N)"}/>
  );
}
