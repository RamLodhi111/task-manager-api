//CRUD operation

// const mongodb = require('mongodb');
// const MongoClient = mongodb.MongoClient;
// const ObjectID=mongodb.ObjectID;

//Using object destructring to replace above
const { MongoClient, ObjectID } = require('mongodb');
// const id = new ObjectID();
// console.log(id);

const connectionURL = process.env.MONGODB_URL
const dbName = 'task-manager';
MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
    if (error) {
        return console.log("Unable to connect to mongo db", error);
    }
    //console.log("Connection successful");
    const db = client.db(dbName);
    //insert single document to users colection
    //     db.collection('users').insertOne({
    //         _id:id,
    //         name:'Ram Lodhi',
    //         age:25
    //     },(error,result)=>{
    //         if(error){
    //             return console.log("Unable to insert user");
    //         }
    //         console.log(result.ops);
    //     })
    // //Insert many documents to collection
    //     db.collection('users').insertMany([
    //         { name:"Soni",age:25 },
    //         { name:'Nikhil',age:2},
    //         { name:'Raj', age:30}
    //     ],(err,res)=>{
    //             if(error){
    //                return  console.log("Unable to insert document",err);
    //             }
    //             console.log(res.ops);
    //     })

    //insert 3 documents to task collection
    // db.collection('tasks').insertMany([
    //     { description: "CLean the house", completed: true },
    //     { description: 'Renew inspection', completed: false },
    //     { description: 'Pot plants', completed: false }
    // ], (err, res) => {
    //     if (error) {
    //         return console.log("Unable to insert document", err);
    //     }
    //     console.log(res.ops);
    // })

    //Querying DB
    // db.collection('users').findOne({name:'Ram Lodhi',age:25},(error,user)=>{
    //     if(error){
    //         return console.log("No result found")
    //     }
    //     console.log(user);
    // })

    //Update document

    // db.collection('users').updateOne({
    //     //_id: new ObjectID("5c8e9e4b243abf0456f2abd4"),
    //     name: 'Ram Lodhi'
    // },
    //     {
    //         // $set: {
    //         //     age: 24
    //         // }
    //         $inc: {
    //             age: 1
    //         }
    //     }).then((result) => {
    //         console.log(result);
    //     }).catch((error) => {
    //         console.log(error);
    //     })
    
    //Update many 
    // db.collection('tasks').updateMany({
    //     completed:false
    // },{
    //     $set:{
    //      completed:true
    //     }
    // }).then((result=>{
    //     console.log(result)
    // })).catch((error)=>{
    //     console.log(error);
    // })

    //Delete document
    db.collection('users').deleteOne({
        age:25
    }).then((result)=>{
        console.log(result)
    }).catch((error)=>{
        console.log(error);
    })
})
