const express=require("express");
const router=express.Router();
const {Users}=require("../models");
const bcrypt=require("bcrypt");

router.post("/",async (req,res)=>{
  const {username, password}=req.body;
  bcrypt.hash(password,10).then((hash)=>{
    Users.create({
      username:username,
      password:hash
    });
    res.json("SUCCESS");
  })
})

router.post("/login", async (req,res)=>{
  const {username,password}=req.body;
  const user=await Users.findONe({where:{username:username}});
  if(!user) res.json({error:"userDoesn't Exist"})

    bcrypt.compare(password,user.password).then((match)=>{
      if(!match) res.json({error:"wrong username and password conbination"});

      res.json("you logged in!!!")
    })
})
module.exports=router;