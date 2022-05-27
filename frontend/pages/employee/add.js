import { Grid, Typography } from "@mui/material";
import React from "react";
import { Button } from "@mui/material";
import PageTemplate from "../../templates/PageTemplate";

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
          <Button style={{margin: '1%', fontSize: 18, width: '80%'}}>Водитель</Button>
          <Button style={{margin: '1%', fontSize: 18, width: '80%'}}>Техник</Button>
          <Button style={{margin: '1%', fontSize: 18, width: '80%'}}>Слесарь</Button>
          <Button style={{margin: '1%', fontSize: 18, width: '80%'}}>Сборщик</Button>
          <Button style={{margin: '1%', fontSize: 18, width: '80%'}}>Сварщик</Button>
          <Button style={{margin: '1%', fontSize: 18, width: '80%'}}>Нет специализации</Button>
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
