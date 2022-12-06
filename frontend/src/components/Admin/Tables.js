import Row from "react-bootstrap/Row";

import TableItem from "./TableItem";
import classes from "./tables.module.css";

const demmydata = [
  {
    id: "d1",
    table: "10",
    totalPrice: 105,
    paid: 50,
  },
  {
    id: "d1",
    table: "10",
    totalPrice: 105,
    paid: 50,
  },
  {
    id: "d1",
    table: "10",
    totalPrice: 105,
    paid: 50,
  },
  {
    id: "d1",
    table: "10",
    totalPrice: 105,
    paid: 50,
  },
  {
    id: "d1",
    table: "10",
    totalPrice: 105,
    paid: 50,
  },
];

const tableItems = demmydata.map((item) => (
  <TableItem
    id={item.id}
    table={item.table}
    totalPrice={item.totalPrice}
    paid={item.paid}
  />
));




const Tables = (props) => {
  return (
    <div className={classes.wrapper}>
      {tableItems}
      
    </div>
  );
};

export default Tables;
