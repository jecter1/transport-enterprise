import UsageTable from "../../components/list/UsageTable";
import React from "react";
import getRequest from "../../util/getRequest";
import { useEffect } from "react";
import PageTemplate from "../../templates/PageTemplate";
import TableMainPanel from "../../templates/TableMainPanel";


export default function All() {
  const pageTitle = "Список поездок";
  
  const [rows, setRows] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  
  useEffect(() => {
      getRequest('usage/all', setRows);
      setLoading(false);
  }, []);

  return (
    loading
    ?
    <PageTemplate hasSidePanels={false} pageTitle={"Загрузка..."}/>
    :
    <PageTemplate pageTitle={pageTitle} mainPanel={TableMainPanel(pageTitle, UsageTable, rows)}/>
  );
}