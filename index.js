const express = require('express');
const path = require('path');
const bodyparser = require('body-parser')


const app = express();
app.use(bodyparser.urlencoded({extended: true}))
app.use(bodyparser.json())

// app.get("/", (req,res) => {
//      res.send("<h1>Hello world</h1>");
// })

// app.get("/home",(req,res) =>{
//      res.sendFile(path.join(__dirname,'public','home.html'));
// })

// app.get("/about", (req, res) => {
//      res.sendFile(path.join(__dirname, 'public', 'about.html'));
// })


// //gets all members
// app.get("/api/members", (req,res) => {
//      res.json(members)
// })

// //get a single member
// app.get("/api/members/:id", (req,res) => {
//      const avail = members.some(members => members.id === req.params.id)
//      if(avail)
//           res.json(members.filter(members => members.id === req.params.id))
//      else
//           res.status(200).json({msg:`no members of id ${req.params.id}`})
// })


app.use("/api/members", require('./routes/Members'))

//MySQL database
// app.use("/mysqldb/members", require("./routes/Mysqlmem"))

//Mongo database
app.use("/mongodb/members", require("./routes/Mongomem"))

//static folder
app.use(express.static(path.join(__dirname, "public")))

const port = process.env.PORT || 5900;

app.listen(port, () => {
     console.log(`server running on port ${port}`)
})