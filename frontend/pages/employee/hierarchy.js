import HierarchyTable from "../../components/employee/tables/HierarchyTable";
import React from "react";
import getData from "../../util/getData";
import { useEffect } from "react";
import PageTemplate from "../../templates/PageTemplate";
import TableMainPanel from "../../templates/TableMainPanel";

export default function Hierarchy() {
  const pageTitle = "Подчиненность сотрудников";

  const [rows, setRows] = React.useState([{}]);
  
  useEffect(() => {
      getData('employee/hierarchy', setRows)
  }, []);

  return (
    <PageTemplate pageTitle={pageTitle} mainPanel={TableMainPanel(pageTitle, HierarchyTable, rows)}/>
  );
}