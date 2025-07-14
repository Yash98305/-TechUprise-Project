const mongoose = require('mongoose');
const ConnectDatabase = ()=>{
mongoose.connect(process.env.MONGO_URL,{
    family : 4
}).then((data)=>{
    console.log(`Mongodb connected with server: ${data.connection.host}`);
}).catch((error)=>{
    console.log(error.message);
})
}
module.exports = ConnectDatabase;