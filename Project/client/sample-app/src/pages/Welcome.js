
import classes from './Welcome.module.css';

const Welcome = () => {
    return (
        <div>
            <p>Please Login to See the Product</p>
            <div className={classes.welcome}><h1 >Welcome</h1></div>
        </div>
    )
};

export default Welcome;