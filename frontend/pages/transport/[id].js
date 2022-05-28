import { Grid, Typography } from "@mui/material";
import { useRouter } from 'next/router';
import React from "react";
import getData from "../../util/getData";
import { useEffect } from "react";
import PageTemplate from "../../templates/PageTemplate";
import { Button } from "@mui/material";
import Link from 'next/link';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { IconButton } from "@mui/material";
import deleteRequest from "../../util/deleteRequest";
import { Tooltip } from "@mui/material";
import { Dialog } from "@mui/material";
import { DialogActions } from "@mui/material";
import { DialogContent } from "@mui/material";
import { DialogContentText } from "@mui/material";
import FreightInfo from "../../components/transport/FreightInfo";
import PassengerInfo from "../../components/transport/PassengerInfo";
import RouteInfo from "../../components/transport/RouteInfo";


export default function TransportProfile() {
  const [transport, setTransport] = React.useState();
  const [drivers, setDrivers] = React.useState([]);
  const [repairs, setRepairs] = React.useState([]);
  const [openDelete, setOpenDelete] = React.useState(false);
  const [loading, setLoading] = React.useState(true);

  const router = useRouter();

  useEffect(() => { 
    const fetchData = async () => {
      if (router.isReady) {
        const { id } = router.query;
        await getData(('/transport/' + id), setTransport);
        await getData(('/transport/' + id + '/drivers'), setDrivers);
        await getData(('/transport/' + id + '/repairs'), setRepairs);
      }
    }
    fetchData();
    setLoading(false);
  }, [router.isReady]);

  const onDeleteClick = () => {
    deleteRequest("/transport/" + transport["id"]);
    location.href = "/transport/";
  }

  const LeftPanel = () => {
    return (
      <>
        { 
          drivers.map((driver) => {
            const driver_id = driver["id"];
            return (
              <Grid item sx={{paddingX: '5%', paddingY: '2%'}}>
              <a href={"/employee/" + driver_id} style={{textDecoration: "none"}}>
                <Button style={{fontSize: 14, width: '100%', height: '100%'}}>
                  {driver["name"]}
                </Button>
              </a>
              </Grid>
            );
          })
        }
      </>
    );
  }

  const RightPanel = () => {
    return (
      <>
        { 
          repairs.map((repair) => {
            const repair_id = repair["id"];
            return (
              <Grid item sx={{paddingX: '5%', paddingY: '2%'}}>
              <a href={"/repair/" + repair_id} style={{textDecoration: "none"}}>
                <Button style={{fontSize: 14, width: '100%', height: '100%'}}>
                  {(repair["assembly"] ? repair["assembly"] : "Узел не выяснен") + " (ID: " + repair["id"] + ")"}
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
      <Grid container justifyContent="space-around" alignItems="center" style={{width: '100%', height: '5%', backgroundColor: "#222533"}}>
        <Tooltip title="Редактировать">
          <IconButton color="white" disableRipple>
            <EditOutlinedIcon/>
          </IconButton>
        </Tooltip>
        <Typography fontSize={18}>
          {transport["brand"] + " " + transport["model"] + " " + (transport["number"] ? transport["number"] : "(без номера)")}
        </Typography>
        <Tooltip title="Удалить">
          <IconButton color="white" disableRipple onClick={(e) => {setOpenDelete(true)}}>
            <DeleteOutlinedIcon/>
          </IconButton>
        </Tooltip>
        <Dialog
          open={openDelete}
          onClose={(e) => {setOpenDelete(false)}}
        >
          <DialogContent style={{background: '#222533'}}>
            <DialogContentText style={{fontSize: 16, color: '#ffffff'}}>
              Вы уверены что хотите удалить данные о транспорте?  
            </DialogContentText>
            <DialogContentText style={{fontSize: 16, color: '#ffffff'}}>
              ВНИМАНИЕ!
            </DialogContentText>
            <DialogContentText style={{fontSize: 16, color: '#ffffff'}}>
              Данная функция не является списанием транспорта и удаляет также данные о всех ремонтах для данного транспорта и всех его использованиях
            </DialogContentText>
          </DialogContent>
          <DialogActions style={{background: '#222533'}}>
            <Button onClick={(e) => {setOpenDelete(false)}}>Нет</Button>
            <Button onClick={(e) => {onDeleteClick()}}>Да</Button>
          </DialogActions>
        </Dialog>
      </Grid>
        <Grid container style={{height: '0.5%'}}>
        </Grid>
        <Grid container direction="column" justifyContent="center" alignItems="center" style={{width: '100%', height: '20%', backgroundColor: "#222533"}}>
          { transport["type"] ?
          <Typography fontSize={16}>
            Тип: {transport["type"]}
          </Typography>
            :
            <></>
          }
          { transport["type"] == "Грузовой" ?
            <FreightInfo/>
            :
            <></>
          }
          { transport["type"] == "Автобус" || transport["type"] == "Маршрутное такси" || transport["type"] == "Такси" || transport["type"] == "Легковой" ?
            <PassengerInfo/>
            :
            <></>
          }
          { transport["color"] ?
          <Typography fontSize={16}>
            Цвет: {transport["color"]}
          </Typography>
            :
            <></>
          }
          { transport["receiveDate"] ?
          <Typography fontSize={16}>
            Дата получения: {transport["receiveDate"]}
          </Typography>
            :
            <></>
          }
          { transport["decommissioningDate"] ?
          <Typography fontSize={16}>
            Дата списания: {transport["decommissioningDate"]}
          </Typography>
            :
            <></>
          }
        </Grid>
        { 
          transport["type"] == "Автобус" || transport["type"] == "Маршрутное такси" 
          ?
          <RouteInfo/>
          :
          <></>
        }
        <Grid container style={{height: '3%'}}>
        </Grid>
        <Grid container justifyContent="center" alignItems="center" style={{width: '100%', height: '5%', backgroundColor: "#222533"}}>
          <Typography fontSize={18}>
            Гараж
          </Typography>
        </Grid>
        <Grid container style={{height: '0.5%'}}>
        </Grid>
        <Grid container direction="column" justifyContent="center" alignItems="center" style={{width: '100%', height: '10%', backgroundColor: "#222533"}}>
          { 
            transport["garageLocation"]
            ?
            <Link passHref href={"/garage/" + transport["garageId"]}>
              <Button style={{fontSize: 14}}>
                {transport["garageLocation"]}
              </Button>
            </Link>
            :
            <Typography fontSize={16}>
              Не привязан к гаражу
            </Typography>
          }
        </Grid>
      </Grid>
    );
  }

  return (
    loading
    ?
    <PageTemplate hasSidePanels={false} pageTitle={"Загрузка..."}/>
    :
    transport
    ?
    <PageTemplate pageTitle={transport["brand"] + " " + transport["model"] + " " + (transport["number"] ? transport["number"] : "(без номера)")}
                  mainPanel={MainPanel()}
                  leftPanelTitle={"Водители (" + drivers.length + ")"}
                  leftPanel={LeftPanel()}
                  rightPanelTitle={"Ремонты (" + repairs.length + ")"}
                  rightPanel={RightPanel()}/>
    :
    <PageTemplate pageTitle={"Транспорт не найден"} hasSidePanels={false} mainPanel={<Typography fontSize={20}>Транспорт не найден</Typography>}/>
  );
}
