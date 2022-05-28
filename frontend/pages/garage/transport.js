import React from "react";
import getData from "../../util/getData";
import { useEffect } from "react";
import PageTemplate from "../../templates/PageTemplate";
import TableMainPanel from "../../templates/TableMainPanel";
import TransportTable from "../../components/garage/tables/TransportTable";

export default function All() {
  const pageTitle = "Распределение транспорта по гаражам";
  
  const [rows, setRows] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  
  useEffect(() => {
      getData('garage/transport', setRows);
      setLoading(false);
  }, []);

  return (
    loading
    ?
    <PageTemplate hasSidePanels={false} pageTitle={"Загрузка..."}/>
    :
    <PageTemplate pageTitle={pageTitle} mainPanel={TableMainPanel(pageTitle, TransportTable, rows)}/>
  );
}