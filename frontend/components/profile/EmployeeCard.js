import React from "react";
import { Button, Grid, Typography } from "@mui/material";
import CardHeader from "./CardHeader";
import Link from "next/link";

/*
 * props.employee
 * props.isMain
 * props.onUnbindClick (not main)
 * props.disableUnbind (not main)
 * props.onEditClick (main)
 * props.onDeleteClick (main)
 * props.disableDelete (main)
 */
export default function EmployeeCard(props) {
  const employee = props.employee;

  const deleteWarning = "Вы точно хотите удалить данные о сотруднике?";
  const unbindWarning = "Вы точно хотите отвязать сотрудника?";
  const headerName = props.isMain && employee ? employee["name"] : "Сотрудник";

  const cardHeight = employee ? '20%' : '10%';

  return (
    <>
      <CardHeader isMain={props.isMain} 
                  name={headerName} 
                  deleteWarning={deleteWarning} 
                  unbindWarning={unbindWarning}
                  href={employee ? ("/employee/" + employee["id"]) : ""}
                  onUnbindClick={props.onUnbindClick}
                  onEditClick={props.onEditClick}
                  onDeleteClick={props.onDeleteClick}
                  disableUnbind={employee == null || props.disableUnbind}
                  disableDelete={props.disableDelete}
                  disableRef={employee ? false : true}
                  refTooltip="Перейти к сотруднику"/>

      <Grid container style={{height: '0.5%'}}/>

      <Grid container direction="column" justifyContent="center" alignItems="center" style={{width: '100%', height: cardHeight, backgroundColor: "#222533"}}>
        {
          !employee
          ?
          <Typography fontSize={16}>
            Не привязан к сотруднику
          </Typography>
          :
          <></>
        }
        {
          employee && !props.isMain
          ?
          <Typography fontSize={16}>
            Имя: {employee["name"]}
          </Typography>
          :
          <></>
        }
        {
          employee
          ?
          <>
            <Typography fontSize={16}>
              Дата рождения: {employee["birthDate"]}
            </Typography>
            <Typography fontSize={16}>
              Должность: {employee["position"]}
            </Typography>
          </>
          :
          <></>
        }
        {
          employee && employee["type"]
          ?
          <Typography fontSize={16}>
            Специализация: {employee["type"]}
          </Typography>
          :
          <></>
        }
        {
          employee &&
          (employee["type"] == "Техник" || 
          employee["type"] == "Слесарь" || 
          employee["type"] == "Сборщик" || 
          employee["type"] == "Сварщик" || 
          employee["type"] == "Обслуживающий персонал") &&
          employee["repairsCount"] == 0 &&
          props.isMain 
          ?
          <Typography fontSize={16}>
            Нет ремонтов
          </Typography>
          :
          employee && employee["repairsCount"] > 0 && props.isMain
          ?
          <>
            <Typography fontSize={16}>
              Ремонтов: {employee["repairsCount"]}
            </Typography>
            <Link passHref href={{ pathname: "/repair", query: { employeeId: employee["id"] }}}>
              <Button style={{fontSize: 14, marginTop: '2%'}}>
                К ремонтам
              </Button>
            </Link>
          </>
          :
          <></>
        }
      </Grid>
    </>
  );
}

EmployeeCard.defaultProps = {
  isMain: false,
  disableUnbind: false,
  disableDelete: false
};