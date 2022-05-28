import { Grid, Typography } from "@mui/material";
import { useRouter } from 'next/router';
import React from "react";
import getData from "../../util/getData";
import { useEffect } from "react";
import PageTemplate from "../../templates/PageTemplate";
import { Button } from "@mui/material";
import Link from 'next/link';

export default function RepairProfile() {
  const [repair, setRepair] = React.useState();
  const [staffList, setStaffList] = React.useState();

  const router = useRouter();

  useEffect(() => { 
    const fetchData = async () => {
      if (router.isReady) {
        const { id } = router.query;
        await getData(('/repair/' + id), setRepair);
        await getData(('/repair/' + id + "/staff"), setStaffList);
      }
    }
    fetchData();
  }, [router.isReady]);

  const LeftPanel = () => {
    return (
      <>
        { 
          staffList.map((staff) => {
            const staff_id = staff["id"];
            return (
              <Grid item sx={{paddingX: '5%', paddingY: '2%'}}>
                <a href={"/employee/" + staff_id} style={{textDecoration: "none"}}>
                  <Button style={{fontSize: 14, width: '100%', height: '100%'}}>
                    {staff["name"]}
                      <br/>
                    {"<" + staff["type"] + ">"}
                  </Button>
                </a>
              </Grid>
            );
          })
        }
      </>
    );
  }

  const MainPanel = () => {
    return (
      <Grid container direction="column" justifyContent="center" alignItems="center" style={{width: '50%', height: '100%'}}>
        <Grid container justifyContent="center" alignItems="center" style={{width: '100%', height: '5%', backgroundColor: "#222533"}}>
          <Typography fontSize={18}>
            {"Ремонт (ID: " + repair["id"] + ")"}
          </Typography>
        </Grid>
        <Grid container style={{height: '0.5%'}}>
        </Grid>
        <Grid container direction="column" justifyContent="center" alignItems="center" style={{width: '100%', height: '30%', backgroundColor: "#222533"}}>
          { 
            repair["assembly"]
            ?
            <Typography fontSize={16}>
              Узел: {repair["assembly"]}
            </Typography>
              :
            <></>
          }
          { 
            repair["cost"]
            ?
            <Typography fontSize={16}>
              Стоимость: {repair["cost"]} руб.
            </Typography>
              :
            <></>
          }
          { 
            repair["startDatetime"] && repair["endDatetime"]
            ?
            <>
              <Typography fontSize={16}>
                Стадия: окончен
              </Typography>
              <Typography fontSize={16}>
                Время начала: {repair["startDatetime"]}
              </Typography>
              <Typography fontSize={16}>
                Время окончания: {repair["endDatetime"]}
              </Typography>
            </>
            :
            repair["startDatetime"]
            ?
            <>
              <Typography fontSize={16}>
                Стадия: начат
              </Typography>
              <Typography fontSize={16}>
                Время начала: {repair["startDatetime"]}
              </Typography>
            </>
            :
            <Typography fontSize={16}>
              Стадия: запланирован
            </Typography>
          }
          { 
            repair["description"]
            ?
            <Typography fontSize={16}>
              Описание: {repair["description"]}
            </Typography>
            :
            <></>
          }
        </Grid>
        <Grid container style={{height: '3%'}}>
        </Grid>
        <Grid container justifyContent="center" alignItems="center" style={{width: '100%', height: '5%', backgroundColor: "#222533"}}>
          <Typography fontSize={18}>
            Транспорт
          </Typography>
        </Grid>
        <Grid container style={{height: '0.5%'}}>
        </Grid>
        <Grid container direction="column" justifyContent="center" alignItems="center" style={{width: '100%', height: '25%', backgroundColor: "#222533"}}>
          { 
            repair["transportId"]
            ?
            <>
              <Typography fontSize={16}>
                {
                  repair["transportBrand"] + " " + 
                  repair["transportModel"] + " " + 
                  (repair["transportNumber"] ? repair["transportNumber"] : "(без номера)")
                }
              </Typography>
              <Typography fontSize={16}>
                Марка: {repair["transportBrand"]}
              </Typography>
              <Typography fontSize={16}>
                Модель: {repair["transportModel"]}
              </Typography>
              <Typography fontSize={16}>
                Номер: {repair["transportNumber"] ? repair["transportNumber"] : "без номера"}
              </Typography>
              <Typography fontSize={16}>
                Тип: {repair["transportType"]}
              </Typography>
              <Typography fontSize={16}>
                Цвет: {repair["transportColor"]}
              </Typography>
              <Link passHref href={"/transport/" + repair["transportId"]}>
                <Button style={{fontSize: 14, marginTop: '2%'}}>
                  Подробнее
                </Button>
              </Link>
            </>
              :
            <></>
          }
        </Grid>
        <Grid container style={{height: '3%'}}>
        </Grid>
        <Grid container justifyContent="center" alignItems="center" style={{width: '100%', height: '5%', backgroundColor: "#222533"}}>
          <Typography fontSize={18}>
            Место проведения
          </Typography>
        </Grid>
        <Grid container style={{height: '0.5%'}}>
        </Grid>
        <Grid container direction="column" justifyContent="center" alignItems="center" style={{width: '100%', height: '10%', backgroundColor: "#222533"}}>
          { 
            repair["garageLocation"]
            ?
            <Link passHref href={"/garage/" + repair["garageId"]}>
              <Button style={{fontSize: 16}}>
                {repair["garageLocation"]}
              </Button>
            </Link>
            :
            repair["startDatetime"]
            ?
            <Typography fontSize={16}>
              [ДАННЫЕ УДАЛЕНЫ]
            </Typography>
            :
            <Typography fontSize={16}>
              Не назначено
            </Typography>
          }
        </Grid>
      </Grid>
    );
  }

  return (
    repair && staffList
    ?
    <PageTemplate pageTitle={"Ремонт (ID: " + repair["id"] + ")"}
                  mainPanel={MainPanel()}
                  leftPanelTitle={"Задействованный персонал (" + staffList.length + ")"}
                  leftPanel={LeftPanel()}/>
    :
    <PageTemplate pageTitle={"Ремонт не найден"} hasSidePanels={false} mainPanel={<Typography fontSize={20}>Ремонт не найден</Typography>}/>
  );
}
