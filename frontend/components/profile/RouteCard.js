import React from "react";
import { Grid, Typography } from "@mui/material";
import CardHeader from "./CardHeader";

/*
 * props.route
 * props.isMain
 * props.onUnbindClick (not main)
 * props.disableUnbind (not main)
 * props.onEditClick (main)
 * props.onDeleteClick (main)
 * props.disableDelete (main)
 */
export default function RouteCard(props) {
  const route = props.route;

  const deleteWarning = "Вы точно хотите удалить данные о маршруте?";
  const unbindWarning = "Вы точно хотите отвязать маршрут?";
  const headerName = props.isMain && route ? "Маршрут №" + route["number"] : "Маршрут";

  const cardHeight = !props.isMain && !route ? '10%' : '10%';

  return (
    <>
      <CardHeader isMain={props.isMain} 
                  name={headerName} 
                  deleteWarning={deleteWarning} 
                  unbindWarning={unbindWarning}
                  href={route ? ("/route/" + route["id"]) : ""}
                  onUnbindClick={props.onUnbindClick}
                  onEditClick={props.onEditClick}
                  onDeleteClick={props.onDeleteClick}
                  disableUnbind={route == null || props.disableUnbind}
                  disableDelete={props.disableDelete}
                  disableRef={route ? false : true}
                  refTooltip="Перейти к маршруту"/>

      <Grid container style={{height: '0.5%'}}/>

      <Grid container direction="column" justifyContent="center" alignItems="center" style={{width: '100%', height: cardHeight, backgroundColor: "#222533"}}>
        {
          !route
          ?
          <Typography fontSize={16}>
            Не привязан к маршруту
          </Typography>
          :
          <></>
        }
        {
          route && !props.isMain
          ?
          <Typography fontSize={16}>
            Номер: {route["number"]}
          </Typography>
          :
          <></>
        }
        {
          route
          ?
          <Typography fontSize={16}>
            {route["startPoint"] + " → " + route["finishPoint"]}
          </Typography>
          :
          <></>
        }
      </Grid>
    </>
  );
}

RouteCard.defaultProps = {
  isMain: false,
  disableUnbind: false,
  disableDelete: false
};