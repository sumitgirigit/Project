
//import {NavLink} from 'react-router-dom';
import classes from './ProductItem.module.css';

function ProductItem(props) {
  return (
    <div className={classes.item}>
        <h3 className={classes.name}>{props.name}</h3>
        <p className={classes.description}>{props.description}</p>
        <p className={classes.price}>Rs.{props.price}</p>
    </div>
  );
}

export default ProductItem;