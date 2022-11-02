import styles from "./cart.module.css";

const Cart = (props) => {
    return <div className={`${props.className} ${styles.card}`}>{props.children}</div>
}

export default Cart;