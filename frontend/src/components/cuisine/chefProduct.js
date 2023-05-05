
import Button from "../UI/Button";
import classes from "./chefItem.module.css";

const chefProduct = (props) => {
  const InProgresHandler = async () => {const response = await fetch(`/api/chef/edit-status`, {
    method: "POST",
    body: JSON.stringify({
      idOrder: props.orderId,
      idProduct: props.product.guid_id,
      numberTable: props.numberTable,
      status: "בהכנה",
    }),
    headers: { "Content-Type": "application/json" },
  });
  if (!response.ok) {
    throw new Error("Request failed!");
  }
  const result = await response.json();

  console.log(result);};

  const ReadyHandler = async () => {
    const response = await fetch(`/api/chef/edit-status`, {
      method: "POST",
      body: JSON.stringify({
        idOrder: props.orderId,
        idProduct: props.product.guid_id,
        numberTable: props.numberTable,
        status: "מוכן",
      }),
      headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) {
      throw new Error("Request failed!");
    }
    const result = await response.json();

    console.log(result);
  };
  //   className={classes.buttons}
  return (
    <li className={classes.chefProduct}>
      <div>
        <Button onClick={ReadyHandler}>מוכן</Button>
        <Button onClick={InProgresHandler}>בהכנה</Button>
      </div>
      <span>{props.product.name}</span>
    </li>
  );
};

{
  /* <li>
      <div>
        <span>{props.product.name}</span>
        <div>
          <ul >
            <li>
              <Button onClick={InProgresHandler}>בהכנה</Button>
            </li>{" "}
            <li>
              {" "}
              <button onClick={ReadyHandler}>מוכן</button>
            </li>
          </ul>
        </div>
      </div>
    </li> */
}

export default chefProduct;
