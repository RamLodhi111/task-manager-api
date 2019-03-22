const mongoose = require('mongoose');
const MONGODB_URL = process.env.MONGODB_URL;
mongoose.connect(MONGODB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true
})

//Modeling for User document
// const User = mongoose.model('User', {
//     name: {
//         type: String
//     },
//     age: {
//         type: Number
//     }
// })

// const me = new User({
//     name: 'Ram Lodhi',
//     age: 50
// })

// me.save().then((result) => {
//     console.log(result);
// }).catch((error) => {
//     console.log(error);
// })

//Modeling for tasks document

// const Task = mongoose.model('Tasks',{
//     description:{
//         type:String,
//         required:true,
//         trim:true
//     },
//     completed:{
//         type:Boolean,
//         default:false
//     }
// })

// const task1 = new Task({
//     description:'Learn the mongoose library',
//     completed:false
// })

// task1.save().then((result)=>{
//     console.log(result)
// }).catch((error)=>{
//     console.log(error);
// })