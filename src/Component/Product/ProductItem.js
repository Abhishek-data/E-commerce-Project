import React, { useContext } from 'react';
import {Card,Button} from 'react-bootstrap';
import classes from './ProductItem.module.css'
import CartContext from '../Store/CartContext'
import { Link } from 'react-router-dom';
import ProductContext from '../Store/ProductContext';

const ProductItem=(props)=>{
  const cartCtx=useContext(CartContext)
  const productCtx = useContext(ProductContext);
  

  const addItemToCartHandler=(event)=>{
    event.preventDefault();
    cartCtx.addItem({ id: props.id, imageUrl: props.imageUrl, title: props.title, price: props.price, quantity: 1});
  }
  const ProductDetailHandler = (item) => {
    const ProductDetail = {
      title: item.title,
      imageUrl: item.image,
      price: item.price,
      rating: 4.5,
      detail: 'Best album of the year',
    }
    productCtx.changeDetail(ProductDetail)
  }

    return (
      
        <Card className={classes.card}>
          <Link to="/store/:productId" ><Card.Img variant="top" src={props.image} alt={props.title} onClick={ProductDetailHandler.bind(null, props)}/>
          </Link>
          <Card.Body>
            <Card.Title>{props.title}</Card.Title>
            <Card.Subtitle>
              <span>${props.price}</span>
            </Card.Subtitle>
            <Button onClick={addItemToCartHandler}>Add to cart</Button>
          </Card.Body>
        </Card>
       
 
      );
    };
    
    export default ProductItem;
