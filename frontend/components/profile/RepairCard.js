import React from "react";
import { Grid, Typography } from "@mui/material";
import CardHeader from "./CardHeader";

/*
 * props.repair
 * props.isMain
 * props.onUnbindClick (not main)
 * props.disableUnbind (not main)
 * props.onEditClick (main)
 * props.onDeleteClick (main)
 */
export default function RepairCard(props) {
  const repair = props.repair;

  const deleteWarning = "Вы точно хотите удалить данные о ремонте?";
  const unbindWarning = "Вы точно хотите отвязать ремонт?";
  const headerName = props.isMain && repair ? "Ремонт #" + repair["id"] : "Ремонт";

  const cardHeight = !props.isMain && !repair ? '10%' : '25%';

  return (
    <>
      <CardHeader isMain={props.isMain} 
                  name={headerName} 
                  deleteWarning={deleteWarning} 
                  unbindWarning={unbindWarning}
                  href={repair ? ("/repair/" + repair["id"]) : ""}
                  onUnbindClick={props.onUnbindClick}
                  onEditClick={props.onEditClick}
                  onDeleteClick={props.onDeleteClick}
                  disableUnbind={repair == null || props.disableUnbind}
                  disableRef={repair ? false : true}
                  refTooltip="Перейти к ремонту"/>

      <Grid container style={{height: '0.5%'}}/>

      <Grid container direction="column" justifyContent="center" alignItems="center" style={{width: '100%', height: cardHeight, backgroundColor: "#222533"}}>
        {
          !repair
          ?
          <Typography fontSize={16}>
            Не привязан к ремонту
          </Typography>
          :
          <></>
        }
        {
          repair
          ?
          <>
            <Typography fontSize={16}>
              Узел: {repair["assembly"]}
            </Typography>
            <Typography fontSize={16}>
              Статус: {repair["startDatetime"] && repair["endDatetime"] ? "Окончен" : repair["startDatetime"] ? "В процессе" : "Запланирован"}
            </Typography>
          </>
          :
          <></>
        }
        {
          repair && repair["startDatetime"]
          ?
          <Typography fontSize={16}>
            Время начала: {repair["startDatetime"]}
          </Typography>
          :
          <></>
        }
        {
          repair && repair["endDatetime"]
          ?
          <Typography fontSize={16}>
            Время окончания: {repair["endDatetime"]}
          </Typography>
          :
          <></>
        }
        {
          repair && repair["cost"]
          ?
          <Typography fontSize={16}>
            Стоимость: {repair["cost"]} руб.
          </Typography>
          :
          <></>
        }
        {
          repair
          ?
          <Typography fontSize={16}>
            Описание: {repair["description"] ? repair["description"] : "отсутствует"}
          </Typography>
          :
          <></>
        }
      </Grid>
    </>
  );
}

RepairCard.defaultProps = {
  isMain: false,
  disableUnbind: false
};