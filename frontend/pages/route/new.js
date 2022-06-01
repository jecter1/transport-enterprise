import { Grid, TextField, Typography } from "@mui/material";
import React from "react";
import { Button } from "@mui/material";
import PageTemplate from "../../templates/PageTemplate";
import { makeStyles } from "@mui/styles";
import postRequest from "../../util/postRequest";

export default function AddRoute() {
  const [id, setId] = React.useState(-1);
  const [number, setNumber] = React.useState(null);
  const [startPoint, setStartPoint] = React.useState("");
  const [finishPoint, setFinishPoint] = React.useState("");

  const handleClick = async (e) => {
    if (startPoint != "" && finishPoint != "" && number && /^\d+$/.test(number)) {
      await postRequest("/route", {"number": number, "startPoint": startPoint, "finishPoint": finishPoint}, setId);
    } else {
      setId(0);
    }
  }

  const classes = makeStyles((theme) => ({
    root: {
      "& .MuiTextField-root": {
        margin: theme.spacing(1),
        width: 200
      },
      "& .MuiFormHelperText-root": {
        color: "#ffffff"
      }
    },
    bg: {
      backgroundColor: "#7986cb"
    },
    textfield: {
      color: "#bbbbbb",
      alignSelf: "center",
    },
    textfieldError: {
      color: "#d22e2e",
      alignSelf: "center",
    }
  }))();

  const MainPanel = () => {
    if (id > 0) {
      location.href = "/route/" + id;
    }

    return (
      <Grid container direction="column" justifyContent="center" alignItems="center" style={{width: '30%', height: '100%'}}>
        <Grid container justifyContent="center" alignItems="center" style={{width: '100%', height: '5%', backgroundColor: "#222533"}}>
          <Typography color="#ffffff" fontSize={18}>
            Добавление маршрута
          </Typography>
        </Grid>
        <Grid container style={{height: '0.5%'}}>
        </Grid>
        <Grid 
          container 
          direction="column" 
          justifyContent="center" 
          alignItems="center" 
          style={{
            width: '100%', 
            height: '50%', 
            backgroundColor: "#222533"
          }}
          sx={{
            svg: {color: "#ffffff"}, 
            input: {color: "#ffffff"}, 
            label: {color: "#ffffff"},
            '& label.Mui-focused': {
              color: '#ffffff',
            },
            '& .MuiInput-underline:after': {
              borderBottomColor: '#ffffff',
                color: '#ffffff'
            },
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: '#ffffff',
                color: '#ffffff'
              },
              '&:hover fieldset': {
                borderColor: '#ffffff',
                color: '#ffffff'
              },
              '&.Mui-focused fieldset': {
                borderColor: '#ffffff',
                color: '#ffffff'
              }
            },
          }}>
          <TextField 
            onChange={(e) => {setNumber(e.target.value)}}
            label="Номер маршрута*" 
            style={{margin: "2%"}} 
            helperText="положительное число"  
            autoComplete="off"
            FormHelperTextProps={id == 0 ? {className: classes.textfieldError} : {className: classes.textfield}}
          />
          <TextField 
            onChange={(e) => {setStartPoint(e.target.value.trim())}}
            label="Начальная точка*" 
            style={{margin: "2%"}} 
            helperText="до 50 символов" 
            autoComplete="off"
            FormHelperTextProps={id == 0 ? {className: classes.textfieldError} : {className: classes.textfield}}
          />
          <TextField 
            onChange={(e) => {setFinishPoint(e.target.value.trim())}}
            label="Конечная точка*" 
            style={{margin: "2%"}} 
            helperText="до 50 символов" 
            autoComplete="off"
            FormHelperTextProps={id == 0 ? {className: classes.textfieldError} : {className: classes.textfield}}
          />
          <Typography 
            style={id == 0 ? {color: "#d22e2e"} : {color: "#bbbbbb"}}
            sx={{margin: "2%"}}
          >
            * обязательные поля
          </Typography>
          <Button 
            onClick={handleClick} 
            style={{margin: "2%", fontSize: 18}}
          >
            Добавить
          </Button>
        </Grid>
      </Grid>
    );
  }

  return (
    <PageTemplate pageTitle={"Добавление маршрута"}
                  mainPanel={MainPanel()}/>
  );
}
