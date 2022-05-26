import EmployeeTable from "../../components/employee/tables/EmployeeTable";
import React from "react";
import getData from "../../util/getData";
import { useEffect } from "react";
import PageTemplate from "../../templates/PageTemplate";
import TableMainPanel from "../../templates/TableMainPanel";

export default function All() {
  const pageTitle = "Список сотрудников";
  
  const [rows, setRows] = React.useState([{}]);
  
  useEffect(() => {
      getData('employee/all', setRows)
  }, []);

  return (
    <PageTemplate pageTitle={pageTitle} mainPanel={TableMainPanel(pageTitle, EmployeeTable, rows)}/>
  );
}