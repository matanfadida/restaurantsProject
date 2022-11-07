import {Fragment, useContext} from 'react';
import ReactDOM from 'react-dom';
import CartContext from '../../state/buy-context';

import style from './modal.module.css';

const Backdrop = () => {
    const ctx = useContext(CartContext);
    return <div className={style.backdrop} onClick={ctx.cartShowhandler}/>
};

const ModalOverlay = props => {
    return <div className={style.modal}>
        <div className={style.content}>{props.children}</div>
    </div>
};

const portalElment = document.getElementById('overlays');


const Modal = props => {
 return <Fragment>
    {ReactDOM.createPortal(<Backdrop/>, portalElment)}
    {ReactDOM.createPortal(<ModalOverlay>{props.children}</ModalOverlay>, portalElment)}
 </Fragment>
};

export default Modal;