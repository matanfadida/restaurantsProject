import Button from "./button";

const chefProduct = (props) => {
  const InProgresHandler = async () => {};

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
    <li>
      <div>
        <span>{props.product.name}</span>
        <div>
          <ul>
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
    </li>
  );
};

export default chefProduct;
