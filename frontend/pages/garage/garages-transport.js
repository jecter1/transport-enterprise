import GaragesTransportTable from "../../components/tables/garage/GaragesTransportTable";
import React from "react";
import getRequest from "../../util/getRequest";
import { useEffect } from "react";
import PageTemplate from "../../templates/PageTemplate";
import TableMainPanel from "../../templates/TableMainPanel";

export default function GaragesTransport() {
  const pageTitle = "Распределение транспорта по гаражам";
  
  const [rows, setRows] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  
  useEffect(() => {
      getRequest('garage/garages-transport', setRows);
      setLoading(false);
  }, []);

  return (
    loading
    ?
    <PageTemplate 
      hasSidePanels={false} 
      pageTitle={"Загрузка..."}
    />
    :
    <PageTemplate 
      pageTitle={pageTitle} 
      mainPanel={TableMainPanel(pageTitle, GaragesTransportTable, rows)}
    />
  );
}