import DriverTable from "../../components/transport/tables/DriverTable";
import React from "react";
import getData from "../../util/getData";
import { useEffect } from "react";
import PageTemplate from "../../templates/PageTemplate";
import TableMainPanel from "../../templates/TableMainPanel";

export default function Drivers() {
  const pageTitle = "Распределение транспорта по водителям";
  
  const [rows, setRows] = React.useState([{}]);
  
  useEffect(() => {
      getData('transport/drivers', setRows)
  }, []);

  return (
    <PageTemplate pageTitle={pageTitle} mainPanel={TableMainPanel(pageTitle, DriverTable, rows)}/>
  );
}