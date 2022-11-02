import Item from "./item";

const order = [
  {
    id: 1,
    name: "הלחם שלנו",
    detail: "לחם פראנה באפייה מסורתית,שמן זית ומטבלים טעימים",
    price: 26,
  },
  {
    id: 2,
    name: "טחינה ספייס",
    detail:
      "טחינה לבנה, בשר עגל קצוץ מתובל בתערובת תבלינים מסורתית,  צנוברים ועשבי תיבול",
    price: 46,
  },
];

const ShowItem = (props) => {
  return (
    <ul>
      {order.map((item) => (
        <Item
          key={item.id}
          name={item.name}
          detail={item.detail}
          price={item.price}
        />
      ))}
    </ul>
  );
};

export default ShowItem;
