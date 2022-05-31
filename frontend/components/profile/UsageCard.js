import React from "react";
import { Grid, Typography } from "@mui/material";
import CardHeader from "./CardHeader";

/*
 * props.usage
 * props.isMain
 * props.onUnbindClick (not main)
 * props.disableUnbind (not main)
 * props.onEditClick (main)
 * props.onDeleteClick (main)
 * props.disableDelete (main)
 */
export default function UsageCard(props) {
  const usage = props.usage;

  const deleteWarning = "Вы точно хотите удалить данные о поездке?";
  const unbindWarning = "Вы точно хотите отвязать поездку?";
  const headerName = props.isMain && usage ? "Поездка #" + usage["id"] : "Поездка";

  const cardHeight = !props.isMain && !usage ? '10%' : '15%';

  return (
    <>
      <CardHeader isMain={props.isMain} 
                  name={headerName} 
                  deleteWarning={deleteWarning} 
                  unbindWarning={unbindWarning}
                  href={usage ? ("/usage/" + usage["id"]) : ""}
                  onUnbindClick={props.onUnbindClick}
                  onEditClick={props.onEditClick}
                  onDeleteClick={props.onDeleteClick}
                  disableUnbind={usage == null || props.disableUnbind}
                  disableDelete={props.disableDelete}
                  disableRef={usage ? false : true}
                  refTooltip="Перейти к поездке"/>

      <Grid container style={{height: '0.5%'}}/>

      <Grid container direction="column" justifyContent="center" alignItems="center" style={{width: '100%', height: cardHeight, backgroundColor: "#222533"}}>
        {
          !usage
          ?
          <Typography fontSize={16}>
            Не привязан к поездке
          </Typography>
          :
          <></>
        }
        {
          usage
          ?
          <>
            <Typography fontSize={16}>
              Статус: {usage["startDatetime"] && usage["endDatetime"] ? "Окончена" : usage["startDatetime"] ? "В процессе" : "Запланирована"}
            </Typography>
            <Typography fontSize={16}>
              Время начала: {usage["startDatetime"] ? usage["startDatetime"] : "-"}
            </Typography>
            <Typography fontSize={16}>
              Время окончания: {usage["endDatetime"] ? usage["endDatetime"] : "-"}
            </Typography>
          </>
          :
          <></>
        }
        {
          usage && usage["passengers"] 
          ?
          <Typography fontSize={16}>
            Число пассажиров: {usage["passengers"]}/{usage["passengerCapacity"]}
          </Typography>
          :
          usage && usage["freightVolume"]
          ?
          <Typography fontSize={16}>
            Масса груза: {usage["freightVolume"]}/{usage["loadCapacity"]} кг
          </Typography>
          :
          <></>
        }
      </Grid>
    </>
  );
}

UsageCard.defaultProps = {
  isMain: false,
  disableUnbind: false,
  disableDelete: false
};
