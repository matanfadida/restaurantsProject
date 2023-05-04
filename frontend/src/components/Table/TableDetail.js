import { NavLink, useParams } from "react-router-dom";
import classes from "./table-detail.module.css";
import { FaStar } from "react-icons/fa";
import { Table } from "react-bootstrap";
import { useEffect, useState } from "react";
import io from "socket.io-client";

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

    const arrOfProdutcs = [];
    orders.map((order) =>
      order.products.map((product) => arrOfProdutcs.push(product))
    );
  }

  // useEffect(() => {
  //   const fetchOrders = async () => {
  //     const response = await fetch(`/api/admin/tables/${params.tableId}`);
  //     if (!response.ok) {
  //       throw new Error("Request failed!");
  //     }
  //     const result = await response.json();
  //     console.log(result)
  //     getOrders(result);
  //     // setLoading(false);
  //   };
  //   fetchOrders().catch((error) => {
  //     // setLoading(false);
  //     // setHasError(error.message || "Something went wrong!");
  //   });
  // }, [params.tableId]);

  useEffect(() => {
    const socket = io("http://localhost:5000/"); // Replace with your server URL

    // Add event listeners to the socket object
    socket.on("connect", () => {
      console.log("Connected to server");
    });

    socket.on("new-order", (order) => {
      if (
        parseInt(order[order.length - 1].numberTable) ===
        parseInt(params.tableId)
      ) {
        getOrders(order);
        console.log("New order received: ", order);
      }
    });

    socket.on("update-status-product", (orders) => {
      console.log("New orders received: ", orders);
      if (parseInt(orders.numberTable) === parseInt(params.tableId)) {
        getOrders(orders.orderByTable);
      }
      //   getOrders(order);
      // }
    });

    fetch(`/api/admin/tables/${params.tableId}`)
      .then((res) => {
        return res.json();
      })
      .then((result) => getOrders(result))
      .catch();
  }, []);

  // status: מוכן-2 בהכנה-1 לא התחילו -0
  const products = orders.map((order) =>
    order.products.map((item) => (
      <tr key={Math.random()}>
        <td>
          <NavLink to={`/rate/${item.id}`} >
            <FaStar size="30px" />
          </NavLink>
        </td>
        <td>
          <div className={classes.status}>
            {item.status === "מוכן" && (
              <div
                className={item.status === "מוכן" ? classes.yes : classes.no}
              >
                מוכן
              </div>
            )}
            {item.status === "בהכנה" && (
              <div
                className={item.status === "בהכנה" ? classes.yes : classes.no}
              >
                בהכנה
              </div>
            )}
            {item.status === "נשלח לטבח" && (
              <div
                className={
                  item.status === "נשלח לטבח" ? classes.yes : classes.no
                }
              >
                נשלח
              </div>
            )}
          </div>
        </td>
        <td>{item.price}</td>
        <td>{item.amount}</td>
        <td>{item.name}</td>
      </tr>
    ))
  );

  return (
    <div className={classes.table}>
      <h1>שולחן מספר {params.tableId}</h1>

      <Table className={classes.item}>
        <thead>
          <tr>
            <th scope="col">דרגו </th>
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
