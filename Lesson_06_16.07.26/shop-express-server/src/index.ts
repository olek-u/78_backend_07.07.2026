
import express from "express";

import usersRouter from "./routes/users.routes";


// Создание приложения. "Управление" сервером
const app = express();
// Middleware - "учит" сервер понимать JSON
app.use(express.json());

app.use("/users", usersRouter);
// Тестовый метод для проверки работы приложение
// get - использования метода запроса GET. 
// "/health" - адрес (+ http://localhost:3000)
// (_req, res) => {
//  res.status(200).json({ status: "ok" });
// - выполняется, когда на адрес идёт запрос
app.get("/health", (_req, res) => {
  res.status(200).json({ status: "ok" });
});

app.use("/posts", usersRouter)

// Порт, через который открывается наше приложение
const PORT = 3000;
app.listen(PORT, ()=>{
    console.log(`Server started on port ${PORT} http://localhost:${PORT}`);
})