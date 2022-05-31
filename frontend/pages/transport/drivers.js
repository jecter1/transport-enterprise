import DriverTable from "../../components/transport/tables/DriverTable";
import React from "react";
import getRequest from "../../util/getRequest";
import { useEffect } from "react";
import PageTemplate from "../../templates/PageTemplate";
import TableMainPanel from "../../templates/TableMainPanel";

export default function Drivers() {
  const pageTitle = "Распределение транспорта по водителям";
  
  const [rows, setRows] = React.useState([{}]);
  const [loading, setLoading] = React.useState(true);
  
  useEffect(() => {
      getRequest('transport/drivers', setRows);
      setLoading(false);
  }, []);

  return (
    loading
    ?
    <PageTemplate hasSidePanels={false} pageTitle={"Загрузка..."}/>
    :
    <PageTemplate pageTitle={pageTitle} mainPanel={TableMainPanel(pageTitle, DriverTable, rows)}/>
  );
}