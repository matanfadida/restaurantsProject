import { NavLink, useParams, useNavigate } from "react-router-dom";
import classes from "./table-detail.module.css";
import { FaStar } from "react-icons/fa";
import Cookies from "js-cookie";
import { Table } from "react-bootstrap";
import { useEffect, useState, useContext } from "react";
import io from "socket.io-client";
import CartContext from "../../state/buy-context";
import { AiFillMinusCircle } from "react-icons/ai";
import Loader from "../UI/loader";
import Cart from "../UI/cart";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

const TableDetail = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [orders, getOrders] = useState([]);
  const ctx = useContext(CartContext);
  const [tipValue, setTipValue] = useState(parseInt(0));
  const [loader, setLoader] = useState(true);
  const [totalPrice, setTotalPrice] = useState(0);
  const [price, setPrice] = useState(0);
  const [payNow, setPayNow] = useState(0);
  const [thanksPopup, setThanksPopup] = useState(false);

  const [payed, setPayed] = useState(0); //למשוך כמה כבר שולם בשולחן הזה

  const handleTipChange = (event) => {
    const newValue = event.target.value;
    setTipValue(newValue);
  };
  let tempPrice = 0;

  useEffect(() => {
    setLoader(true);
    if (orders.length > 0) {
      const arrOfPrice = orders.map((order) => order.price);
      tempPrice = arrOfPrice.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        0
      );

      const arrOfProdutcs = [];
      orders.map((order) =>
        order.products.map((product) => arrOfProdutcs.push(product))
      );
      setTotalPrice(tempPrice);
    }

    let temp_Price = parseInt(totalPrice) - parseInt(payed);
    // if (!(tipValue === "")) {
    //   temp_Price += parseInt(tipValue);
    // }
    setPrice(temp_Price);
    setTimeout(() => {
      setLoader(false);
    }, 5000);
  }, [orders]);

  useEffect(() => {
    const fetchPay = async () => {
      if (Cookies.get("table") !== undefined) {
        const response = await fetch(`/api/admin/get-payment`, {
          method: "post",
          body: JSON.stringify({
            numTable: JSON.parse(Cookies.get("table")),
          }),
          headers: { "Content-Type": "application/json" },
        });
        if (!response.ok) {
          throw new Error("Request failed!");
        }
        const result = await response.json();
        console.log("res", result);
        setPayed(result.sum);
      }
    };
    fetchPay()
      .then(() => {})
      .catch((error) => {});
  }, []);

  const minusHandler = (ordId, guid_id) => {
    setLoader(true);
    fetch(`/api/delete-product-from-order`, {
      method: "post",
      body: JSON.stringify({
        ordId,
        proGuidId: guid_id,
        numberTable: JSON.parse(Cookies.get("table")),
      }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        getOrders(data);
        const arrOfPrice = data.map((order) => order.price);
        tempPrice = arrOfPrice.reduce(
          (accumulator, currentValue) => accumulator + currentValue,
          0
        );
        setTotalPrice(tempPrice);
        setLoader(false);
      })
      .catch((err) => setLoader(false));
  };

  useEffect(() => {
    const socket = io("http://localhost:5000/");

    // Add event listeners to the socket object
    socket.on("connect", () => {
      console.log("Connected to server");
    });

    socket.on("new-order", (order) => {
      if (
        parseInt(order[order.length - 1].numberTable) ===
        parseInt(Cookies.get("table"))
      ) {
        getOrders(order);
        console.log("New order received: ", order);
      }
    });

    socket.on("update-status-product", (orders) => {
      console.log("New orders received: ", orders);
      if (parseInt(orders.numberTable) === parseInt(Cookies.get("table"))) {
        getOrders(orders.orderByTable);
      }
      //   getOrders(order);
      // }
    });

    const fetchOrder = async () => {
      setLoader(true);
      const response = await fetch(`/api/admin/tables/${Cookies.get("table")}`);
      if (!response.ok) {
        throw new Error("Request failed!");
      }
      const result = await response.json();
      getOrders(result);
      setLoader(false);
    };
    fetchOrder()
      .then((res) => setLoader(false))
      .catch((err) => setLoader(false));
  }, []);

  const handlePayChange = (event) => {
    const newValue = event.target.value;
    setPayNow(newValue);
  };

  if (thanksPopup) {
    return (
      <div>
        <Cart>תודה ולהתראות !</Cart>
      </div>
    );
  }

  // status: מוכן-2 בהכנה-1 לא התחילו -0
  const products = orders.map((order) =>
    order.products.map((item) => (
      <tr key={Math.random()}>
        <td>
          <NavLink to={`/rate/${item.id}`}>
            <FaStar size="30px" />
          </NavLink>
        </td>
        <td>
          <div className={classes.status}>
            <div className={classes.yes}>
              {item.status === "נשלח לטבח" ? "נשלח" : item.status}
            </div>
          </div>
        </td>
        <td className={classes.price}>{item.price}</td>
        <td>{item.name}</td>
        {ctx.isLogged && (
          <td
            className={classes.delete}
            onClick={() => {
              minusHandler(order._id, item.guid_id);
            }}
          >
            <AiFillMinusCircle />
          </td>
        )}
      </tr>
    ))
  );

  if (loader) {
    return <Loader />;
  }

  if (orders.length === 0) {
    return (
      <div className={classes.empty}>
        <h3>עוד לא הזמנת כלום</h3>
        <AddShoppingCartIcon
          className={classes.emptyCart}
          onClick={() => {
            navigate("/");
          }}
        />
      </div>
    );
  }

  let payError = payNow === "" || payNow > price || payNow <= 0;
  return (
    <div className={classes.table}>
      <h1>שולחן מספר {Cookies.get("table")}</h1>

      <Table className={classes.item}>
        <thead>
          <tr>
            <th scope="col">דרגו </th>
            <th scope="col">סטטוס</th>
            <th scope="col">מחיר</th>
            <th scope="col">שם המוצר</th>
            {ctx.isLogged && <th>אדמין</th>}
          </tr>
        </thead>
        <tbody>{products}</tbody>
      </Table>
      <div className={classes.tip}>
        <input
          id="tip-input"
          type="number"
          value={tipValue}
          onChange={handleTipChange}
          step="1"
          min="0"
          required
        />
        <h4>?טיפ</h4>
      </div>

      <h4>סה"כ לתשלום: {totalPrice}</h4>
      <h4>נותר לשלם: {price}</h4>

      <div className={classes.tip}>
        <button
          onClick={() => {
            setPayNow(price);
          }}
        >
          שלם הכל
        </button>
        <input
          id="paynow-input"
          type="number"
          value={payNow}
          onChange={handlePayChange}
          step="1"
          min="1"
        />
        <h4>תשלום חלקי</h4>
      </div>

      <div className={classes.buttons}>
        <button
          onClick={() => {
            setPayNow(price);
          }}
        >
          שלם הכל
        </button>
        <button
          disabled={payError}
          onClick={() => {
            navigate(`/payment/${payNow}/${tipValue}`);
          }}
        >
          מעבר לתשלום
        </button>
      </div>
    </div>
  );
};

export default TableDetail;
