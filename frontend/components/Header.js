import React from 'react';
import Link from 'next/link';
import Toolbar from '@mui/material/Toolbar';
import Grid from '@mui/material/Grid';
import AppBar from '@mui/material/AppBar';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import { Button, IconButton } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import { Menu, MenuItem } from '@mui/material';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';

export default function Header() {
  const [anchorEmployeeEl, setAnchorEmployeeEl] = React.useState(null);
  const [anchorTransportEl, setAnchorTransportEl] = React.useState(null);
  const [anchorRepairEl, setAnchorRepairEl] = React.useState(null);
  const [anchorGarageEl, setAnchorGarageEl] = React.useState(null);
  const [anchorRouteEl, setAnchorRouteEl] = React.useState(null);
  const [anchorUsageEl, setAnchorUsageEl] = React.useState(null);

  const openEmployee = Boolean(anchorEmployeeEl);
  const openTransport = Boolean(anchorTransportEl);
  const openRepair = Boolean(anchorRepairEl);
  const openGarage = Boolean(anchorGarageEl);
  const openRoute = Boolean(anchorRouteEl);
  const openUsage = Boolean(anchorUsageEl);

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

  const handleClickRoute = (event) => {
    setAnchorRouteEl(event.currentTarget);
  };

  const handleCloseRoute = () => {
    setAnchorRouteEl(null);
  };

  const handleClickUsage = (event) => {
    setAnchorUsageEl(event.currentTarget);
  };

  const handleCloseUsage = () => {
    setAnchorUsageEl(null);
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
              ??????????????????
            </Button>
            <Menu
              anchorEl={anchorTransportEl}
              open={openTransport}
              onClose={handleCloseTransport}
            >
              <Link href="/transport/">
                <MenuItem onClick={handleCloseTransport}><SearchOutlinedIcon/>???????????? (1, 12)</MenuItem>
              </Link>
              <Link href="/transport/transport-drivers">
                <MenuItem onClick={handleCloseTransport}><SearchOutlinedIcon/>?????????????????????????? ?????????????????? (3)</MenuItem>
              </Link>
              <Link href="/transport/route-transport-routes">
                <MenuItem onClick={handleCloseTransport}><SearchOutlinedIcon/>?????????????????????????? ???? ?????????????????? (4)</MenuItem>
              </Link>
              <MenuItem onClick={handleCloseTransport}><AddOutlinedIcon/>TODO: ???????????????? ??????????????????</MenuItem>
            </Menu>
            <Button style={{fontSize: 18}} onClick={handleClickEmployee}>
              ????????????????????
            </Button>
            <Menu
              anchorEl={anchorEmployeeEl}
              open={openEmployee}
              onClose={handleCloseEmployee}
            >
              <Link href="/employee/">
                <MenuItem onClick={handleCloseEmployee}><SearchOutlinedIcon/>????????????</MenuItem>
              </Link>
              <Link href="/employee/drivers-transport">
                <MenuItem onClick={handleCloseEmployee}><SearchOutlinedIcon/>?????????????????????????? ???????????????????? (2)</MenuItem>
              </Link>
              <Link href="/employee/employee-hierarchy">
                <MenuItem onClick={handleCloseEmployee}><SearchOutlinedIcon/>?????????????????????????? (7)</MenuItem>
              </Link>
              <MenuItem onClick={handleCloseEmployee}><AddOutlinedIcon/>TODO: ???????????????? ????????????????????</MenuItem>
            </Menu>
            <Button style={{fontSize: 18}} onClick={handleClickRepair}>
              ??????????????
            </Button>
            <Menu
              anchorEl={anchorRepairEl}
              open={openRepair}
              onClose={handleCloseRepair}
            >
              <Link href="/repair">
                <MenuItem onClick={handleCloseRepair}><SearchOutlinedIcon/>???????????? (14)</MenuItem>
              </Link>
              <Link href="/repair/repairs-count-cost">
                <MenuItem onClick={handleCloseRepair}><SearchOutlinedIcon/>?????????? ?? ?????????????????? (6, 11)</MenuItem>
              </Link>
              <MenuItem onClick={handleCloseRepair}><AddOutlinedIcon/>TODO: ???????????????? ???????????? ?? ??????????????</MenuItem>
            </Menu> 
            <Button style={{fontSize: 18}} onClick={handleClickGarage}>
              ????????????
            </Button>
            <Menu
              anchorEl={anchorGarageEl}
              open={openGarage}
              onClose={handleCloseGarage}
            >
              <Link href="/garage">
                <MenuItem onClick={handleCloseGarage}><SearchOutlinedIcon/>???????????? (8)</MenuItem>
              </Link>
              <Link href="/garage/garages-transport">
                <MenuItem onClick={handleCloseGarage}><SearchOutlinedIcon/>?????????????????????????? ???????????????????? (9)</MenuItem>
              </Link>
              <MenuItem onClick={handleCloseGarage}><AddOutlinedIcon/>TODO: ???????????????? ??????????</MenuItem>
            </Menu>
            <Button style={{fontSize: 18}} onClick={handleClickRoute}>
              ????????????????
            </Button>
            <Menu
              anchorEl={anchorRouteEl}
              open={openRoute}
              onClose={handleCloseRoute}
            >
              <Link href="/route/">
                <MenuItem onClick={handleCloseRoute}><SearchOutlinedIcon/>????????????</MenuItem>
              </Link>
              <Link href="/route/new">
                <MenuItem onClick={handleCloseRoute}><AddOutlinedIcon/>???????????????? ??????????????</MenuItem>
              </Link>
            </Menu>
            <Button style={{fontSize: 18}} onClick={handleClickUsage}>
              ??????????????
            </Button>
            <Menu
              anchorEl={anchorUsageEl}
              open={openUsage}
              onClose={handleCloseUsage}
            >
              <Link href="/usage/">
                <MenuItem onClick={handleCloseUsage}><SearchOutlinedIcon/>???????????? (10)</MenuItem>
              </Link>
              <Link href="/usage/mileage">
                <MenuItem onClick={handleCloseUsage}><SearchOutlinedIcon/>???????????? (5)</MenuItem>
              </Link>
              <MenuItem onClick={handleCloseUsage}><AddOutlinedIcon/>TODO: ???????????????? ??????????????</MenuItem>
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
