import React from "react";
import { Grid, Tooltip, IconButton, Typography, Button } from "@mui/material";
import { Dialog, DialogActions, DialogContent, DialogContentText } from "@mui/material";
import InsertDriveFileOutlinedIcon from "@mui/icons-material/InsertDriveFileOutlined";
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import Link from "next/link";

/*
 * props.isMain
 * props.name
 * 
 * props.href (not main)
 * props.refTooltip (not main)
 * props.disableRef (not main)
 * props.disableUnbind (not main)
 * props.onUnbindClick (not main)
 * props.unbindWarning (not main)
 * 
 * props.onEditClick (main)
 * props.disableDelete (main)
 * props.onDeleteClick (main)
 * props.deleteWarning (main)
 */
export default function CardHeader(props) {
  const [openDelete, setOpenDelete] = React.useState(false);
  const [openUnbind, setOpenUnbind] = React.useState(false);
  const unbindColor = props.disableUnbind ? '#444444' : '#ffffff';
  const deleteColor = props.disableDelete ? '#444444' : '#ffffff';

  return (
    <Grid container justifyContent="space-around" alignItems="center" style={{width: '100%', height: '5%', backgroundColor: "#222533"}}>
      {
        props.isMain
        ?
        <Tooltip title="Редактировать">
          <IconButton color="white" disableRipple onClick={props.onEditClick}>
            <EditOutlinedIcon/>
          </IconButton>
        </Tooltip>
        :
        props.disableRef
        ?
        <IconButton disabled disableRipple style={{color: "#444444"}}>
          <InsertDriveFileOutlinedIcon/>
        </IconButton>
        :
        <Link passHref href={props.href}>
          <Tooltip title={props.refTooltip}>
            <IconButton disableRipple style={{color: "#ffffff"}}>
              <InsertDriveFileOutlinedIcon/>
            </IconButton>
          </Tooltip>
        </Link>
      }
      <Typography fontSize={18}>
        {props.name}
      </Typography>
      {
        props.isMain
        ?
        <>
          <Tooltip title="Удалить">
            <IconButton disabled={props.disableDelete} disableRipple style={{color: deleteColor}} onClick={(e) => {setOpenDelete(true)}}>
              <DeleteOutlinedIcon/>
            </IconButton>
          </Tooltip>
          <Dialog
            open={openDelete}
            onClose={(e) => {setOpenDelete(false)}}
          >
            <DialogContent style={{background: '#222533'}}>
              <DialogContentText style={{fontSize: 16, color: '#ffffff'}}>
                {props.deleteWarning}
              </DialogContentText>
            </DialogContent>
            <DialogActions style={{background: '#222533'}}>
              <Button onClick={(e) => {setOpenDelete(false)}}>Нет</Button>
              <Button onClick={props.onDeleteClick}>Да</Button>
            </DialogActions>
          </Dialog>
        </>
        :
        <>
          <Tooltip title="Отвязать">
            <IconButton disabled={props.disableUnbind} disableRipple style={{color: unbindColor}} onClick={(e) => {setOpenUnbind(true)}}>
              <ClearOutlinedIcon/>
            </IconButton>
          </Tooltip>
          <Dialog
            open={openUnbind}
            onClose={(e) => {setOpenUnbind(false)}}
          >
            <DialogContent style={{background: '#222533'}}>
              <DialogContentText style={{fontSize: 16, color: '#ffffff'}}>
                {props.unbindWarning}
              </DialogContentText>
            </DialogContent>
            <DialogActions style={{background: '#222533'}}>
              <Button onClick={(e) => {setOpenUnbind(false)}}>Нет</Button>
              <Button onClick={props.onUnbindClick}>Да</Button>
            </DialogActions>
          </Dialog>
        </>
      }
    </Grid>
  );
}
