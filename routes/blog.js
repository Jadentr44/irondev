import express from "express";
import posts from '../db/post.json'  assert { type: "json" };
const router = express.Router()

// getting post based off id
router.get("/id/:id", (req, res) => {
  // console.log("serching for id")
  for (let i = 0; i < posts.length; i++) {
    const element = posts[i];
    // console.log(element.id);
    if (element.id == req.params.id) return res.json(element);
  }
  res.json(`couldn't find a post`);
});

// get all blogs, you can also include filters
router.get("/all", (req, res) => {
  if (req.query.filter) {
    let {filter} = req.query
    // console.log(filter.replace(/['"]+/g, ''));
    let filteredPost = posts.filter((e) => {
      // console.log("filters " + e.filters);
      if (e.filters.includes(filter.replace(/['"]+/g, ''))) return e;
    });
    // console.log(filteredPost);
    return res.json(filteredPost);
  }

  res.json(posts);
});

export default  router