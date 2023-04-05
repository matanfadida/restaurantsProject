import { useParams } from "react-router-dom";
import classes from "./table-detail.module.css";

import { Table, Button, ButtonGroup } from "react-bootstrap";
import { useEffect, useState } from "react";

const TableDetail = () => {
  const params = useParams();
  const [orders, getOrders] = useState([]);
  let totalPrice = 0;

  if(orders.length > 0){
    const arrOfPrice = orders.map(order => order.price);
    totalPrice = (arrOfPrice.reduce((accumulator, currentValue) => accumulator + currentValue,
    0));
    
    const arrOfProdutcs = [];
    orders.map(order => order.products.map(product => arrOfProdutcs.push(product)))
  }

  useEffect(() => {
    const fetchOrders = async() => {
      const response = await fetch(`/api/admin/tables/${params.tableId}`);
      if (!response.ok) {
        throw new Error("Request failed!");
      }
      const result = await response.json();
      getOrders(result);
      // setLoading(false);
    };
    fetchOrders().catch((error) => {
      // setLoading(false);
      // setHasError(error.message || "Something went wrong!");
    });
  }, [params.tableId]);

  // status: מוכן-2 בהכנה-1 לא התחילו -0
  const products = orders.map((order) => order.products.map((item) => (
    <tr key={Math.random()}>
      <td>
        <ButtonGroup aria-label="Basic example">
          <Button variant={item.status === 1 ? "success" : "light"}>
            מוכן
          </Button>
          <Button variant={item.status === 0 ? "success" : "light"}>
            בהכנה
          </Button>
        </ButtonGroup>
      </td>
      <td>{item.price}</td>
      <td>{item.amount}</td>
      <td>{item.name}</td>
    </tr>
  )));

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
