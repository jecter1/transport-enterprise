import { Grid, Typography } from "@mui/material";
import { useRouter } from 'next/router';
import React from "react";
import getData from "../../util/getData";
import { useEffect } from "react";
import PageTemplate from "../../templates/PageTemplate";
import { Button } from "@mui/material";
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { IconButton } from "@mui/material";
import deleteRequest from "../../util/deleteRequest";
import { Tooltip } from "@mui/material";
import { Dialog } from "@mui/material";
import { DialogActions } from "@mui/material";
import { DialogContent } from "@mui/material";
import { DialogContentText } from "@mui/material";

export default function GarageProfile() {
  const [garage, setGarage] = React.useState();
  const [transportList, setTransportList] = React.useState([]);
  const [openDelete, setOpenDelete] = React.useState(false);
  const [loading, setLoading] = React.useState(true);

  const router = useRouter();

  useEffect(() => { 
    const fetchData = async () => {
      if (router.isReady) {
        const { id } = router.query;
        await getData(('/garage/' + id), setGarage);
        await getData(('/garage/' + id + "/transport"), setTransportList);
      }
    }
    fetchData();
    setLoading(false);
  }, [router.isReady]);

  const onDeleteClick = () => {
    deleteRequest("/garage/" + garage["id"]);
    location.href = "/garage";
  }

  const LeftPanel = () => {
    return (
      <>
        { 
          transportList.map((transport) => {
            const transport_id = transport["id"];
            return (
              <Grid item sx={{paddingX: '5%', paddingY: '2%'}}>
              <a href={"/transport/"+transport_id} style={{textDecoration: "none"}}>
                <Button style={{fontSize: 14, width: '100%', height: '100%'}}>
                  {transport["number"] ? transport["number"] : "Без номера"}
                  <br/>
                  {transport["brand"] + " " + transport["model"]}
                  <br/>
                  {transport["type"] ? "<" + transport["type"] + ">" : ""}
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
            {"Гараж (" + garage["location"] + ")"}
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
                Вы уверены что хотите удалить данные о гараже?
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
        <Grid container direction="column" justifyContent="center" alignItems="center" style={{width: '100%', height: '15%', backgroundColor: "#222533"}}>
          { 
            garage
            ?
            <Typography fontSize={16}>
              {garage["description"] ? garage["description"] : "Описание отсутствует"}
            </Typography>
              :
            <></>
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
    garage
    ?
    <PageTemplate pageTitle={"Гараж (" + garage["location"] + ")"}
                  mainPanel={MainPanel()}
                  leftPanelTitle={"Привязанный транспорт (" + transportList.length + ")"}
                  leftPanel={LeftPanel()}/>
    :
    <PageTemplate pageTitle={"Гараж не найден"} hasSidePanels={false} mainPanel={<Typography fontSize={20}>Гараж не найден</Typography>}/>
  );
}
