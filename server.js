import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import session from "express-session";
import users from "./db/users.json" assert { type: "json" };


import api from './routes/index.js'
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const port =  process.env.PORT || 3000;

const app = express();


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({
  secret:'example',
  // 10 minutes
  cookie:{maxAge:6000000},
  saveUninitialized:false
}))
app.use('/api',api)


app.use(express.static("public"));

app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/index.html"))
);
app.get("/blog/:id", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/blog.html"))
);
app.get("/login", (req, res) =>{
 if(req.session.authenticated || req.session.user) return res.redirect('/')
  res.sendFile(path.join(__dirname, "/public/login.html"))
});
app.get("/profile/:username", (req, res) =>{
  res.sendFile(path.join(__dirname, "/public/profile.html"))
});
app.post("/api/user/login", (req, res) => {
  // making sure the request was sent with username and password
  if (!req.body.username || !req.body.password) return res.json("issue");
  if(req.session.authenticated) return res.json(req.session)
  
  const {username,password} = req.body
  let foundUser = users.find(user => user.username === username && user.password === password ) 
  
  if(!foundUser) return res.status(204).json("no user found");
  console.log(foundUser)
  const {imgSrc,id} = foundUser
    req.session.authenticated = true
      req.session.user={
        username,imgSrc,id
      }
     return res.status(200).json(req.session)
 

  

  // res.status(200).json(userFound);
});
// check if user is logged in
app.get("/api/user/login", (req, res) => {
  if(!req.session.authenticated || !req.session.user) return res.json(false)
  res.json( req.session.user)
});


app.listen(port, () => {
  console.log(`App listening at http://localhost:${port} `);
});

