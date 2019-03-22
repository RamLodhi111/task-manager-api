const express = require('express');
const router = new express.Router();
const User = require('../models/User');
const {sendWelcomeEmail}= require('../emails/account');
router.get('/test',(req,res)=>{
    res.send('From new file')
})

//POST request to create User in DB
router.post('/users', async (req, res) => {
    const user = new User(req.body);
    try {
        await user.save();
        await sendWelcomeEmail(user.email,user.name);
        const token  = await user.generateAuthToken();
        res.status(201).send({user,token});
    } catch (error) {
        res.status(400).send(error);
    }
})

//POST request to login authenticated  User
router.post('/users/login', async (req, res) => {
    try{
        const user = await User.findByCredentials(req.body.email,req.body.password);
        //send jwt token in login response
        const token = await user.generateAuthToken();
    //  res.send(user);
    res.send({user,token});
    }catch(e){
        console.log(e);
        res.status(400).send();
    }

})

//GET request for all users
router.get('/users', async (req, res) => {
    try {
        const users = await User.find({});
        res.send(users);
    } catch (error) {
        res.status(403).send(error);
    }
})

//GET request for user by id
router.get('/users/:id', async (req, res) => {
    const _id = req.params.id;
    try {
        const user = await User.findById(_id)
        if (!user) {
            return res.status(404).send();
        }
        res.send(user);
    } catch (error) {
        res.status(404).send(error);
    }
})


//Update for user
router.patch('/users/:id', async (req,res)=>{
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name','email','password','age'];
    const isValidOperation = updates.every((update)=>allowedUpdates.includes(update));
    if(!isValidOperation){
        return res.status(400).send({error:'Invalid field updates!'})
    }

    try{
      //  const user = await User.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true})
      //Refactoring above code to enable hasing of password update (enable schema middleware in model)
      const user = await   User.findById(req.params.id);
      updates.forEach((update)=>user[update]=req.body[update]); 
      await user.save();
      if(!user){
            res.status(400).send();
        }
        res.send(user);
    }catch(e){
        res.status(400).send();
    }
})
module.exports=router