import React, { useContext } from 'react'
import './CartItem.css'
import CartContext from '../Store/CartContext';



const CartItem=(props)=>{
   const cartCtx = useContext(CartContext);

    return(
        <tr className="items">
        <td className="image-title">
          <span className="title">{props.title}</span>
        </td>
        <td className="tdprice">
          <div className="priceValue">${props.price}</div>
        </td>
        <td>
          <div className="quan-rem">
            <span className="quantity">
              {props.quantity}
            </span>
            <span className="rem">
              <button onClick={() => cartCtx.quantityplus(props.item)}style = {{backgroundColor:'green'}}>+</button>
      <button onClick={() => cartCtx.quantityminus(props.item)} style = {{backgroundColor:'red'}}>-</button>
      
            </span>
          </div>
        </td>
      </tr> 
    );
  }
  
  export default CartItem;
   