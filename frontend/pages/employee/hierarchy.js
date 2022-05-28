import HierarchyTable from "../../components/employee/tables/HierarchyTable";
import React from "react";
import getData from "../../util/getData";
import { useEffect } from "react";
import PageTemplate from "../../templates/PageTemplate";
import TableMainPanel from "../../templates/TableMainPanel";

export default function Hierarchy() {
  const pageTitle = "Подчиненность сотрудников";

  const [rows, setRows] = React.useState([{}]);
  const [loading, setLoading] = React.useState(true);
  
  useEffect(() => {
      getData('employee/hierarchy', setRows);
      setLoading(false);
  }, []);

  return (
    loading
    ?
    <PageTemplate hasSidePanels={false} pageTitle={"Загрузка..."}/>
    :
    <PageTemplate pageTitle={pageTitle} mainPanel={TableMainPanel(pageTitle, HierarchyTable, rows)}/>
  );
}