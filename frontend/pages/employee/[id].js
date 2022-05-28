import { Grid, Typography } from "@mui/material";
import { useRouter } from 'next/router';
import React from "react";
import getData from "../../util/getData";
import { useEffect } from "react";
import { Button } from "@mui/material";
import DriverInfo from "../../components/employee/DriverInfo";
import ServiceStaffInfo from "../../components/employee/ServiceStaffInfo";
import PageTemplate from "../../templates/PageTemplate";
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { IconButton } from "@mui/material";
import deleteRequest from "../../util/deleteRequest";
import { Tooltip } from "@mui/material";
import { Dialog } from "@mui/material";
import { DialogActions } from "@mui/material";
import { DialogContent } from "@mui/material";
import { DialogContentText } from "@mui/material";

export default function EmployeeProfile() {
  const [data, setData] = React.useState();
  const [subordinates, setSubordinates] = React.useState([]);
  const [superiors, setSuperiors] = React.useState([]);
  const [openDelete, setOpenDelete] = React.useState(false);
  const [loading, setLoading] = React.useState(true);

  const router = useRouter();

  useEffect(() => { 
    const fetchData = async () => {
      if (router.isReady) {
        const { id } = router.query;
        await getData(('employee/' + id), setData);
        await getData(('employee/subordinates/' + id), setSubordinates);
        await getData(('employee/superiors/' + id), setSuperiors);
      }
    }
    fetchData();
    setLoading(false);
  }, [router.isReady]);

  const onDeleteClick = () => {
    deleteRequest("/employee/" + data["id"]);
    location.href = "/employee/";
  }

  const LeftPanel = () => {
    return (
      <>
        { 
          superiors.map((superior) => {
            const superior_id = superior["id"];
            return (
              <Grid item sx={{paddingX: '5%', paddingY: '2%'}}>
              <a href={"/employee/"+superior_id} style={{textDecoration: "none"}}>
                <Button style={{fontSize: 14, width: '100%', height: '100%'}}>
                  {superior["name"]}
                    <br/>
                  {superior["position"] ? "<" + superior["position"] + ">" : ""}
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
          subordinates.map((subordinate) => {
            const subordinate_id = subordinate["id"];
            return (
              <Grid item sx={{paddingX: '5%', paddingY: '2%'}}>
                <a href={"/employee/"+subordinate_id} style={{textDecoration: "none"}}>
                  <Button style={{fontSize: 14, width: '100%', height: '100%'}}>
                    {subordinate["name"]}
                      <br/>
                    {subordinate["position"] ? "<" + subordinate["position"] + ">" : ""}
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
            {data["name"]}
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
                Вы уверены что хотите удалить данные о сотруднике?
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
          { data["type"] ?
          <Typography fontSize={16}>
            Специализация: {data["type"]}
          </Typography>
            :
            <></>
          }
          { data["position"] ?
          <Typography fontSize={16}>
            Должность: {data["position"]}
          </Typography>
            :
            <></>
          }
          { data["birthDate"] ?
          <Typography fontSize={16}>
            Дата рождения: {data["birthDate"]}
          </Typography>
            :
            <></>
          }
          { 
            (data["type"] && data["type"] != "Водитель") 
            ?
            <ServiceStaffInfo/> 
            :
            <></>
          }
        </Grid>
        { 
          data["type"] == "Водитель" 
          ?
          <DriverInfo />
          :
          <></>
        }
      </Grid>
    );
  }

  return (
      loading
      ?
      <PageTemplate hasSidePanels={false} pageTitle={"Загрузка..."}/>
      :
      data 
      ? 
      <PageTemplate pageTitle={data["name"]}
                    mainPanel={MainPanel()}
                    leftPanel={LeftPanel()}
                    leftPanelTitle={"Начальники (" + superiors.length + ")"}
                    rightPanel={RightPanel()}
                    rightPanelTitle={"Подчиненные (" + subordinates.length + ")"}/>
      :
      <PageTemplate pageTitle={"Сотрудник не найден"} hasSidePanels={false} mainPanel={<Typography fontSize={20}>Сотрудник не найден</Typography>}/>
  );
}
