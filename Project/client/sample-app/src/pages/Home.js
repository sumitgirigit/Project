
//import { Fragment } from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
//import product from '../../../../server/models/product';
import { getProducts } from '../actions/productActions';
import ProductItem from '../layout/ProductItem';
import classes from './Home.module.css';

const Home = () => {

    console.log('Home Page');

    const[errorMessage, setErrorMessage] = useState('');
    const[homeError, setHomeError] = useState(false);

    const dispatch = useDispatch();
    const { loading, products, error , productsCount } = useSelector(state => state.products);
    const {isAuthenticated} = useSelector( state => state.auth)

    useEffect(() => {

        if(error){
            console.log("Error While Login");
            console.log(error.errMessage.slice(0,30));
            setHomeError(true);
            setErrorMessage(error.errMessage.slice(0,100));
        }else{
            setHomeError(false);
            dispatch(getProducts());
        }
        
    }, [dispatch], error)

    return (
        <div className={classes.home}>
            <h1>Available Products </h1>
            {loading ? <h2>Loading....</h2> : <p></p>}
            {!products.sucess ? <h3></h3> : (
                <div className={classes.container}>
                    {products.products.map((data) => 
                        (
                        <ProductItem
                        key={data._id}
                        id={data.id}
                        name={data.name}
                        description={data.description}
                        price={data.price}
                        />
                        )
                    )}
                </div>
            )}
        </div>
    )
};

export default Home;


// {/* <p>{products.products[0]._id}</p>
// <p>{products.products[0].name}</p>
// <p>{products.products[0].description}</p>
// <p>{products.products[0].price}</p> */}

// {!isAuthenticated ? <h3></h3> : 
//     (
//     <div className={classes.container}>
//         {products.products.map((data) => 
//             (
//             <ProductItem
//             key={data._id}
//             id={data.id}
//             name={data.name}
//             description={data.description}
//             price={data.price}
//             />
//             )
//         )}
//     </div>
// )}