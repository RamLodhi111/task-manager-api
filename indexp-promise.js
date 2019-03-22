const express = require('express');
//To run mongoose file to connect to DB
require('./src/db/mongoose');
const User = require('./src/models/User')
const Task = require('./src/models/Task')
const app = express();
const port=process.env.PORT ||3000
//Setting up express to parse request objct to json 
app.use(express.json())

//POST request to create User in DB
app.post('/users',(req,res)=>{
    const user = new User(req.body);
    console.log(req.body);
    console.log('User is :: ',user);
    user.save().then(()=>{
        res.send(user);
    }).catch((error)=>{
      //  console.log(error);
      res.status(400).send(error);
      //  res.send(error);
    })
    console.log(req.body);

})

//Post request to create Task
app.post('/tasks',(req,res)=>{
    const task = new Task(req.body);
    task.save().then((result)=>{
        res.status(201).send(task);
    }).catch((error)=>{
        res.status(400).send(error);
    })
})
//GET request for all users
app.get('/users',(req,res)=>{
    User.find({}).then((users)=>{
        res.send(users);
    }).catch((error)=>{
        res.status(403).send(error);
    })
})

//GET request for user by id
app.get('/users/:id',(req,res)=>{
    const _id = req.params.id;
    console.log(_id);
    User.findById(_id).then((user)=>{
        if(!user){
        return res.status(404).send();
        }
     res.send(user);
    }).catch((error)=>{
        res.status(404).send(error);
    })
})


//GET request for all tasks
app.get('/tasks',(req,res)=>{
    Task.find({}).then((tasks)=>{
        res.send(tasks);
    }).catch((error)=>{
        res.status(403).send(error);
    })
})

//GET request for task by id
app.get('/tasks/:id',(req,res)=>{
    const _id = req.params.id;
    console.log(_id);
    Task.findById(_id).then((task)=>{
        if(!task){
        return res.status(404).send();
        }
     res.send(task);
    }).catch((error)=>{
        res.status(404).send(error);
    })
})

app.listen(port,()=>{
    console.log("App started on port "+port);
})