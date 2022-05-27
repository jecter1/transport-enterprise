import React from 'react';
import Link from 'next/link';
import Toolbar from '@mui/material/Toolbar';
import Grid from '@mui/material/Grid';
import AppBar from '@mui/material/AppBar';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import { Button, ButtonGroup, Divider, IconButton } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import { Menu, MenuItem } from '@mui/material';

export default function Header() {
  const [anchorEmployeeEl, setAnchorEmployeeEl] = React.useState(null);
  const [anchorTransportEl, setAnchorTransportEl] = React.useState(null);
  const [anchorRepairEl, setAnchorRepairEl] = React.useState(null);
  const [anchorGarageEl, setAnchorGarageEl] = React.useState(null);

  const openEmployee = Boolean(anchorEmployeeEl);
  const openTransport = Boolean(anchorTransportEl);
  const openRepair = Boolean(anchorRepairEl);
  const openGarage = Boolean(anchorGarageEl);

  const handleClickEmployee = (event) => {
    setAnchorEmployeeEl(event.currentTarget);
  };

  const handleCloseEmployee = () => {
    setAnchorEmployeeEl(null);
  };

  const handleClickTransport = (event) => {
    setAnchorTransportEl(event.currentTarget);
  };

  const handleCloseTransport = () => {
    setAnchorTransportEl(null);
  };

  const handleClickRepair = (event) => {
    setAnchorRepairEl(event.currentTarget);
  };

  const handleCloseRepair = () => {
    setAnchorRepairEl(null);
  };

  const handleClickGarage = (event) => {
    setAnchorGarageEl(event.currentTarget);
  };

  const handleCloseGarage = () => {
    setAnchorGarageEl(null);
  };

  return (
    <AppBar position='static' sx={{ background: "#2b2f40", height: "100%", width: "100%", boxShadow: "0 0 0em black" }}>
      <Toolbar>
        <Grid container direction="row" justifyContent="space-between" alignItems="center">
          <Grid item sm={2} style={{ textAlign: 'center' }}>
            <Link href="/" passHref>
              <IconButton color="white" disableRipple>
                <HomeOutlinedIcon/>
              </IconButton>
            </Link>
          </Grid>
          <Grid item sm={8} style={{ textAlign: 'center' }}>
            <Button style={{fontSize: 18}} onClick={handleClickTransport}>
              Транспорт
            </Button>
            <Menu
              anchorEl={anchorTransportEl}
              open={openTransport}
              onClose={handleCloseTransport}
            >
              <Link href="/transport/" passHref>
                <MenuItem onClick={handleCloseTransport}>Список</MenuItem>
              </Link>
              <Link href="/transport/drivers" passHref>
                <MenuItem onClick={handleCloseTransport}>Распределение по водителям</MenuItem>
              </Link>
              <Link href="/transport/routes" passHref>
                <MenuItem onClick={handleCloseTransport}>Распределение по маршрутам</MenuItem>
              </Link>
              <MenuItem onClick={handleCloseTransport}>TODO: Пробег</MenuItem>
              <MenuItem onClick={handleCloseTransport}>TODO: Полученный и списанный</MenuItem>
              <MenuItem onClick={handleCloseTransport}>TODO: Добавить транспорт</MenuItem>
              <MenuItem onClick={handleCloseTransport}>TODO: Добавить маршрут</MenuItem>
            </Menu>
            <Button style={{fontSize: 18}} onClick={handleClickEmployee}>
              Сотрудники
            </Button>
            <Menu
              anchorEl={anchorEmployeeEl}
              open={openEmployee}
              onClose={handleCloseEmployee}
            >
              <Link href="/employee/" passHref>
                <MenuItem onClick={handleCloseEmployee}>Список</MenuItem>
              </Link>
              <Link href="/employee/drivers/" passHref>
                <MenuItem onClick={handleCloseEmployee}>Распределение водителей</MenuItem>
              </Link>
              <Link href="/employee/hierarchy" passHref>
                <MenuItem onClick={handleCloseEmployee}>Подчиненность</MenuItem>
              </Link>
              <Link href="/employee/add" passHref>
                <MenuItem onClick={handleCloseEmployee}>TODO: Добавить сотрудника</MenuItem>
              </Link>
            </Menu>
            <Button style={{fontSize: 18}} onClick={handleClickRepair}>
              Ремонты
            </Button>
            <Menu
              anchorEl={anchorRepairEl}
              open={openRepair}
              onClose={handleCloseRepair}
            >
              <MenuItem onClick={handleCloseRepair}>TODO: Список</MenuItem>
              <MenuItem onClick={handleCloseRepair}>TODO: Число и стоимость</MenuItem>
              <MenuItem onClick={handleCloseRepair}>TODO: Число использованных узлов</MenuItem>
              <MenuItem onClick={handleCloseRepair}>TODO: Добавить запись о ремонте</MenuItem>
            </Menu> 
            <Button style={{fontSize: 18}} onClick={handleClickGarage}>
              Гаражи
            </Button>
            <Menu
              anchorEl={anchorGarageEl}
              open={openGarage}
              onClose={handleCloseGarage}
            >
              <MenuItem onClick={handleCloseGarage}>TODO: Список</MenuItem>
              <MenuItem onClick={handleCloseGarage}>TODO: Распределение транспорта</MenuItem>
              <MenuItem onClick={handleCloseGarage}>TODO: Добавить гараж</MenuItem>
            </Menu>
          </Grid>
          <Grid item sm={2} style={{ textAlign: 'center' }}>
            <Link href="https://github.com/jecter1/transport-enterprise" passHref>
              <IconButton color="white" disableRipple>
                <GitHubIcon/>
              </IconButton>
            </Link>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>

  );
}
