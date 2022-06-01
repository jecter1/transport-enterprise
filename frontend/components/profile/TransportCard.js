import React from "react";
import { Button, Grid, Typography } from "@mui/material";
import CardHeader from "./CardHeader";
import Link from "next/link"

/*
 * props.usage
 * props.isMain
 * props.onUnbindClick (not main)
 * props.disableUnbind (not main)
 * props.onEditClick (main)
 * props.onDeleteClick (main)
 * props.disableDelete (main)
 */
export default function TransportCard(props) {
  const transport = props.transport;

  const deleteWarning = "ВНИМАНИЕ: УДАЛЕНИЕ ТРАНСПОРТА ВЛЕЧЕТ ЗА СОБОЙ УДАЛЕНИЕ ВСЕХ ЕГО РЕМОНТОВ И ВСЕХ ПОЕЗДОК НА НЕМ. Вы точно хотите удалить данные о транспорте?";
  const unbindWarning = "Вы точно хотите отвязать транспорт?";
  const headerName = props.isMain && transport ? transport["brand"] + " " + transport["model"] + " " + (transport["number"] ? "(" + transport["number"] + ")": "(без номера)") : "Транспорт";

  const cardHeight = !props.isMain && !transport ? '10%' : '25%';

  return (
    <>
      <CardHeader isMain={props.isMain} 
                  name={headerName} 
                  deleteWarning={deleteWarning} 
                  unbindWarning={unbindWarning}
                  href={transport ? ("/transport/" + transport["id"]) : ""}
                  onUnbindClick={props.onUnbindClick}
                  onEditClick={props.onEditClick}
                  onDeleteClick={props.onDeleteClick}
                  disableUnbind={transport == null || props.disableUnbind}
                  disableDelete={props.disableDelete}
                  disableRef={transport ? false : true}
                  refTooltip="Перейти к транспорту"/>

      <Grid container style={{height: '0.5%'}}/>

      <Grid container direction="column" justifyContent="center" alignItems="center" style={{width: '100%', height: cardHeight, backgroundColor: "#222533"}}>
        {
          !props.isMain && !transport
          ?
          <Typography fontSize={16}>
            Не привязан к транспорту
          </Typography>
          :
          <></>
        }
        {
          transport
          ?
          <Typography fontSize={16}>
            Тип: {transport["type"]}
          </Typography>
          :
          <></>
        }
        {
          transport && transport["loadCapacity"] && props.isMain
          ?
          <Typography fontSize={16}>
            Грузоподъемность: {transport["loadCapacity"]} кг
          </Typography>
          :
          <></>
        }
        {
          transport && transport["passengerCapacity"] && props.isMain
          ?
          <Typography fontSize={16}>
            Вместительность: {transport["passengerCapacity"]} человек(а)
          </Typography>
          :
          <></>
        }
        {
          transport && transport["fare"] && props.isMain
          ?
          <Typography fontSize={16}>
            Стоимость проезда: {transport["fare"]} руб.
          </Typography>
          :
          <></>
        }
        {
          !props.isMain && transport
          ?
          <>
            <Typography fontSize={16}>
              Марка: {transport["brand"]}
            </Typography>
            <Typography fontSize={16}>
              Модель: {transport["model"]}
            </Typography>
            <Typography fontSize={16}>
              Номер: {transport["number"] ? transport["number"] : "отсутствует"}
            </Typography>
          </>
          :
          <></>
        }
        {
          transport && transport["color"]
          ?
          <Typography fontSize={16}>
            Цвет: {transport["color"]}
          </Typography>
          :
          <></>
        }
        {
          transport && props.isMain
          ?
          <>
            <Typography fontSize={16}>
              Дата получения: {transport["receiveDate"]}
            </Typography>
          </>
          :
          <></>
        }
        {
          transport && transport["decommissioningDate"] && props.isMain
          ?
          <>
            <Typography fontSize={16}>
              Дата списания: {transport["decommissioningDate"]}
            </Typography>
          </>
          :
          <></>
        }
        {
          transport && transport["usageCount"] > 0 && props.isMain
          ?
          <>
            <Typography fontSize={16}>
              Число поездок: {transport["usageCount"]}
            </Typography>
            <Link passHref href={{ pathname: "/usage", query: { transportId: transport["id"], transportType: transport["type"] }}}> 
              <Button style={{fontSize: 14, marginTop: '2%'}}>
                К поездкам
              </Button>
            </Link>
          </>
          :
          transport && transport["usageCount"] == 0 && props.isMain
          ?
          <Typography fontSize={16}>
            Нет поездок
          </Typography>
          :
          <></>
        }
      </Grid>
    </>
  );
}

TransportCard.defaultProps = {
  isMain: false,
  disableUnbind: false,
  disableDelete: false
};
