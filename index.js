const express = require('express');
//To run mongoose file to connect to DB
require('./src/db/mongoose');
// const User = require('./src/models/User')
// const Task = require('./src/models/Task')
const userRouter = require('./src/routers/user');
const taskRouter = require('./src/routers/task')
const app = express();
const port = process.env.PORT
//Setting up express to parse request objct to json 

//Setting up express middleware
app.use((req,res,next)=>{
    // console.log(req.method);
     next();
   // res.status(503).send('Site is under maintainance mode!')
})

const multer = require('multer');
const upload = multer({
    //destination folder to save the file
    dest:'images',
    limits:{
        //max file size
        fileSize:1000000
    },
    //A function to control which files to upload and which to skip.
    fileFilter(req,file,cb){
        //to specify the extenions of files allowed (.jpg, .xlsx, .pdf)
       // if(!file.originalname.endsWith('.pdf')){
        //By using regex
        if(file.originalname.match(/\.(doc|docx)$/)){
            return cb(new Error('Please upload a pdf'));
        }
            console.log('File uploaded ');
            cb(undefined,true);
    }
});

const errorMiddleware = (req,res,next)=>{

    throw new Error('From middleware');
}
//created new enpoint and binded the upload middleware
//the param name('upload') should be same as key name in postman
app.post('/upload',upload.single('upload'),(req,res)=>{
    const file = req.file.buffer;
   res.send();
},//To handle the errors thrown by multer
(error,req,res,next)=>{
    res.status(400).send({error:error.message});
});

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)


// //POST request to create User in DB
// app.post('/users', async (req, res) => {
//     const user = new User(req.body);
//     try {
//         await user.save();
//         res.status(201).send(user);
//     } catch (error) {
//         res.status(400).send(error);
//     }
// })

// //GET request for all users
// app.get('/users', async (req, res) => {
//     try {
//         const users = await User.find({});
//         res.send(users);
//     } catch (error) {
//         res.status(403).send(error);
//     }
// })

// //GET request for user by id
// app.get('/users/:id', async (req, res) => {
//     const _id = req.params.id;
//     try {
//         const user = await User.findById(_id)
//         if (!user) {
//             return res.status(404).send();
//         }
//         res.send(user);
//     } catch (error) {
//         res.status(404).send(error);
//     }
// })

// //Post request to create Task
// app.post('/tasks', async (req, res) => {
//     const task = new Task(req.body);
//     try {
//         await task.save();
//         res.status(201).send(task);
//     } catch (error) {
//         res.status(400).send(error);
//     }
// })

// //GET request for all tasks
// app.get('/tasks', async (req, res) => {
//     try {
//         const tasks = await Task.find({})
//         res.send(tasks);
//     } catch (error) {
//         res.status(403).send(error);
//     }
// })

// //GET request for task by id
// app.get('/tasks/:id', async (req, res) => {
//     const _id = req.params.id;
//     try {
//         const task = await Task.findById(_id);
//         if (!task) {
//             return res.status(404).send();
//         }
//         res.send(task);
//     } catch (error) {
//         res.status(404).send(error);
//     }
// })

app.listen(port, () => {
    console.log("App started on port " + port);
})