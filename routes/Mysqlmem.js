const express = require('express')
const router = express.Router()

const db = require('../config/Mysql')


db.connect((err) => {
     if (err)
          throw err;
     else
          console.log("MySQL Database connected");
})

//insert single member1
router.get("/insertmem1", (req,res) => {
     let mem ={id:1, name:"monish"};
     let sql = "insert into sample set ?";
     let query = db.query(sql,mem,(err,result) => {
          if(err)
               throw err;
          else
               res.send("member 1 added");
     })
})


//insert single member2
router.get("/insertmem2", (req, res) => {
     let mem = { id: 2, name: "manick" };
     let sql = "insert into sample set ?";
     let query = db.query(sql, mem, (err, result) => {
          if (err)
               throw err;
          else
               res.send("member 2 added");
     })
})


//select all members
router.get("/selectall", (req,res) => {
     var sql = "select * from sample";
     var query = db.query(sql, (err,result) => {
          if(err)
               throw err;
          else
               res.json(result);
     })
})

//select a particular member
router.get("/select/:id", (req, res) => {
     var sql = `select * from sample where id = ${req.params.id}`;
     var query = db.query(sql, (err, result) => {
          if (err)
               throw err;
          else if(result.length == 0)
               res.json({"msg":"No such members"})
          else
               res.json(result);
     })
})

//update a particular member
router.get("/update/:id", (req, res) => {
     var name = "vijay"
     var sql = `update sample set name = "${name}" where id = ${req.params.id}`;
     var query = db.query(sql, (err, result) => {
          if (err)
               throw err;
          else
               res.json(result);
     })
})

//delete a particular member
router.get("/delete/:id", (req, res) => {
     var checksql = `select * from sample where id=${req.params.id}`;
     db.query(checksql, (err,result1) =>{
          if(result1.length == 0)
               res.send("No such member found")
          else
          {
               var sql = `delete from sample where id = ${req.params.id}`;
               var query = db.query(sql, (err, result) => {
                    if (err)
                         throw err;
                    else
                         res.json(result);
               })
          }
     })
     
})

module.exports = router;