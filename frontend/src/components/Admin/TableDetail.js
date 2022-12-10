import { useParams } from "react-router-dom";
import classes from "./table-detail.module.css";

import { Table, Button, ButtonGroup } from "react-bootstrap";
import { useEffect, useState } from "react";

const TableDetail = () => {
  const params = useParams();
  const [orders, getOrders] = useState([]);
  let totalPrice = 0;

  if (orders.length > 0) {
    const arrOfPrice = orders.map((order) => order.price);
    totalPrice = arrOfPrice.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0
    );
  }

  useEffect(() => {
    fetch(`/api/admin/tables/${params.tableId}`)
      .then((res) => {
        return res.json();
      })
      .then((result) => getOrders(result))
      .catch((err) => console.log(err));
  }, [params.tableId]);

  // status: מוכן-2 בהכנה-1 לא התחילו -0

//תסדר את זה 
  const products = orders.map((order) => (
    <tr>
      {order.products.map((item) => (
        <div>
          <td>{item.price}</td>
          <td>{item.amount}</td>
          <td>{item.name}</td>
        </div>
      ))}
      {/* <td>
        <ButtonGroup aria-label="Basic example">
          <Button variant={item.status === 1 ? "success" : "light"}>
            מוכן
          </Button>
          <Button variant={item.status === 0 ? "success" : "light"}>
            בהכנה
          </Button>
        </ButtonGroup>
      </td> */}
      {/* <td>{item.price}</td>
      <td>{item.amount}</td>
      <td>{item.name}</td> */}
      sad
    </tr>
  ));

  return (
    <div className={classes.table}>
      <h1>שולחן מספר {params.tableId}</h1>

      <Table className={classes.item}>
        <thead>
          <tr>
            <th scope="col">סטטוס</th>
            <th scope="col">מחיר</th>
            <th scope="col">כמות</th>
            <th scope="col">שם המוצר</th>
          </tr>
        </thead>
        <tbody>{products}</tbody>
      </Table>
      <h4>סה"כ לתשלום: {totalPrice}</h4>
    </div>
  );
};

export default TableDetail;
