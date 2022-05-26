import React from 'react';
import Link from 'next/link';
import Toolbar from '@mui/material/Toolbar';
import Grid from '@mui/material/Grid';
import AppBar from '@mui/material/AppBar';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import { Button, ButtonGroup, IconButton } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import { Menu, MenuItem } from '@mui/material';

const text_color = "#ffffff";

export default function Header() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
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
              <Button variant="text"
                      style={{textTransform: 'none', 
                              color: text_color, 
                              backgroundColor: "#2b2f40", 
                              fontSize: 18}} 
                      disableRipple
                      disableElevation
                      onClick={handleClick}>
                Сотрудники
              </Button>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
              >
                <Link href="/employee/" passHref>
                  <MenuItem onClick={handleClose}>Список</MenuItem>
                </Link>
                <Link href="/employee/drivers/" passHref>
                  <MenuItem onClick={handleClose}>Распределение водителей</MenuItem>
                </Link>
                <Link href="/employee/hierarchy" passHref>
                  <MenuItem onClick={handleClose}>Подчиненность</MenuItem>
                </Link>
                <Link href="/employee/add" passHref>
                  <MenuItem onClick={handleClose}>Добавление</MenuItem>
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
