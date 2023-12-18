import express from "express";
import users from "../db/users.json" assert { type: "json" };

const router = express.Router();
// get user by name
router.get("/name/:name", (req, res) => {
  let user = users.find((e) => e.username === req.params.name);
  if(!user) return res.json("no user found");
  
  let {username,likedPost,readList,post,bio,imgSrc} = user
  console.log(user);
  let data = {
   username,likedPost,readList,post,bio,imgSrc
  }
  return res.json(data);

 
});
router.get("/id/:id", (req, res) => {
  console.log(req.params.id)
  let user = users.find((e) => e.id == req.params.id);
  if(!user) return res.json("no user found");
  
  let {username,id,imgSrc} = user
  // console.log(user);
  let data = {
   username,id,imgSrc
  }
  return res.json(data);

 
});

export default router;
