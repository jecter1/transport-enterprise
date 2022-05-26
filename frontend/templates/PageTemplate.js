import React from "react";
import Head from "next/head";
import Header from "../components/Header";
import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/material";

const TEXT_COLOR = "#ffffff";
const PANEL_TITLES_FONT_SIZE = 16;

/*
 * props.title
 * props.panel
*/
function SidePanel(props) {
  var contentBoxStyle = props.title ? {
    width: '100%', height: '95%', overflow: 'auto'
  } : {
    width: '100%', height: '100%', overflow: 'auto'
  }

  return (
    <Grid container alignItems="center" style={{width: '17%', height: '100%', backgroundColor: "#222533"}}>
      {
        props.title 
        ? 
        <Grid container justifyContent="center" alignItems="center" style={{width: '100%', height: '5%'}}>
          <Typography color={TEXT_COLOR} fontSize={PANEL_TITLES_FONT_SIZE}>
            {props.title}
          </Typography>
        </Grid>
        :
        <></>
      }
      <Box container direction="column" justifyContent="center" alignItems="center" style={contentBoxStyle}>
        {props.panel ? props.panel : <></>}
      </Box>
    </Grid>
  );
}

/*
 * props.pageTitle (default: "Автопредприятие")
 * props.hasSidePanels (default: true)
 * props.leftPanelTitle
 * props.leftPanel
 * props.rightPanelTitle
 * props.rightPanel
 * props.mainPanel
*/
export default function PageTemplate(props) {
  var mainGridStyle = props.hasSidePanels ? {
    width: '66%', height: '100%', backgroundColor: "#1a1c26"
  } : {
    width: '100%', height: '100%', backgroundColor: "#1a1c26"
  }

  return (
    <>
      <Head>
        <title>{props.pageTitle}</title>
      </Head>

      <Grid container direction="column" style={{height: "100vh", width: '100vw'}}>
        <Grid container style={{height: '6.6%'}}>
          <Header/>
        </Grid>

        <Grid container justifyContent="space-between" alignItems="center" direction="row" style={{height: "93.4%", width: '100%', backgroundColor: "#1a1c26"}}>
          {
            props.hasSidePanels 
            ?
            <SidePanel title={props.leftPanelTitle} panel={props.leftPanel}/>
            :
            <></>
          }
          <Grid container 
                direction="column" 
                justifyContent="center" 
                alignItems="center" 
                style={mainGridStyle}>
            {props.mainPanel ? props.mainPanel : <></>}
          </Grid>
          {
            props.hasSidePanels ?
            <SidePanel title={props.rightPanelTitle} panel={props.rightPanel}/>
            :
            <></>
          }
        </Grid>
      </Grid>
    </>
  );
}

PageTemplate.defaultProps = {
  hasSidePanels : true, 
  pageTitle: "Автопредприятие"
}
