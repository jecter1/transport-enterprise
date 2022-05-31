import React from "react";
import { Grid, Typography } from "@mui/material";
import CardHeader from "./CardHeader";

/*
 * props.garage
 * props.isMain
 * props.onUnbindClick (not main)
 * props.disableUnbind (not main)
 * props.onEditClick (main)
 * props.onDeleteClick (main)
 */
export default function GarageCard(props) {
  const garage = props.garage;

  const deleteWarning = "Вы точно хотите удалить данные о гараже?";
  const unbindWarning = "Вы точно хотите отвязать гараж?";
  const headerName = props.isMain && garage ? "Гараж (" + garage["location"] + ")" : "Гараж";

  const cardHeight = !props.isMain && !garage ? '10%' : '15%';

  return (
    <>
      <CardHeader isMain={props.isMain} 
                  name={headerName} 
                  deleteWarning={deleteWarning} 
                  unbindWarning={unbindWarning}
                  href={garage ? ("/garage/" + garage["id"]) : ""}
                  onUnbindClick={props.onUnbindClick}
                  onEditClick={props.onEditClick}
                  onDeleteClick={props.onDeleteClick}
                  disableUnbind={garage == null || props.disableUnbind}
                  disableRef={garage ? false : true}
                  refTooltip="Перейти к гаражу"/>

      <Grid container style={{height: '0.5%'}}/>

      <Grid container direction="column" justifyContent="center" alignItems="center" style={{width: '100%', height: cardHeight, backgroundColor: "#222533"}}>
        {
          !garage
          ?
          <Typography fontSize={16}>
            Не привязан к гаражу
          </Typography>
          :
          <></>
        }
        {
          garage && !props.isMain 
          ?
          <Typography fontSize={16}>
            Расположение: {garage["location"]}
          </Typography>
          :
          <></>
        }
        {
          garage && props.isMain
          ?
          <Typography fontSize={16}>
            Описание: {garage["description"] ? garage["description"] : "отсутствует"}
          </Typography>
          :
          <></>
        }
      </Grid>
    </>
  );
}

GarageCard.defaultProps = {
  isMain: false,
  disableUnbind: false
};