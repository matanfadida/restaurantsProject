import { useEffect, useState } from "react";
import TableItem from "./TableItem";
import classes from "./tables.module.css";

const Tables = (props) => {
  const [tables, setTables] = useState([]);

  useEffect(() => {
    fetch(`/api/admin/tables`)
      .then((res) => {
        return res.json();
      })
      .then((result) => setTables(result))
      .catch((err) => console.log(err));
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
