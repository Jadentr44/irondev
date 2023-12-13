import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import posts from "./db/post.json" assert { type: "json" };

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const port = 3000;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/index.html"))
);
app.get("/:id", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/blog.html"))
);
app.get("/api/blog/:id", (req, res) => {
  for (let i = 0; i < posts.length; i++) {
    const element = posts[i];
    console.log(element.id);
    if (element.id == req.params.id) return res.json(element);
  }
  res.json(`couldn't find a post`);
});
app.get("/api/blogs", (req, res) => {
  if (req.query.filter) {
    let {filter} = req.query
    console.log(filter.replace(/['"]+/g, ''));
    let filteredPost = posts.filter((e) => {
      // console.log("filters " + e.filters);
      if (e.filters.includes(filter.replace(/['"]+/g, ''))) return e;
    });
    console.log(filteredPost);
    return res.json(filteredPost);
  }

  res.json(posts);
});
app.listen(port, () => {
  console.log(`App listening at http://localhost:${port} `);
});
