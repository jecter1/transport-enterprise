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
  const openEmployee = Boolean(anchorEmployeeEl);
  const openTransport = Boolean(anchorTransportEl);

  const handleClickEmployee = (event) => {
    setAnchorEmployeeEl(event.currentTarget);
  };

  const handleClickTransport = (event) => {
    setAnchorTransportEl(event.currentTarget);
  };

  const handleCloseEmployee = () => {
    setAnchorEmployeeEl(null);
  };

  const handleCloseTransport = () => {
    setAnchorTransportEl(null);
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
                <MenuItem onClick={handleCloseEmployee}>Добавление</MenuItem>
              </Link>
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
