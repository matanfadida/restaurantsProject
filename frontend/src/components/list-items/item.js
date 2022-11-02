import Cart from '../UI/cart';

const Item = (props) => {
  return (
    <Cart>
      <li>
        <div>
          <h3>{props.name}</h3>
          <div>
            <p>{props.detail}</p>
          </div>
          <div>
            <h4>{props.price}</h4>
          </div>
        </div>
      </li>
    </Cart>
  );
};

export default Item;
