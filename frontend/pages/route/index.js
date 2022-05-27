import RouteTable from "../../components/route/tables/RouteTable";
import React from "react";
import getData from "../../util/getData";
import { useEffect } from "react";
import PageTemplate from "../../templates/PageTemplate";
import TableMainPanel from "../../templates/TableMainPanel";

export default function All() {
  const pageTitle = "Список маршрутов";
  
  const [rows, setRows] = React.useState([{}]);
  
  useEffect(() => {
      getData('route/all', setRows)
  }, []);

  return (
    <PageTemplate pageTitle={pageTitle} mainPanel={TableMainPanel(pageTitle, RouteTable, rows)}/>
  );
}