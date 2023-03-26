import React, { useContext } from 'react'
import './CartItem.css'
import CartContext from '../Store/CartContext';



const CartItem=(props)=>{
   const cartCtx = useContext(CartContext);

    return(
        <tr className="items">
        <td className="image-title">
          <span id="img">
            <img src={props.image} alt={props.title} />
          </span>
          <span className="title">{props.title}</span>
        </td>
        <td className="tdprice">
          <div className="priceValue">${props.price}</div>
        </td>
        <td>
          <div className="quan-rem">
            <span className="quantity">
              <input type="number" value={props.quantity} />
            </span>
            <span className="rem">
              <button onClick={() => cartCtx.quantityplus(props)}style = {{backgroundColor:'green'}}>+</button>
      <button onClick={() => cartCtx.quantityminus(props)} style = {{backgroundColor:'red'}}>-</button>
            </span>
          </div>
        </td>
      </tr> 
    );
  }
  
  export default CartItem;
   