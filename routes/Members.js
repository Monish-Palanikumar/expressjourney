const express = require('express')
const router = express.Router()
var members = require('../Members')

//gets all members
router.get("/", (req, res) => {
     res.json(members)
})

//get a single member
router.get("/:id", (req, res) => {
     const avail = members.some(members => members.id === req.params.id)
     if (avail)
          res.json(members.filter(members => members.id === req.params.id))
     else
          res.status(400).json({ msg: `no members of id ${req.params.id}` })
})

//create a member
router.post("/",(req,res) => {
     var newMember ={
          id:"3",
          name: req.body.name,
          mail: req.body.mail,
          password: req.body.password
     }
     if(!newMember.name || !newMember.mail || !newMember.password)
     {
          res.status(400).json({ msg: "Enter the required fields" })
     }   
     else
     {
          members.push(newMember);
          res.json(members);
     }
})

//update a member
router.put("/:id", (req, res) => {
     const avail = members.some(members => members.id === req.params.id)
     if (avail)
     {
          const updMember = req.body;
          members.forEach(member => {
               if(member.id === req.params.id)
               {
                    member.id = updMember.id ? updMember.id : member.id; 
                    res.json({msg:"member updated", member})
               }
          })
     }
     else
          res.status(400).json({ msg: `no members of id ${req.params.id}` })
})

//delete a member
router.delete("/:id", (req, res) => {
     const avail = members.some(members => members.id === req.params.id)
     if (avail)
     {
          var index = members.indexOf(req.params.id)
          res.json({msg:"deleted",members: members.filter(members => members.id !== req.params.id)})
          members.splice(index,1)
     }
     else
          res.status(400).json({ msg: `no members of id ${req.params.id}` })
})

module.exports = router;