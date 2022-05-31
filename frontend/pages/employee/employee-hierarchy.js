import EmployeeHierarchyTable from "../../components/tables/employee/EmployeeHierarchyTable";
import React from "react";
import getRequest from "../../util/getRequest";
import { useEffect } from "react";
import PageTemplate from "../../templates/PageTemplate";
import TableMainPanel from "../../templates/TableMainPanel";

export default function EmployeeHierarchy() {
  const pageTitle = "Подчиненность сотрудников";

  const [rows, setRows] = React.useState([{}]);
  const [loading, setLoading] = React.useState(true);
  
  useEffect(() => {
      getRequest('employee/employee-hierarchy', setRows);
      setLoading(false);
  }, []);

  return (
    loading
    ?
    <PageTemplate hasSidePanels={false} pageTitle={"Загрузка..."}/>
    :
    <PageTemplate pageTitle={pageTitle} mainPanel={TableMainPanel(pageTitle, EmployeeHierarchyTable, rows)}/>
  );
}