import { Grid, Typography } from "@mui/material";

export default function TableMainPanel(title, tableComponent, rows) {
  return (
    <Grid container direction="column" justifyContent="center" alignItems="center" style={{width: '92.5%', height: '90%', backgroundColor: "#1a1c26"}}>
      <Grid container justifyContent="center" alignItems="center" style={{width: '100%', height: '5%', backgroundColor: "#222533"}}>
        <Typography color="#ffffff" fontSize={18}>
          {title}
        </Typography>
      </Grid>
      <Grid container style={{height: '0.5%'}}>
      </Grid>
      <Grid container justifyContent="center" alignItems="center" style={{width: '100%', height: '94%', backgroundColor: "#222533"}}>
        {tableComponent({ rows: rows })}
      </Grid>
    </Grid>
  );
}