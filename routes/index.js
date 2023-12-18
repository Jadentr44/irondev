import express from "express";

import  blog  from "./blog.js";
import  users  from "./users.js";

const app = express();

app.use('/blog', blog);
app.use('/user', users);

export default  app;