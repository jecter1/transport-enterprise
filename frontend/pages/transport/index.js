import TransportTable from "../../components/transport/tables/TransportTable";
import React from "react";
import getData from "../../util/getData";
import { useEffect } from "react";
import PageTemplate from "../../templates/PageTemplate";
import TableMainPanel from "../../templates/TableMainPanel";

export default function All() {
  const pageTitle = "Список транспорта";
  
  const [rows, setRows] = React.useState([{}]);
  
  useEffect(() => {
      getData('transport/all', setRows)
  }, []);

  return (
    <PageTemplate pageTitle={pageTitle} mainPanel={TableMainPanel(pageTitle, TransportTable, rows)}/>
  );
}