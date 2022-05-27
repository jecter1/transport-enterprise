import RouteTable from "../../components/transport/tables/RouteTable";
import React from "react";
import getData from "../../util/getData";
import { useEffect } from "react";
import PageTemplate from "../../templates/PageTemplate";
import TableMainPanel from "../../templates/TableMainPanel";

export default function Drivers() {
  const pageTitle = "Распределение транспорта по маршрутам";
  
  const [rows, setRows] = React.useState([{}]);
  
  useEffect(() => {
      getData('transport/routes', setRows)
  }, []);

  return (
    <PageTemplate pageTitle={pageTitle} mainPanel={TableMainPanel(pageTitle, RouteTable, rows)}/>
  );
}