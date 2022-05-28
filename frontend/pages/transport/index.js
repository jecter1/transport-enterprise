import TransportTable from "../../components/transport/tables/TransportTable";
import React from "react";
import getData from "../../util/getData";
import { useEffect } from "react";
import PageTemplate from "../../templates/PageTemplate";
import TableMainPanel from "../../templates/TableMainPanel";

export default function All() {
  const pageTitle = "Список транспорта";
  
  const [rows, setRows] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  
  useEffect(() => {
      getData('transport/all', setRows);
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