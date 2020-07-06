const express = require('express')
const router = express.Router();
const mongoose = require('mongoose')

const db = require('../config/Mongo');

var memSchema = new mongoose.Schema({
     id:{
          type: Number
     },
     name:{
          type: String
     }
}, 
{
     versionKey: false //to remove __v field in mongoose schema
})

const model = mongoose.model("sample",memSchema,"sample");

//insert single member1
router.get("/insertmem1", (req,res) => {
     let member = new model(
          {
               id: req.body.id,
               name: req.body.name
          }
     );
     member.save((err) =>{
          if(err)
               res.body(err)
          else
               res.json(member)
     })
})

//get all members
router.get("/selectall", (req,res) =>{
     model.find({},(err,result)=>{
          if(!err)
               res.send(result)
          else
               res.send(err)
     })
})

//get member by id
router.get("/select/:id", (req,res)=>{
     model.find({id: req.params.id},(err,result)=>{
          if (result.length == 0)
               res.send("No such member found")
          else if(!err)
               res.send(result)
          else
               res.send(err)
     })
})

//update member
router.get("/update/:name/:id", (req,res)=>{
     model.find({id: req.params.id}, (err,result)=>{
          if(!err)
          {
               var target = {name: `${req.params.name}`}
               var newVal = {$set: {id: req.params.id}}
               model.updateOne(target,newVal,(err,result)=>{
                    if(!err)
                         res.send("updated")
                    else
                         res.send(err)
               })
          }
     })
})

//delete a member
router.get("/delete/:id", (req,res)=>{
     model.find({id: req.params.id}, (err,result)=>{
          if(result.length == 0)
               res.send("No such members")
          else if(!err)
          {
               var target = {id: req.params.id}
               model.deleteOne(target, (err,result)=>{
                    if(!err)
                         res.send("Deleted successfully")
                    else
                         res.send("Delete error")
               })
          }
     })
})
module.exports = router;