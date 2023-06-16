import ButtonGroup from "../UI/ButtonGroup";
import classes from "./chefItem.module.css";

const chefProduct = (props) => {
  const InProgresHandler = async () => {
    const response = await fetch(`/api/chef/edit-status`, {
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

    console.log(result);
  };

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
    props.ready();
    console.log(result);
  };
  //   className={classes.buttons}
  return (
    <li className={classes.chefProduct}>
      <ButtonGroup
        focus={
          props.product.status === "מוכן"
            ? 1
            : props.product.status === "בהכנה"
            ? 2
            : 0
        }
        buttons={[
          { id: 1, onClick: ReadyHandler, name: "מוכן" },
          { id: 2, onClick: InProgresHandler, name: "בהכנה" },
        ]}
      ></ButtonGroup>
      
        {props.product.remark && <span>הערות:  {props.product.remark}</span>}
        <span>{props.product.name}</span>
      
    </li>
  );
};

export default chefProduct;
