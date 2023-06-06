import { useEffect, useState } from "react";
import TableItem from "./TableItem";
import classes from "./tables.module.css";

const Tables = (props) => {
  const [tables, setTables] = useState([]);

  useEffect(() => {
    const fetchTables = async() => {
      const response = await fetch(`/api/admin/tables`);
      if (!response.ok) {
        throw new Error("Request failed!");
      }
      const result = await response.json();
      console.log(result);
      setTables(result)
    }
    fetchTables()
    .then(() => {})
    .catch((error) => {});
  }, []);

  const tableItems = tables.map((table) =>
      <TableItem
        key={table._id}
        id={table._id}
        table={table.numberTable}
        totalPrice={table.totalPrice}
      />
    )
 

  return <div className={classes.wrapper}>{tableItems}</div>;
};

export default Tables;
