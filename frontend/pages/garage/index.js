import GarageTable from "../../components/garage/tables/GarageTable";
import React from "react";
import getData from "../../util/getData";
import { useEffect } from "react";
import PageTemplate from "../../templates/PageTemplate";
import TableMainPanel from "../../templates/TableMainPanel";
import { Garage } from "@mui/icons-material";

export default function All() {
  const pageTitle = "Список гаражей";
  
  const [rows, setRows] = React.useState([{}]);
  
  useEffect(() => {
      getData('garage/all', setRows)
  }, []);

  return (
    <PageTemplate pageTitle={pageTitle} mainPanel={TableMainPanel(pageTitle, GarageTable, rows)}/>
  );
}