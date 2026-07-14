import { Router } from "express";
import {v7} from "uuid";

import { Post } from "../posts.types";

// С помощью router в дальнейшем сможем прописать логику запросов
const router = Router();


// Пока данные будем хранить локально без БД.
// Мы сможем использовать любые методы и они будут работать 
// но при перезегрузке сервера они будут потеряны
const posts: Post[] = [
    { id: v7(), title: "Cloudy weather", text: "It is dark again" },
    { id: v7(), title: "Job", text: "I got new job!" },
    
];


// GET /posts
// Так как в index.ts мы используем url /posts, то в данном
// файле мы можем не указывать каждый раз /posts, а указывать просто /
router.get("/", (_req, res)=>{
    res.status(200).json(posts)
})

// GET /posts/:id (получение одного поста)
router.get("/:id", (req, res) => {
  // path param
  // params - объект с параметрами запроса
  // {id} - диструктурирующее присваивание
  const { id } = req.params;
  const post = posts.find((post) => post.id === id);
  if (!post) {
    res.status(404).json({ error: `Post with id ${id} not found` });
  }
  res.status(200).json(post);
});

// POST /posts (создание обьекта и добавление в массив)
// {title: "", text: ""}
router.post("/", (req, res) => {
  const { title, text } = req.body;
  if (!title || !text) {
    res.status(400).json({ error: "Bad request" });
  }
  const post = { id: v7(), title, text };
  posts.push(post);
  res.status(201).json(post);
});

// params = {
//    id: string;
//}
// const id = req.params.id
// const { id } = req.params;

// PATCH /posts/:id
router.patch("/:id", (req, res) => {
  const { id } = req.params;
  const { title, text } = req.body;
  const post = posts.find((post) => post.id === id);
  if (!post) {
    res.status(404).json({ error: `Post with id ${id} not found` });
    throw new Error("Not found");
  }
  if (!title && !text) {
    res.status(400).json({ error: "Bad request. No title and text" });
  }
  if (title) {
    post.title = title;
  }
  if (text) {
    post.text = text;
  }
  res.status(200).json(post)
});



// DELETE /posts/:id
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const post = posts.find((post) => post.id === id);
  if (!post) {
    res.status(404).json({ error: `Post with id ${id} not found` });
    throw new Error("Not found");
  }
  const indexOfPost = posts.findIndex((post)=> post.id === id);
  posts.splice(indexOfPost, 1);
  res.status(200).json(post);
});
export default router;
// params = {
//    id: string;
//}
// const id = req.params.id
// const { id } = req.params;

export default router;