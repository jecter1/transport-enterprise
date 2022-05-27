import RepairTable from "../../components/repair/tables/RepairTable";
import React from "react";
import getData from "../../util/getData";
import { useEffect } from "react";
import PageTemplate from "../../templates/PageTemplate";
import TableMainPanel from "../../templates/TableMainPanel";

export default function All() {
  const pageTitle = "Список ремонтов";
  
  const [rows, setRows] = React.useState([{}]);
  
  useEffect(() => {
      getData('repair/all', setRows)
  }, []);

  return (
    <PageTemplate pageTitle={pageTitle} mainPanel={TableMainPanel(pageTitle, RepairTable, rows)}/>
  );
}