
import { Router } from "express";
import {v7} from "uuid";

//import { User } from "../modules/users.types";
import { User } from "../modules/users.types";


// С помощью router в дальнейшем сможем прописать логику запросов
const router = Router();


// Пока данные будем хранить локально без БД.
// Мы сможем использовать любые методы и они будут работать 
// но при перезегрузке сервера они будут потеряны
//const posts: Post[] = [
const users: User[] = [
    
  {id: v7(), name: "Aleks", email: "korwet@gmail.de", 
    password: "qwerty1234", role: "admin", createdAt: new Date() },
  {id: v7(), name: "Nico", email: "Nicolas@gmail.de",
    password: "ytrewq4321", role: "user", createdAt: new Date() },
  
];


// GET /posts
// Так как в index.ts мы используем url /posts, то в данном
// файле мы можем не указывать каждый раз /posts, а указывать просто /
router.get("/", (_req, res)=>{
    res.status(200).json(users)
})

// GET /posts/:id (получение одного поста)
router.get("/:id", (req, res) => {
  // path param
  // params - объект с параметрами запроса
  // {id} - диструктурирующее присваивание
  const { id } = req.params;
  //const post = posts.find((post) => post.id === id);
  const user = users.find((user) => user.id === id);
  
  if (!user) {
    res.status(404).json({ error: `Post with id ${id} not found` });
  }
  res.status(200).json(user);
});

// USER /users (создание обьекта и добавление в массив)
// {name: "", email: "", password: "", role: ""}
router.post("/", (req, res) => {

  const { name, email, password, role } = req.body;
  if (!name || !email || !password || !role ) {
    res.status(400).json({ error: "Bad request" });
  }
  const post = { id: v7(),   name, email, password, role};
  //posts.push(post);
  users.push(user);
  res.status(201).json(user);
});


// PATCH /posts/:id
router.patch("/:id", (req, res) => {
  const { id } = req.params;
  const { name, email, password, role } = req.body;
  const user = users.find((user) => user.id === id);
  if (!user) {
    res.status(404).json({ error: `Post with id ${id} not found` });
    throw new Error("Not found");
  }
  if (!name && !email && !password && !role) {
    res.status(400).json({ error: "Bad request. No title and text" });
  }
  if (name) {
    user.name = name;
  }
  if (email) {
    user.email = email;
  }
  if (password) {
    user.password = password;
  }
  if (role) {
    user.role = role;  
  }
  res.status(200).json(user)
});



// DELETE /posts/:id
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const user = users.find((user) => user.id === id);
  if (!user) {
    res.status(404).json({ error: `Post with id ${id} not found` });
    throw new Error("Not found");
  }
  const indexOfPost = users.findIndex((user)=> user.id === id);
  users.splice(indexOfPost, 1);
  res.status(200).json(user);
});
export default router;
// params = {
//    id: string;
//}
// const id = req.params.id
// const { id } = req.params;

