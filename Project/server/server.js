
const app = require('./app')
const dotenv = require('dotenv');
const connectDatabase = require('./config/database')

dotenv.config({path: './config/config.env'})

// connecting to Database
connectDatabase();

const server = app.listen(process.env.PORT, () => {
    console.log('Server Started on PORT: ' + process.env.PORT);
})

// Handle Unhandle rejections
process.on('unhandleRejection', err => {
    console.log('ERROR:'+ err.message);
    console.log('Shutting down the server due to Unhandle Promise Rejection');
    server.close(() => {
        process.exit(1);
    })
})