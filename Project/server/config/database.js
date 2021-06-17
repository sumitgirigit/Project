
const mongoose = require('mongoose')

//const CONNECTION_URL = 'mongodb+srv://databasemongo:databasemongo1234@cluster0.datrf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
//const databaseName = 'task_manager'
//Connecting to Mongoose Database

const connecteDatabase = () => {
    mongoose.connect(process.env.CONNECTION_URL, {
        useNewParser: true,
        useCreateIndex: true,
        useCreateIndex: true
    }).then(con => {
        console.log('Connected To MongoDB Database......')
    })
}

module.exports = connecteDatabase