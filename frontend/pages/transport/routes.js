import RouteTable from "../../components/transport/tables/RouteTable";
import React from "react";
import getData from "../../util/getData";
import { useEffect } from "react";
import PageTemplate from "../../templates/PageTemplate";
import TableMainPanel from "../../templates/TableMainPanel";

export default function Drivers() {
  const pageTitle = "Распределение транспорта по маршрутам";
  
  const [rows, setRows] = React.useState([{}]);
  const [loading, setLoading] = React.useState(true);
  
  useEffect(() => {
      getData('transport/routes', setRows);
      setLoading(false);
  }, []);

  return (
    loading
    ?
    <PageTemplate hasSidePanels={false} pageTitle={"Загрузка..."}/>
    :
    <PageTemplate pageTitle={pageTitle} mainPanel={TableMainPanel(pageTitle, RouteTable, rows)}/>
  );
}