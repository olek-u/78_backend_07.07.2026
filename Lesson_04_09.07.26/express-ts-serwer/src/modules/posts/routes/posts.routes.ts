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

export default router;