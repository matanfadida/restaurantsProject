import ChefItem from "./chefItem";
import classes from "./chef.module.css";

const data = [
  {
    id: "1",
    name: "שקשוקה",
    amount: "2",
    remark: "חריף",
    table: "10",
  },
  {
    id: "2",
    name: "סלט",
    amount: "1",
    remark: "בלי בצל",
    table: "10",
  },
  {
    id: "3",
    name: "פסטה",
    amount: "1",
    remark: "בלי פטריות",
    table: "10",
  },
  {
    id: "4",
    name: "בקבוק זירו",
    amount: "2",
    remark: "",
    table: "10",
  },
  {
    id: "5",
    name: "לחם הבית",
    amount: "1",
    remark: "",
    table: "10",
  },
];

const Chef = (props) => {
  const orderList = data.map((order) => (
    <ChefItem
      key={order.id}
      name={order.name}
      amount={order.amount}
      remark={order.remark}
      table={order.table}
    ></ChefItem>
  ));

  return (
    <div className={classes.chef}>
      <ul>{orderList}</ul>
    </div>
  );
};

export default Chef;
